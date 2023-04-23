import dotenv from "dotenv"
import {ethers} from 'hardhat'

dotenv.config();

const TOKEN_IPFS_CIDS = {
    1: 'Qmf6bbg4Xx4gQ16ktAQP245N2ddUQvh92yYBw4nMNi1Pvu',
}
const TOKEN_URI = `https://gateway.pinata.cloud/ipfs/Qmf6bbg4Xx4gQ16ktAQP245N2ddUQvh92yYBw4nMNi1Pvu${TOKEN_IPFS_CIDS[1]}`
// This is the contract that we have deployed earlier 
const CONTRACT_ADDRESS = '0x925b3d616db40b94609e95028bcdb843c43c4c24'

// Get Alchemy App URL
const API_KEY = process.env.API_KEY;

// Define an Alchemy Provider
const provider = new ethers.providers.AlchemyProvider('goerli', API_KEY)

// Get contract ABI file
const contract = require("../artifacts/contracts/hbxNFT.sol/hbx_NFT.json");

// Create a signer
const privateKey = process.env.PRIVATE_KEY
// @ts-ignore
const signer = new ethers.Wallet(privateKey, provider)

// Get contract ABI and address
const abi = contract.abi

// Create a contract instance
const myNftContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer)

// Call mintNFT function
const mintNFT = async () => {
    let nftTxn = await myNftContract.mintNFT(signer.address, TOKEN_URI)
    await nftTxn.wait()
    console.log(`NFT Minted! Check it out at: https://goerli.etherscan.io/tx/${nftTxn.hash}`)
}

mintNFT()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});
