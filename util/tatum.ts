import axios from "axios";
const API_KEY = "f0f95c56-c616-4326-b0b9-d3715ed8233e";
export async function callSmartContractFunction( //would also call withdraw function from smart contract etc
  contractAddress: string,
  methodName: string,
  methodABI: object,
  params: string
) {
  const data = {
    contractAddress: contractAddress,
    methodName: methodName,
    methodABI: methodABI,
    params: params,
  };
  const url = `https://api-eu1.tatum.io/v3/polygon/smartcontract`;
  const resp = await axios.post(url, data, {
    headers: {
      "content-type": "application/json",
      "x-api-key": API_KEY,
    },
  });
  console.log(resp.data.txId);
  return resp.data.IpfsHash;
}
export async function pushToIPFS(file: string | Blob) {
  //https://blog.tatum.io/tatum-partners-with-nft-storage-to-offer-free-ipfs-storage-for-nfts-to-developers-183dad64e79d
  const url = `https://api-eu1.tatum.io/v3/ipfs`;
  let data = new FormData();
  data.append("file", file);
  const resp = await axios.post(url, data, {
    headers: {
      "content-type": "application/json",
      "x-api-key": API_KEY,
    },
  });
  console.log("infr", resp.data);
  return resp.data.ipfsHash as string;
}
export async function getFromIPFS(cid: string) {
  const url = `https://api-eu1.tatum.io/v3/ipfs/${cid}`;
  const response = await axios.get(url);
  return response.data;
}
