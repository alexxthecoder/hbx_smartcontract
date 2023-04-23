import { ethers } from "hardhat";
import { PriceRequest } from "./pricerequest_contract";

async function main() {
  const priceRequestContract = await ethers.getContractFactory("PriceRequest");
  console.log("Deploying PriceRequest contract...");
  const priceRequest = await priceRequestContract.deploy();
  await priceRequest.deployed();
  console.log("PriceRequest contract deployed to address:", priceRequest.address);

  const hbxNFT = await ethers.getContractFactory("hbxNFT");
  console.log("Deploying hbxNFT contract...");

  const hbx_NFT = await hbxNFT.deploy(priceRequest.address);
  await hbx_NFT.deployed();
  console.log("hbxNFT contract deployed to address:", hbx_NFT.address);     

  console.log("Minting NFT...");
  const tokenId = 1;
  const tokenURI = "https://gateway.pinata.cloud/ipfs/Qmf6bbg4Xx4gQ16ktAQP245N2ddUQvh92yYBw4nMNi1Pvu";
  await hbx_NFT.mintNFT(tokenId, tokenURI);
  console.log("NFT minted successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


