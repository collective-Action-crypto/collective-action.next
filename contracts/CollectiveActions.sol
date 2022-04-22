// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Action.sol";

contract CollectiveActions {

    address[] public actions;

    function createAction(
        address token,
        uint256 targetAmount,
        uint256 cutOfTime,
        uint256 optimisticLockDuration
    ) {
        Action action = new Action(msg.sender, token, targetAmount, cutOfTime, optimisticLockDuration);
        actions.push(action);
    }
}