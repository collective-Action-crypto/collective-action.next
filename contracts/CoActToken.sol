// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CoActToken is ERC20, Ownable {

    address public actionsContract;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
    }

    modifier onlyActions() {
        require(msg.sender == actionsContract, "only actions contract can call this function");
        _;
    }

    function setActionsContract(address _actionsContract) public onlyOwner {
        actionsContract = _actionsContract;
    }

    function mint(address account, uint256 amount) external onlyActions {
        _mint(account, amount);
    }
}