import { expect } from "chai";

describe("hbxNFT", function () {
	let hbxNFT;
	let owner;

	beforeEach(async function () {
          const hbxMintFactory = await ethers.getContract("hbxNFT");
	  	  hbxNFT = await hbxMintFactory.deploy();

	      [owner] = await ethers.getSigners();
	});


	describe("mint", function () {
          it("should mint a new NFT", async function () {
           const tokenId = 1;
	       const tokenURI = "https://gateway.pinata.cloud/ipfs/Qmf6bbg4Xx4gQ16ktAQP245N2ddUQvh92yYBw4nMNi1Pvu" + TOKEN_IPFS_CIDS["1"];

	       await hbxNFT.conect(owner).setETHPriceThreshold(99999999999999999999999);

	       await expect(hbxNFT.connect(owner).mintNFT(tokenId, tokenURI)).to.be.revertedWith("ETH has not reached the threshold");

	      });

       	});

     });