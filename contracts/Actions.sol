// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/Mintable.sol";

contract Actions {

    uint256 public constant ONE_WEEK_IN_SECONDS = 604800;

    struct Action {
        address creator;
        uint256 endDate;
        uint256 disputePeriodEnd;
        uint256 stakeAmount;
        bytes image;
        bytes metadata;

        uint256 amount;

        address[] proofSubmitters;
        bytes[] proofs;
    }

    struct Proof {
        address submitter;
        bytes proof;
    }

    address governanceToken;
    Action[] public actions;

    constructor(address _governanceToken) {
        governanceToken = _governanceToken;
    }

    function createAction(
        uint256 _endDate,
        uint256 _stakeAmount,
        bytes memory _image,
        bytes memory _metadata
    ) public {
        Action memory action;
        action.creator = msg.sender;
        action.endDate = _endDate;
        action.disputePeriodEnd = _endDate + ONE_WEEK_IN_SECONDS;
        action.stakeAmount = _stakeAmount;
        action.image = _image;
        action.metadata = _metadata;
        action.amount = 0;
        actions.push(action);
    }

    function contribute(uint256 actionId) public payable {
        Action storage action = actions[actionId];
        require(block.timestamp <= action.endDate, "Contributions after end date are not allowed");
        action.amount += msg.value;
        Mintable(governanceToken).mint(msg.sender, msg.value);
    }

//    function submitProof(uint256 actionId, bytes memory proof) public payable {
//        Action storage action = actions[actionId];
//
//        require(action.proofs[msg.sender].length == 0, "Can't submit a second proof");
//        require(msg.value == action.stakeAmount, "Can't add a proof as stake amount is not valid");
//
//        action.proofSubmitters.push(msg.sender);
//        action.proofs[msg.sender] = proof;
//    }
}