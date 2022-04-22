import axios from "axios";
const API_KEY = "010c373b411c8676b904";
const SECRET =
  "186df95adbbf8574805e1967f6f800a039480d48445013b2eaf8d4f59b96f036";
const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmZmJjZWU0NS0zNGZkLTQ3ZGYtYjU5ZC1mYzQxOTQwMGMxMGQiLCJlbWFpbCI6Imp1c3Rpbi5hbGV4YW5kZXIuaGVpbnpAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZX0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjAxMGMzNzNiNDExYzg2NzZiOTA0Iiwic2NvcGVkS2V5U2VjcmV0IjoiMTg2ZGY5NWFkYmJmODU3NDgwNWUxOTY3ZjZmODAwYTAzOTQ4MGQ0ODQ0NTAxM2IyZWFmOGQ0ZjU5Yjk2ZjAzNiIsImlhdCI6MTY0ODkxNjE3Nn0.lDRJp_a4ylZGPcvh3ccY5PE_FCUixpPFhY5PFo1BjmQ";
export async function postPayrollToIPFS(
  wallet: string,
  amount: string,
  month: number,
  name: string
) {
  const data = { wallet: wallet, amount: amount, month: month, name: name };
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  const resp = await axios.post(url, data, {
    headers: {
      pinata_api_key: API_KEY,
      pinata_secret_api_key: SECRET,
    },
  });
  console.log(resp.data.IpfsHash);
  return resp.data.IpfsHash;
}
