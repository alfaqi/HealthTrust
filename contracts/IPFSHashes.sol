// SPDX-License-Identifier: MIT
// IPFSHashes Smart Contract

pragma solidity ^0.8.17;
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title IPFSHashes - A contract to store IPFS hashes associated with Ethereum addresses and record IDs
contract IPFSHashes is Ownable {
    mapping(address => mapping(uint256 => string)) private ipfsHashes;

    /// @dev Contract constructor setting the deployer as the owner
    constructor() Ownable(msg.sender) {}

    /// @notice Adds an IPFS hash for a specific Ethereum address and record ID
    /// @param _address The Ethereum address for which the IPFS hash is being added
    /// @param _recordId The record ID associated with the IPFS hash
    /// @param _fileHash The IPFS hash to be associated with the address and record ID
    function addToIPFS(
        address _address,
        uint256 _recordId,
        string memory _fileHash
    ) external {
        ipfsHashes[_address][_recordId] = _fileHash;
    }

    /// @notice Retrieves the IPFS hash associated with a specific Ethereum address and record ID
    /// @param _address The Ethereum address for which the IPFS hash is being retrieved
    /// @param _recordId The record ID associated with the IPFS hash
    /// @return The IPFS hash associated with the address and record ID
    function getIPFSHashes(
        address _address,
        uint256 _recordId
    ) external view returns (string memory) {
        return ipfsHashes[_address][_recordId];
    }
}
