# NFT smartcontract
Mints an nft to the user once a token reaches a certain threshold. 
First a user deposits nft(s) into the holding contract, then sets conditions for release 
i.e price of eth reaching a certain threshold. 
Once initiated the nft holding contract will interact with pricerequest contract and confirm the price of eth,
If it is above threshold set it sends the nft to the contract caller, else it sends a text response that the condition has not been met. 
Pricerequest contract will request price of eth from chainlink aggregator. 
Runs on goerli network.

P.S. To run this code using hardhat, provide /nft-smartcontract/.env
