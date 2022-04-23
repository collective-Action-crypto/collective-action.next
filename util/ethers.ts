import { BigNumber, ethers } from "ethers";
import ActionABI from "../artifacts/contracts/Actions.sol/Actions.json";
import { Actions } from "../artifacts/contracts/types";
import { getFromIPFS } from "./tatum";
import { ACTIONS_CONTRACT_ADDRESS } from "./constants";

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

const provider = new ethers.providers.AlchemyProvider(
  "maticmum",
  "TLPI2cNQ21vuiwGs2X1HaUJxt-ZwnOFx"
);

export async function getListOfActions() {
  console.log("prov", provider);
  const contract = new ethers.Contract(
    ACTIONS_CONTRACT_ADDRESS,
    ActionABI.abi,
    provider
  ) as Actions;
  let actions = [] as object[];
  let i = 0;
  while (true) {
    const tmp = await contract.actions(i);
    if (!tmp || (tmp[0] as any) == 0) break;
    const metadata = await getFromIPFS(tmp.metadata);
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
    actions.push(tmp2);
    console.log("mmh", tmp);
    i++;
  }
  console.log("hahahah", actions);
  return actions;
}

export const getAction = async (id: BigNumber) => {
  const contract = new ethers.Contract(ACTIONS_CONTRACT_ADDRESS, ActionABI.abi, provider) as Actions;
  const action = await contract.actions(id);

  return {
    creator: action.creator,
    endDate: action.endDate,
    disputePeriodEnd: action.disputePeriodEnd,
    stakeAmount: action.stakeAmount,
    image: action.image,
    metadata: action.metadata,
    amount: action.amount,
    eligibleSubmittersCount: action.eligibleSubmittersCount,
    settled: action.settled
  }
}