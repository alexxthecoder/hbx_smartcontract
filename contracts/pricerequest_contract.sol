// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceRequest {
    // initialize Chainlink Interface 
    AggregatorV3Interface internal oracle;
    
    // Assign oracle contract address to provide price data of ETH/USD
    constructor() { 
    oracle = AggregatorV3Interface(0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e);
    }

    // The requestPrice function returns latest price and can be called by anyone to request the current price of the asset
    function requestPrice() external view returns (int256) {
     (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = oracle.latestRoundData();
        return price;
    }
}

