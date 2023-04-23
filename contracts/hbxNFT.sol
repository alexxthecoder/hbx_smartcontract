// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./pricerequest_contract.sol";

contract hbxNFT is ERC721URIStorage, Ownable {
    int256 public ethPriceThreshold = 2000 * 10 ** 18; // Price threshold in wei
    bool public minted = false; // Flag to track if NFT has already been minted
    address public nftOwner; // Address of the NFT owner


    PriceRequest public priceRequestContract; // PriceRequest contract instance

    constructor(address _priceRequestContract) ERC721("hbxNFT", "HBX") {
        priceRequestContract = PriceRequest(_priceRequestContract); // Set the PriceRequest contract instance
    }

    function mintNFT(uint256 tokenId, string memory tokenURI) public returns (uint256) {
        require(!minted, "NFT has already been minted");

        int256 ethPrice = priceRequestContract.requestPrice();
        require(ethPrice >= ethPriceThreshold, "ETH price hasn't reached the threshold");

        // Mint NFT to the contract owner
        nftOwner = msg.sender;
        _safeMint(nftOwner, tokenId);
        _setTokenURI(tokenId, tokenURI);
        minted = true;

        return tokenId;
    }
    
}
