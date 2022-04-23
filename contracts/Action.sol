// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Action {

    address public immutable creator;
    IERC20 public immutable token;
    uint256 public immutable endDate;
    uint256 public immutable disputePeriod;
    bytes32 public immutable image;
    bytes32 public immutable metadata;

    uint256 public raisedAmount = 0;

    mapping(address => uint256) contributors;

    constructor(
        address _creator,
        address _token,
        uint256 _endDate,
        uint256 _disputePeriod,
        bytes32 _image,
        bytes32 _metadata
    ) {
        creator = _creator;
        token = IERC20(_token);
        endDate = _endDate;
        disputePeriod = _disputePeriod;
        image = _image;
        metadata = _metadata;
    }

    function contribute(uint256 amount) public {
        require(block.timestamp <= endDate, "Contributions after end date are not allowed");
        contributors[msg.sender] += amount;
        raisedAmount += amount;
        token.transferFrom(msg.sender, address(this), amount);
    }
}