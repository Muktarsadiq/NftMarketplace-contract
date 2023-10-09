const { ethers } = require("hardhat");
const { network } = require("hardhat");

async function main() {
  try {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy the NFTMarketplace contract
    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    const nftMarketplace = await NFTMarketplace.deploy();

    // Wait for the deployment to be confirmed
    //await nftMarketplace.deployed();

    console.log("NFTMarketplace contract deployed to address:", nftMarketplace.address);

    // Now, you can log the contract address
    console.log("nftMarketplace deployed to:", nftMarketplace.address);
  } catch (error) {
    console.error("Error deploying contract:", error);
  }
}

// Run the deployment function
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
