// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title A simple chat messenger smart contract.
/// @dev Users can send messages to each other and retrieve chat history.
contract HTChatMessenger is Ownable {
    struct Message {
        address sender;
        address receiver;
        string content;
        uint256 timestamp;
    }

    mapping(address => mapping(address => Message[])) private chatHistory;

    event NewMessage(
        address indexed sender,
        address indexed receiver,
        string content,
        uint256 timestamp
    );

    /// @dev Initializes the contract and sets the deployer as the owner.
    constructor() Ownable(msg.sender) {}

    /// @notice Sends a message from one user to another.
    /// @param _sender The address of the sender.
    /// @param _receiver The address of the receiver.
    /// @param _content The content of the message.
    function sendMessage(
        address _sender,
        address _receiver,
        string memory _content
    ) external {
        require(_sender != _receiver, "You cannot send a message to yourself");

        Message memory newMessage = Message({
            sender: _sender,
            receiver: _receiver,
            content: _content,
            timestamp: block.timestamp
        });

        chatHistory[_sender][_receiver].push(newMessage);
        chatHistory[_receiver][_sender].push(newMessage);

        emit NewMessage(_sender, _receiver, _content, block.timestamp);
    }

    /// @notice Retrieves the chat history between two users.
    /// @param _sender The address of the first user.
    /// @param _receiver The address of the second user.
    /// @return An array of messages exchanged between the two users.
    function getChatHistory(
        address _sender,
        address _receiver
    ) external view returns (Message[] memory) {
        return chatHistory[_sender][_receiver];
    }
}
