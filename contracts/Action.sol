//// SPDX-License-Identifier: MIT
//pragma solidity ^0.8.0;
//
//import "./Action.sol";
//
//contract Action {
//
//    uint256 public constant ONE_WEEK_IN_SECONDS = 604800;
//
//    address public immutable creator;
//    uint256 public immutable endDate;
//    uint256 public immutable disputePeriod;
//    uint256 public immutable stakeAmount;
//    bytes public image;
//    bytes public metadata;
//
//    uint256 public raisedAmount = 0;
//    mapping(address => uint256) contributors;
//
//    address[] participants;
//    mapping(address => bytes) participantProofs;
//
//    struct Dispute {
//        address owner;
//        address participant;
//        bytes disputeProof;
//        uint endDate;
//    }
//
//    Dispute[] disputes;
//
//    constructor(
//        address _creator,
//        uint256 _endDate,
//        uint256 _disputePeriod,
//        uint256 _stakeAmount,
//        bytes memory _image,
//        bytes memory _metadata
//    ) {
//        require(_endDate > block.timestamp, "_endDate can't be in the past");
//        require(_disputePeriod >= ONE_WEEK_IN_SECONDS, "_disputePeriod should be not less than a one week");
//
//        creator = _creator;
//        endDate = _endDate;
//        disputePeriod = _disputePeriod;
//        stakeAmount = _stakeAmount;
//        image = _image;
//        metadata = _metadata;
//    }
//
//
//    function distribute() public {
//        require(block.timestamp >= endDate + disputePeriod, "Can't distribute money before dispute period ends");
//        for (uint256 i = 0; i < disputes.length; i++) {
//            require()
//        }
//
//        uint256 amount = raisedAmount / participants.length + stakeAmount;
//        for (uint256 i = 0; i < participants.length; i++) {
//            payable(participants[i]).transfer(amount);
//        }
//    }
//
//    function openDispute(address participant, bytes memory disputeProof) public payable {
//        require(participantProofs[participant].length != 0, "Can't a dispute against a person without submission");
//        require(msg.value == stakeAmount, "Can't open a dispute as stake amount is not valid");
//
//        Dispute memory dispute;
//        dispute.owner = msg.sender;
//        dispute.participant = participant;
//        dispute.disputeProof = disputeProof;
//        dispute.endDate = block.timestamp + ONE_WEEK_IN_SECONDS;
//        disputes.push(dispute);
//    }
//
//    function voteForDispute(uint256 index, ) {
//
//    }
//
//}