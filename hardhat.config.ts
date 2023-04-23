import dotenv from "dotenv"
import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers"
//import "@nomicfoundation/hardhat-toolbox";

dotenv.config()
const { API_URL, PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
    solidity: "0.8.17",
    defaultNetwork: "goerli",
    networks: {
        hardhat: {},
        goerli: {
            url: API_URL,
            accounts: [`0x${PRIVATE_KEY}`],
        },
    },
};

export default config;
