// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Action {

    IERC20 public immutable token;
    uint256 public immutable targetAmount;
    uint256 public immutable cutOfTime;
    uint256 public immutable optimisticLockDuration;
    // todo: IPFS title and description
    // todo: IPFS image

    uint256 public raisedAmount = 0;

    mapping(address => uint256) contributors;

    constructor(
        address _token,
        uint256 _targetAmount,
        uint256 _cutOfTime,
        uint256 _optimisticLockDuration
    ) {
        token = IERC20(_token);
        targetAmount = _targetAmount;
        cutOfTime = _cutOfTime;
        optimisticLockDuration = _optimisticLockDuration;
    }

    function contribute(uint256 amount) public {
        require(cutOfTime == 0 || block.timestamp <= cutOfTime, "Contributions after cut-off time are not allowed");

        uint256 newAmount = raisedAmount + amount;
        require(targetAmount == 0 || newAmount <= targetAmount, "Contributions after target amount reached are not allowed");

        contributors[msg.sender] += amount;
        raisedAmount = newAmount;
        token.transferFrom(msg.sender, address(this), amount);
    }
}