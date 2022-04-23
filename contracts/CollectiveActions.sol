// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Action.sol";

contract CollectiveActions {

    address[] public actions;

    function createAction(
        uint256 endDate,
        uint256 disputePeriod,
        uint256 stakeAmount,
        bytes memory image,
        bytes memory metadata
    ) public {
        Action action = new Action(msg.sender, endDate, disputePeriod, stakeAmount, image, metadata);
        actions.push(address(action));
    }
}