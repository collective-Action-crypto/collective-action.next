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
    }

    struct Proof {
        address submitter;
        bytes proof;
    }

    struct Dispute {
        address creator;
        uint256 proofIndex;
        bytes disputeProof;
    }

    address governanceToken;
    Action[] public actions;

    mapping(uint256 => Proof[]) public proofs;
    mapping(uint256 => Dispute[]) public disputes;

    constructor(address _governanceToken) {
        governanceToken = _governanceToken;
    }

    function createAction(
        uint256 _endDate,
        uint256 _stakeAmount,
        bytes memory _image,
        bytes memory _metadata
    ) public payable {
        Action memory action;
        action.creator = msg.sender;
        action.endDate = _endDate;
        action.disputePeriodEnd = _endDate + ONE_WEEK_IN_SECONDS;
        action.stakeAmount = _stakeAmount;
        action.image = _image;
        action.metadata = _metadata;
        action.amount = msg.value;
        actions.push(action);
    }

    function contribute(uint256 actionId) public payable {
        Action storage action = actions[actionId];
        require(block.timestamp <= action.endDate, "Contributions after end date are not allowed");
        action.amount += msg.value;
        Mintable(governanceToken).mint(msg.sender, msg.value);
    }

    function submitProof(uint256 actionId, bytes memory proof) public payable {
        Action memory action = actions[actionId];
        require(action.endDate < block.timestamp, "Can't submit a proof proof after end date");
        require(msg.value == action.stakeAmount, "Can't add a proof as stake amount is not valid");
        // todo: not allow to submit proofs multiple times

        Proof memory newProof;
        newProof.submitter = msg.sender;
        newProof.proof = proof;
        proofs[actionId].push(newProof);
    }

    function openDispute(uint256 actionId, uint256 proofIndex, bytes memory proof) public payable {
        Action memory action = actions[actionId];
        require(action.disputePeriodEnd < block.timestamp, "Can't submit a proof proof after end of dispute period");
        require(msg.value == action.stakeAmount, "Can't add a proof as stake amount is not valid");
        // todo: not allow to open dispute multiple times

        Dispute memory dispute;
        dispute.creator = msg.sender;
        dispute.proofIndex = proofIndex;
        dispute.disputeProof = proof;
        disputes[actionId].push(dispute);
    }
}