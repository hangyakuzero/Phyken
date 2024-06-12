require("@nomicfoundation/hardhat-toolbox");
const dotenv = require("dotenv");


dotenv.config();


module.exports = {
  solidity: "0.8.24",
 
  etherscan:{
    apiKey:{
    polygonAmoy: process.env.OKLINK_API_KEY,
  }},
  defaultNetwork: "polygon_amoy",
  networks: {
    hardhat: {
    },
    polygon_amoy: {
      url:"https://rpc-amoy.polygon.technology",  
      accounts: [process.env.REACT_APP_PRIVATE_KEY]
      },
    }
  
};
