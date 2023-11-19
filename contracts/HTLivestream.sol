// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title HT Livestream Contract
/// @notice Contract to manage live stream IDs and playback IDs for users
contract HTLivestream is Ownable {
    struct LiveID {
        string streamID;
        string playbackID;
    }
    mapping(address => LiveID) private liveIDs;

    constructor() Ownable(msg.sender) {}

    /// @notice Add or update live stream and playback IDs for a specific address
    /// @param _address The address for which the live stream and playback IDs are added or updated
    /// @param _streamID The unique stream ID associated with the address
    /// @param _playbackID The playback ID associated with the address
    function addLive(
        address _address,
        string memory _streamID,
        string memory _playbackID
    ) public {
        liveIDs[_address] = LiveID({
            streamID: _streamID,
            playbackID: _playbackID
        });
    }

    /// @notice Get the live stream and playback IDs associated with a specific address
    /// @param _address The address for which the live stream and playback IDs are retrieved
    /// @return LiveID structure containing the stream ID and playback ID
    function getLive(address _address) public view returns (LiveID memory) {
        return liveIDs[_address];
    }
}
