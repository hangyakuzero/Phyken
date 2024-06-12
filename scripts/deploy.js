const { ethers } = require("hardhat");

async function main() {
    const deployerAddress = "0x08D96abe39fdED9c487280887f722F9C0bC54262";
    console.log("Deploying contracts with the account:", deployerAddress);

    const PhykenNFT = await ethers.getContractFactory("PhykenNFT");
    const phykenNFT = await PhykenNFT.deploy(deployerAddress); // Pass deployer's address as initialOwner

    console.log("PhykenNFT deployed to:", phykenNFT.address);
    return phykenNFT; // Return the deployed contract instance
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
