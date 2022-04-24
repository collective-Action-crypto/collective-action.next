// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/Mintable.sol";
import "./interfaces/IAave.sol";

contract Actions {

    uint256 public constant TWENTY_MINUTES_IN_SECONDS = 20 * 60;

    struct Action {
        address creator;
        uint256 creationDate;
        uint256 endDate;
        uint256 disputePeriodEnd;
        uint256 stakeAmount;
        string image;
        string metadata;

        uint256 amount;
        uint256 eligibleSubmittersCount;
        bool settled;
    }

    struct Proof {
        address submitter;
        string proof;
        bool failed;
    }

    struct Dispute {
        address creator;
        uint256 proofIndex;
        string disputeProof;
        uint256 disputeEndDate;
        bool settled;

        uint256 forVotes;
        uint256 againstVotes;
    }

    struct Votes {
        mapping(address => bool) voted;
    }

    address public immutable governanceToken;
    address public immutable aaveAddress;
    address public immutable lendingPoolAddress;

    uint256 public depositedAmount = 0;

    uint256 public actionIndex = 0;
    mapping(uint256 => Action) public actions;

    mapping(uint256 => Proof[]) public proofs;
    mapping(uint256 => Dispute[]) public disputes;
    mapping(uint256 => mapping(uint256 => Votes)) votes;

    constructor(address _governanceToken, address _aaveAddress, address _lendingPoolAddress) {
        governanceToken = _governanceToken;
        aaveAddress = _aaveAddress;
        lendingPoolAddress = _lendingPoolAddress;
    }

    function createAction(
        uint256 _endDate,
        uint256 _stakeAmount,
        string memory _image,
        string memory _metadata
    ) public payable {
        Action memory action;
        action.creator = msg.sender;
        action.creationDate = block.timestamp;
        action.endDate = _endDate;
        action.disputePeriodEnd = _endDate + TWENTY_MINUTES_IN_SECONDS;
        action.stakeAmount = _stakeAmount;
        action.image = _image;
        action.metadata = _metadata;
        action.amount = msg.value;
        action.eligibleSubmittersCount = 0;
        actions[actionIndex] = action;
        actionIndex++;
    }

    function contribute(uint256 actionId) public payable {
        Action storage action = actions[actionId];
        require(block.timestamp <= action.endDate, "Contributions after end date are not allowed");
        action.amount += msg.value;
        Mintable(governanceToken).mint(msg.sender, msg.value);
    }

    function submitProof(uint256 actionId, string memory proof) public payable {
        Action storage action = actions[actionId];
        require(block.timestamp <= action.endDate, "Can't submit a proof proof after end date");
        require(msg.value == action.stakeAmount, "Can't add a proof as stake amount is not valid");
        action.eligibleSubmittersCount++;
        // todo: not allow to submit proofs multiple times

        Proof memory newProof;
        newProof.submitter = msg.sender;
        newProof.proof = proof;
        proofs[actionId].push(newProof);
    }

    function openDispute(uint256 actionId, uint256 proofIndex, string memory proof) public payable {
        Action memory action = actions[actionId];
        require(action.disputePeriodEnd > block.timestamp, "Can't submit a proof proof after end of dispute period");
        require(msg.value == action.stakeAmount, "Can't add a proof as stake amount is not valid");
        // todo: not allow to open dispute multiple times

        Dispute memory dispute;
        dispute.creator = msg.sender;
        dispute.proofIndex = proofIndex;
        dispute.disputeProof = proof;
        dispute.disputeEndDate = block.timestamp + TWENTY_MINUTES_IN_SECONDS;
        disputes[actionId].push(dispute);
    }

    function vote(uint256 actionId, uint256 disputeId, bool voteFor) public {
        uint256 votingPower = IERC20(governanceToken).balanceOf(msg.sender);
        require(votingPower > 0, "You can't vote without governance tokens");
        require(!votes[actionId][disputeId].voted[msg.sender], "You can't vote two times");
        votes[actionId][disputeId].voted[msg.sender] = true;

        Dispute storage dispute = disputes[actionId][disputeId];
        if (voteFor) {
            dispute.forVotes += votingPower;
        } else {
            dispute.againstVotes += votingPower;
        }
    }

    function settle() external {
        for (uint256 i = 0; i < actionIndex; i++) {
            Action memory a = actions[i];
            if (a.settled) {
                continue;
            }
            (bool ongoing, bool unsettled) = hasDisputes(i);
            if (unsettled) {
                settleDisputes(i);
            }

            if (!ongoing && block.timestamp > a.disputePeriodEnd) {// no ongoing disputes and dispute period ended settle action
                settleAction(i);
            }
        }
    }

    function settleAction(uint256 actionId) private {
        Action memory action = actions[actionId];
        Proof[] memory actionProofs = proofs[actionId];
        uint256 amountToPay = action.amount / action.eligibleSubmittersCount + action.stakeAmount;
        for (uint256 i = 0; i < actionProofs.length; i++) {
            if (!actionProofs[i].failed) {
                _pay(amountToPay, actionProofs[i].submitter);
            }
        }
        actions[actionId].settled = true;
    }

    function settleDisputes(uint256 actionId) private {
        Dispute[] storage actionDisputes = disputes[actionId];
        for (uint256 i = 0; i < actionDisputes.length; i++) {
            Dispute storage current = actionDisputes[i];
            if (current.disputeEndDate > block.timestamp && !current.settled) {
                settleDispute(current, actionId);
            }
        }
    }

    function settleDispute(Dispute storage dispute, uint256 actionId) private {
        if (dispute.forVotes > dispute.againstVotes) {// challenger wins
            Proof storage proof = proofs[actionId][dispute.proofIndex];
            proof.failed = true;
            actions[actionId].eligibleSubmittersCount--;

            _pay(2 * actions[actionId].stakeAmount, dispute.creator);
        } else {// proof submitter wins, challenger money stay with us
            dispute.settled = true;
        }
    }

    function hasUnsettled() public view returns (bool)  {
        for (uint256 i = 0; i < actionIndex; i++) {
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

    function hasVoted(uint256 actionId, uint256 disputeId, address voter) public view returns (bool) {
        return votes[actionId][disputeId].voted[voter];
    }

    function getProofs(uint256 actionId) public view returns (Proof[] memory) {
        Proof[] memory actionProofs = proofs[actionId];
        Proof[] memory result = new Proof[](actionProofs.length);
        for (uint256 i = 0; i < actionProofs.length; i++) {
            Proof memory current = actionProofs[i];
            result[i].submitter = current.submitter;
            result[i].proof = current.proof;
            result[i].failed = current.failed;
        }

        return result;
    }

    function getDisputes(uint256 actionId) public view returns (Dispute[] memory) {
        Dispute[] memory actionDisputes = disputes[actionId];
        Dispute[] memory result = new Dispute[](actionDisputes.length);
        for (uint256 i = 0; i < actionDisputes.length; i++) {
            Dispute memory current = actionDisputes[i];
            result[i].creator = current.creator;
            result[i].proofIndex = current.proofIndex;
            result[i].disputeProof = current.disputeProof;
            result[i].disputeEndDate = current.disputeEndDate;
            result[i].settled = current.settled;
            result[i].forVotes = current.forVotes;
            result[i].againstVotes = current.againstVotes;
        }

        return result;
    }

    function depositToAave() external {
        if (address(this).balance < 1 ether) {
            return;
        }

        uint256 toDeposit = address(this).balance - 1 ether;
        depositedAmount += toDeposit;
        IAave(aaveAddress).depositETH{value : toDeposit}(lendingPoolAddress, address(this), uint16(0));
    }

    function _withdrawFromAave(uint256 amount) private {
        IAave(aaveAddress).withdrawETH(lendingPoolAddress, amount, address(this));
        depositedAmount -= amount;
    }

    function _pay(uint256 amount, address to) private {
        if (amount > address(this).balance) {
            _withdrawFromAave(amount - address(this).balance + 1 ether);
        }

        payable(to).transfer(amount);
    }

    function withdrawAll() public {// todo: remove
        _withdrawFromAave(depositedAmount);
        payable(msg.sender).transfer(address(this).balance);
    }
}