import { POSClient, use } from "@maticnetwork/maticjs";
import { Web3ClientPlugin } from "@maticnetwork/maticjs-web3";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Dispatch, SetStateAction } from "react";
import Web3 from "web3";
import OpenLogin from "@toruslabs/openlogin";

// install web3 plugin
use(Web3ClientPlugin);

const posConfig = {
  rpc: {
    root: "https://goerli.infura.io/v3/73d0b3b9a4b2499da81c71a2b2a473a9",
    child: process.env.MATIC_RPC || "https://rpc-mumbai.matic.today",
  },
  pos: {
    parent: {
      erc20: "0x655f2166b0709cd575202630952d71e2bb0d61af",
      erc721: "0x16F7EF3774c59264C46E5063b1111bCFd6e7A72f",
      erc1155: "0x2e3Ef7931F2d0e4a7da3dea950FF3F19269d9063",
    },
    child: {
      erc721: "0xbD88C3A7c0e242156a46Fbdf87141Aa6D0c0c649",
      erc20: "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1",
      weth: "0x714550C2C1Ea08688607D86ed8EeF4f5E4F22323",
      erc1155: "0xA07e45A987F19E25176c877d98388878622623FA",
    },
  },
};

const polygonConnector = {
  _posClient: null,
  connect: async (
    _privateKey: string,
    from: string,
    parentProvider: any,
    childProvider: any
  ) => {
    const posClient = new POSClient();
    await posClient.init({
      network: "testnet",
      version: "mumbai",
      parent: {
        provider: parentProvider,
        defaultConfig: {
          from,
        },
      },
      child: {
        provider: childProvider,
        defaultConfig: {
          from,
        },
      },
    });
    //@ts-ignore
    polygonConnector._posClient = posClient;
    return { posClient };
  },
  getClient: async (
    _privateKey: string,
    from: string,
    parentProvider: any,
    childProvider: any
  ) => {
    if (polygonConnector._posClient) {
      return { posClient: polygonConnector._posClient };
    }
    return await polygonConnector.connect(
      _privateKey,
      from,
      parentProvider,
      childProvider
    );
  },
};

const getMaticAccountDetails = async (
  privateKey: string,
  level: string,
  setUserAccountInfo: Dispatch<SetStateAction<object>>
) => {
  const parentProvider = (
    await EthereumPrivateKeyProvider.getProviderInstance({
      privKey: privateKey,
      chainConfig: {
        chainId: "0x5",
        rpcTarget: posConfig.rpc.root,
      } as any,
    })
  ).provider;

  const childProvider = (
    await EthereumPrivateKeyProvider.getProviderInstance({
      privKey: privateKey,
      chainConfig: {
        chainId: "0x13881",
        rpcTarget: posConfig.rpc.child,
      } as any,
    })
  ).provider;

  const web3 = new Web3(parentProvider as any);

  const [address] = await web3.eth.getAccounts();
  const { posClient } = await polygonConnector.getClient(
    privateKey,
    address,
    parentProvider,
    childProvider
  );
  const tokenAddress =
    level === "l1" ? posConfig.pos.parent.erc20 : posConfig.pos.child.erc20;

  const erc20Token = posClient.erc20(tokenAddress, level === "l1");

  const balance = await erc20Token.getBalance(address);

  setUserAccountInfo({ balance, address });
};
export async function initializeOpenlogin(
  level: string,
  setUserAccountInfo: Dispatch<SetStateAction<object>>,
  setSdk: Dispatch<SetStateAction<OpenLogin>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) {
  // you can get your project id/clientId from https://developer.tor.us
  // for localhost you can pass any string as clientId
  const sdkInstance = new OpenLogin({
    clientId:
      "BFxYFZ3I46rXdWHUD0tiiZWsw5e9jmFg7_4-2UHKuPRPQEYXUBXwyCPUGu6DPME1CmTBRtUp2WWXQ2EXJt15wa8", // your project id
    network: "testnet",
  });

  await sdkInstance.init();
  if (sdkInstance.privKey) {
    console.log(sdkInstance.privKey, "priv key");
    await getMaticAccountDetails(
      sdkInstance.privKey,
      level,
      setUserAccountInfo
    );
  }
  setSdk(sdkInstance);
  setLoading(false);
}
export async function handleLogin(
  openlogin: object,
  setLoading: Dispatch<SetStateAction<boolean>>,
  level: string,
  setUserAccountInfo: Dispatch<SetStateAction<object>>
) {
  setLoading(true);
  try {
    const privKey = await (openlogin as any).login({
      loginProvider: "google",
      redirectUrl: window.origin,
    });
    await getMaticAccountDetails(privKey.privKey, level, setUserAccountInfo);
    setLoading(false);
  } catch (error) {
    console.log("error", error);
    setLoading(false);
  }
}
export const handleLogout = async (
  openlogin: OpenLogin,
  setLoading: Dispatch<SetStateAction<boolean>>,
  fastLogin = false
) => {
  setLoading(true);
  await openlogin.logout({
    fastLogin,
  });
  setLoading(false);
};
