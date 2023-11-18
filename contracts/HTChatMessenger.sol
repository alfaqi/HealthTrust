// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title HTChatMessenger
 * @dev A contract to facilitate messaging between users.
 */
contract HTChatMessenger is Ownable {
    struct Message {
        address sender;
        address receiver;
        string content;
        uint256 timestamp;
    }

    mapping(address => mapping(address => Message[])) private chatHistory;
    mapping(address => address[]) private userChats;

    event NewMessage(
        address indexed sender,
        address indexed receiver,
        string content,
        uint256 timestamp
    );

    /**
     * @dev Contract constructor sets the contract creator as the owner.
     */
    constructor() Ownable(msg.sender) {}

    /**
     * @dev Sends a message from one user to another.
     * @param _sender The sender's address.
     * @param _receiver The receiver's address.
     * @param _content The content of the message.
     */
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

        if (!chatExists(_sender, _receiver)) {
            userChats[_sender].push(_receiver);
            userChats[_receiver].push(_sender);
        }

        emit NewMessage(_sender, _receiver, _content, block.timestamp);
    }

    /**
     * @dev Retrieves the chat history between two users.
     * @param _sender The sender's address.
     * @param _receiver The receiver's address.
     * @return Message array representing the chat history.
     */
    function getChatHistory(
        address _sender,
        address _receiver
    ) external view returns (Message[] memory) {
        return chatHistory[_sender][_receiver];
    }

    /**
     * @dev Retrieves a list of chat partners for a given user.
     * @param user The user's address.
     * @return Address array representing the list of chat partners.
     */
    function getChatsForUser(
        address user
    ) external view returns (address[] memory) {
        return userChats[user];
    }

    /**
     * @dev Checks if a chat exists between two users.
     * @param _sender The sender's address.
     * @param _receiver The receiver's address.
     * @return A boolean indicating whether the chat exists or not.
     */
    function chatExists(
        address _sender,
        address _receiver
    ) private view returns (bool) {
        address[] storage senderChats = userChats[_sender];
        for (uint256 i = 0; i < senderChats.length; i++) {
            if (senderChats[i] == _receiver) {
                return true;
            }
        }
        return false;
    }
}
