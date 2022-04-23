import { BigNumber, ethers } from "ethers";
import ActionABI from "../artifacts/contracts/Actions.sol/Actions.json";
import CoActTokenABI from "../artifacts/contracts/CoActToken.sol/CoActToken.json";
import { Actions, CoActToken } from "../artifacts/contracts/types";
import { getFromIPFS } from "./tatum";
import { ACTIONS_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS } from "./constants";

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

export const contract = new ethers.Contract(
  ACTIONS_CONTRACT_ADDRESS,
  ActionABI.abi,
  provider
) as Actions;

export const tokenContract = new ethers.Contract(
  TOKEN_CONTRACT_ADDRESS,
  CoActTokenABI.abi,
  provider
) as CoActToken;

export async function getTokenBalance(address: string) {
  return await tokenContract.balanceOf(address);
}

export async function getListOfActions() {
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
  const contract = new ethers.Contract(
    ACTIONS_CONTRACT_ADDRESS,
    ActionABI.abi,
    provider
  ) as Actions;
  let disputes = [] as object[];
  let action = 0;
  while (true) {
    let dispute = 0;
    console.log("Ulad loves tatum", dispute);
    const tmp = await contract.getDisputes(action);
    //if (address) debugger;
    console.log("Ulad loves tatum2", tmp);
    if (!tmp || tmp.length == 0) break;
    for (let i = 0; i < tmp.length; i++) {
      const tmpDispute = tmp[i];
      const proof = (await contract.getProofs(action))[
        tmpDispute.proofIndex.toNumber()
      ];
      const voted = address
        ? await contract.hasVoted(action, dispute, address)
        : false;
      disputes.push({
        action: action,
        creator: tmpDispute.creator,
        forProof: proof.proof,
        againstVotes: tmpDispute.againstVotes,
        alreadyVoted: voted,
        forVotes: tmpDispute.forVotes,
        disputeEndDate: tmpDispute.disputeEndDate,
        settled: tmpDispute.settled,
        disputeProof: tmpDispute.disputeProof,
      });
    }
    /*while (true) {
      const tmp = await contract.disputes(action, dispute);
      if (!tmp || (tmp[0] as any) == 0) break;
      //const metadata = await getFromIPFS(tmp.metadata);
      const proof = await contract.proofs(action, tmp.proofIndex);
      const voted = address
        ? await contract.hasVoted(action, dispute, address)
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
    }*/
    action++;
  }
  console.log("hahahah", disputes);
  return disputes;
}

export const getAction = async (id: BigNumber) => {
  const contract = new ethers.Contract(
    ACTIONS_CONTRACT_ADDRESS,
    ActionABI.abi,
    provider
  ) as Actions;
  const action = await contract.actions(id);

  return {
    creator: action.creator,
    creationDate: action.creationDate,
    endDate: action.endDate,
    disputePeriodEnd: action.disputePeriodEnd,
    stakeAmount: action.stakeAmount,
    image: action.image,
    metadata: action.metadata,
    amount: action.amount,
    eligibleSubmittersCount: action.eligibleSubmittersCount,
    settled: action.settled,
  };
};
export const getSubmissions = async (actionId: BigNumber) => {
  const contract = new ethers.Contract(
    ACTIONS_CONTRACT_ADDRESS,
    ActionABI.abi,
    provider
  ) as Actions;
  const submissions = await contract.getProofs(actionId);
  return submissions.map((it) => {
    return {
      submitter: it.submitter,
      proof: it.proof,
      failed: it.failed,
    };
  });
};
