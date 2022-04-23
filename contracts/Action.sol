// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Action {

    uint256 public constant ONE_WEEK_IN_SECONDS = 604800;

    address public immutable creator;
    uint256 public immutable endDate;
    uint256 public immutable disputePeriod;
    uint256 public immutable stakeAmount;
    bytes public image;
    bytes public metadata;

    uint256 public raisedAmount = 0;
    mapping(address => uint256) contributors;

    address[] participants;
    mapping(address => bytes) participantProofs;

    constructor(
        address _creator,
        uint256 _endDate,
        uint256 _disputePeriod,
        uint256 _stakeAmount,
        bytes memory _image,
        bytes memory _metadata
    ) {
        require(_endDate > block.timestamp, "_endDate can't be in the past");
        require(_disputePeriod >= ONE_WEEK_IN_SECONDS, "_disputePeriod should be not less than a one week");

        creator = _creator;
        endDate = _endDate;
        disputePeriod = _disputePeriod;
        stakeAmount = _stakeAmount;
        image = _image;
        metadata = _metadata;
    }

    function contribute() public payable {
        require(block.timestamp <= endDate, "Contributions after end date are not allowed");
        contributors[msg.sender] += msg.value;
        raisedAmount += msg.value;
    }

    function submitProof(bytes memory proof) public payable {
        require(participantProofs[msg.sender].length == 0, "Can't submit a second proof");
        require(msg.value == stakeAmount, "Can't add a proof as stake amount is not valid");

        participants.push(msg.sender);
        participantProofs[msg.sender] = proof;
    }

    function distribute() public {
        require(block.timestamp >= endDate + disputePeriod, "Can't distribute money before dispute period ends");

        uint256 amount = raisedAmount / participants.length + stakeAmount;
        for (uint256 i = 0; i < participants.length; i++) {
            payable(participants[i]).transfer(amount);
        }
    }

    // todo: resolve dispute
    // todo: raise dispute
}