import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import { ethers } from "hardhat";

const deploy = async () => {
  const CoActToken = await ethers.getContractFactory("CoActToken");
  const coActToken = await CoActToken.deploy("CollectiveAction", "CoAct");
  console.log("CoActToken token deployed to:", coActToken.address);

  const Actions = await ethers.getContractFactory("Actions");
  const actions = await Actions.deploy(coActToken.address,
    "0x9BBA071d1f2A397Da82687e951bFC0407280E348",
    "0xEce3383269ccE0B2ae66277101996b58c482817B");
  console.log("Actions deployed to:", actions.address);

  await coActToken.setActionsContract(actions.address);
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });