import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import { ethers } from "hardhat";

const deploy = async () => {
  const CoActToken = await ethers.getContractFactory("CoActToken");
  const coActToken = await CoActToken.deploy("CollectiveAction", "CoAct");
  console.log("CoActToken token deployed to:", coActToken.address);

  const Actions = await ethers.getContractFactory("Actions");
  const actions = await Actions.deploy(coActToken.address);
  console.log("Actions deployed to:", actions.address);

  await coActToken.setActionsContract(actions.address);
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });