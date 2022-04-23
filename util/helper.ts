export async function createBlobFromObject(object: object) {
  return new Blob([JSON.stringify(object)]);
}
export async function loadFile(uri: string) {
  return (await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  })) as Blob;
}

export interface action {
  creator: string;
  endDate: number;
  disputePeriodEnd: number;
  stakeAmount: number;
  image: string;
  title: string;
  description: string;
  requirements: string;
  amount: number;
  settled: boolean;
  participants: number;
}
export interface dispute {
  action: number;
  creator: string;
  forProof: string;
  againstVotes: number;
  alreadyVoted: boolean;
  forVotes: number;
  disputeEndDate: number;
  settled: boolean;
  disputeProof: string;
}
