import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import { ethers } from "hardhat";

const deploy = async () => {
  const CollectiveAction = await ethers.getContractFactory("CollectiveActions");
  const collectiveAction = await CollectiveAction.deploy();
  console.log("CollectiveAction deployed to:", collectiveAction.address);
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });