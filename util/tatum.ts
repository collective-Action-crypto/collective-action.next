import axios from "axios";
import { ethers } from "ethers";
import { ACTIONS_CONTRACT_ADDRESS } from "./constants";

const API_KEY = "f0f95c56-c616-4326-b0b9-d3715ed8233e";

export async function callSmartContractFunction( //would also call withdraw function from smart contract etc
  methodName: string,
  methodABI: object,
  params: string[],
  amount: string,
  privateKey: string
) {
  const data = {
    contractAddress: ACTIONS_CONTRACT_ADDRESS,
    methodName: methodName,
    methodABI: methodABI,
    params: params,
    amount: amount,
    fromPrivateKey: privateKey,
  };

  const url = `https://api-eu1.tatum.io/v3/polygon/smartcontract`;
  try {
    const resp = await axios.post(url, data, {
      headers: {
        "content-type": "application/json",
        "x-api-key": API_KEY,
      },
    });
    return resp.data.IpfsHash;
  } catch (error) {
    throw Error(error)
  }
}

export async function pushToIPFS(file: string | Blob) {
  //https://blog.tatum.io/tatum-partners-with-nft-storage-to-offer-free-ipfs-storage-for-nfts-to-developers-183dad64e79d
  try {
    const url = `https://api-eu1.tatum.io/v3/ipfs`;
    let data = new FormData();
    const resp = await axios.post(url, data, {
      headers: {
        "content-type": "application/json",
        "x-api-key": API_KEY,
      },
    });
    return resp.data.ipfsHash as string;
  } catch(error) {
    throw Error(error)
  }
}

export async function getFromIPFS(cid: string) {
  console.log("nifkmfe", cid);
  const url = `https://api-eu1.tatum.io/v3/ipfs/${cid}`;
  const response = await axios.get(url);
  return response.data;
}

export const toIPFSUrl = (cid: string) => {
  return "https://ipfs.io/ipfs/" + cid;
};
