import { ipfsGet } from "@tatumio/tatum";
import { ethers } from "ethers";
import actionabi from "../artifacts/contracts/Actions.sol/Actions.json";
import { Actions } from "../artifacts/contracts/types";
/*async function deployContract(
  abi: string[],
  bytecode: string,
  provider:
    | ethers.ethers.providers.ExternalProvider
    | ethers.ethers.providers.JsonRpcFetchFunc
) {
  const web3Provider = new ethers.providers.Web3Provider(provider);
  const signer=web3Provider.getSigner()
  let factory=new ethers.ContractFactory(abi,bytecode,signer)
  let contract=await factory.deploy("")
}*/

export async function getListOfActions() {
  const provider = new ethers.providers.AlchemyProvider(
    "maticmum",
    "TLPI2cNQ21vuiwGs2X1HaUJxt-ZwnOFx"
  );
  console.log("prov", provider);
  const contract = new ethers.Contract(
    "0xFf876C477C0F2BD05a23326AdC08720CaBaeAf91",
    actionabi.abi,
    provider
  ) as Actions;
  let actions = [] as object[];
  let i = 0;
  while (true) {
    const tmp = await contract.actions(i);
    if (!tmp || (tmp[0] as any) == 0) break;
    const metadata = await ipfsGet(tmp.metadata);
    const tmp2 = {
      creator: tmp.creator,
      endDate: tmp.endDate,
      disputePeriodEnd: tmp.disputePeriodEnd,
      stakeAmount: tmp.stakeAmount,
      image: tmp.image,
      title: metadata.title,
      description: metadata.description,
      requirements: metadata.requirements,
      amount: tmp.amount,
      settled: tmp.settled,
    };
    actions.push(tmp);
    console.log("mmh", tmp);
    i++;
  }
  console.log("hahahah", actions);
  return actions;
}
