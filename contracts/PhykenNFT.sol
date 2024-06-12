// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol'; 
import '@openzeppelin/contracts/access/Ownable.sol';  
import '@openzeppelin/contracts/utils/Strings.sol';

contract PhykenNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSupply;
    bool public isPublicMintEnabled;
    string internal baseTokenUri;
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;
    mapping(uint256 => bool) private _tokenExists;

    constructor(address initialOwner) payable ERC721('PHYKEN','PHYK') Ownable(initialOwner) {
        mintPrice = 0.0001 ether;
        totalSupply = 0;
        maxSupply = 1000;
        // add withdraw wallet address
    }

    function setIsPublicMintEnabled(bool isPublicMintEnabled_) external onlyOwner {
        isPublicMintEnabled = isPublicMintEnabled_;
    }

    function setBaseTokenUri(string calldata baseTokenUri_) external onlyOwner {
        baseTokenUri = baseTokenUri_;
    }

    function tokenUri(uint256 tokenId_) public view returns(string memory) {
        require(_tokenExists[tokenId_], 'token does not exist');
        return string(abi.encodePacked(baseTokenUri, Strings.toString(tokenId_), ".json"));
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{value: address(this).balance}('');
        require(success, "withdraw failed");
    }

    function mint(uint256 quantity_) public payable {
        require(isPublicMintEnabled, "minting not enabled");
        require(msg.value == quantity_ * mintPrice, 'wrong mint value');
        require(totalSupply + quantity_ <= maxSupply, "sold out");
        for (uint256 i = 0; i < quantity_; i++) {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);
            _tokenExists[newTokenId] = true; // Mark the token as existing
        }
    }
}
