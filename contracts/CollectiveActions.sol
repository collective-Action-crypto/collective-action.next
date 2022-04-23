// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Action.sol";

contract CollectiveActions {

    address[] public actions;

    function createAction(
        address token,
        uint256 cutOfTime,
        uint256 optimisticLockDuration,
        bytes32 metadata,
        bytes32 image
    ) public {
        Action action = new Action(msg.sender, token, cutOfTime, optimisticLockDuration, metadata, image);
        actions.push(address(action));
    }
}