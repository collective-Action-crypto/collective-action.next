import { ethers } from "ethers";
import actionabi from "../artifacts/contracts/Actions.sol/Actions.json";
import { Actions } from "../artifacts/contracts/types";
import { getFromIPFS } from "./tatum";
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

export async function getListOfDisputes(address: string | undefined) {
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
  let disputes = [] as object[];
  let action = 0;

  while (true) {
    let dispute = 0;
    const tmp = await contract.disputes(action, dispute);
    if (!tmp || (tmp[0] as any) == 0) break;
    while (true) {
      const tmp = await contract.disputes(action, dispute);
      if (!tmp || (tmp[0] as any) == 0) break;
      //const metadata = await getFromIPFS(tmp.metadata);
      const proof = await contract.proofs(action, tmp.proofIndex);
      const voted = address
        ? await contract.votes(action, dispute, address)
        : false;
      disputes.push({
        action: action,
        creator: tmp.creator,
        forProof: proof.proof,
        againstVotes: tmp.againstVotes,
        alreadyVoted: voted,
        forVotes: tmp.forVotes,
        disputeEndDate: tmp.disputeEndDate,
        settled: tmp.settled,
        disputeProof: tmp.disputeProof,
      });
      console.log("mmh", tmp);
      dispute++;
    }
    action++;
  }
  console.log("hahahah", disputes);
  return disputes;
}
