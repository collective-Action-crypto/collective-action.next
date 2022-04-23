// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
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
        bool settled;
    }

    struct Proof {
        address submitter;
        bytes proof;
    }

    struct Dispute {
        address creator;
        uint256 proofIndex;
        bytes disputeProof;
        uint256 disputeEndDate;
        bool settled;

        uint256 forVotes;
        uint256 againstVotes;
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
        dispute.disputeEndDate = block.timestamp + ONE_WEEK_IN_SECONDS;
        disputes[actionId].push(dispute);
    }

    function vote(uint256 actionId, uint256 disputeId, bool voteFor) public {
        uint256 votingPower = IERC20(governanceToken).balanceOf(msg.sender);
        require(votingPower > 0, "You can't vote without governance tokens");
        // todo: prevent double voting
        // todo: prevent transfer manipulation
        Dispute storage dispute = disputes[actionId][disputeId];
        if (voteFor) {
            dispute.forVotes += votingPower;
        } else {
            dispute.againstVotes += votingPower;
        }
    }

    function settle() public {
        for (uint256 i = 0; i < actions.length; i++) {
            Action memory a = actions[i];
            if (a.settled) {
                continue;
            }
            (bool ongoing, bool unsettled) = hasDisputes(i);
            if (unsettled) {
                // todo: settle disputes
            }

            if (!ongoing && block.timestamp > a.disputePeriodEnd) {// no ongoing disputes and dispute period ended settle action
                // todo: settle action
            }
        }
    }

    function hasUnsettled() public view returns (bool)  {
        for (uint256 i = 0; i < actions.length; i++) {
            Action memory a = actions[i];
            if (a.settled) {
                continue;
            }
            // case one has unsettled disputes
            (bool ongoing, bool unsettled) = hasDisputes(i);
            if (unsettled || (!ongoing && block.timestamp > a.disputePeriodEnd)) {
                return true;
            }
        }

        return false;
    }

    // ongoing, unsettled
    function hasDisputes(uint256 actionId) private view returns (bool, bool) {
        Dispute[] memory actionDisputes = disputes[actionId];
        bool ongoing = false;
        bool unsettled = false;
        for (uint256 i = 0; i < actionDisputes.length; i++) {
            if (actionDisputes[i].disputeEndDate > block.timestamp) {
                ongoing = true;
            } else if (!actionDisputes[i].settled) {
                unsettled = true;
            }
        }

        return (ongoing, unsettled);
    }
}