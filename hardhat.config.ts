import { HardhatUserConfig } from "hardhat/config";
import "@typechain/hardhat"
import "@nomiclabs/hardhat-ethers"

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  solidity: "0.8.13",
  typechain: {
    outDir: "artifacts/contracts/types",
    target: "ethers-v5"
  },
}

export default config;
