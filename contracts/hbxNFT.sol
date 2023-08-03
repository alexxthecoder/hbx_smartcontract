// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceRequest {
    // initialize Chainlink Interface 
    AggregatorV3Interface internal oracle;
    
    // Assign oracle contract address to provide price data of ETH/USD
    constructor() { 
    oracle = AggregatorV3Interface(0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e);
    }

    // The requestPrice function returns latest price and can be called by anyone to request the current price of the asset
    function requestPrice() external view returns (uint) {
    (, int price, , , ) = oracle.latestRoundData();
        
        if (price < 0) {
            return 0;
        }

        return uint(price);
    }
}


contract hbxNFT is ERC721URIStorage, Ownable {
    uint256 public ethPriceThreshold = 2000 * 10 ** 18; // Price threshold in wei
    bool public minted = false; // Flag to track if NFT has already been minted
    address public nftOwner; // Address of the NFT owner


    PriceRequest public priceRequestContract; // PriceRequest contract instance

    constructor(address _priceRequestContract) ERC721("hbxNFT", "HBX") {
        priceRequestContract = PriceRequest(_priceRequestContract); // Set the PriceRequest contract instance
    }

    function mintNFT(uint256 tokenId, string memory tokenURI) public returns (uint256) {
        
        uint ethPrice = priceRequestContract.requestPrice();
        require(ethPrice >= ethPriceThreshold, "ETH price hasn't reached the threshold");

        require(!minted, "NFT has already been minted");

        // Mint NFT to the contract owner
        nftOwner = msg.sender;
        _safeMint(nftOwner, tokenId);
        _setTokenURI(tokenId, tokenURI);
        minted = true;

        return tokenId;
    }
    
}
