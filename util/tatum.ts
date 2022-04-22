import axios from "axios";
const API_KEY = "f0f95c56-c616-4326-b0b9-d3715ed8233e";
export async function callSmartContractFunction(
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
