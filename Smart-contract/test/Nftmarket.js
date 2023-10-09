const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("NFTMarketplace", function () {
  let nftMarketplace;
  let listingPrice;

  before(async function () {
    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
    nftMarketplace = await NFTMarketplace.deploy();
    //await nftMarketplace.deployed();

    listingPrice = await nftMarketplace.getListingPrice();
    listingPrice = listingPrice.toString();
  });

  it("Should create and execute market sales", async function () {
    /* deploy the marketplace */
    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace")
    const nftMarketplace = await NFTMarketplace.deploy()
    //await nftMarketplace.deployed()

    let listingPrice = await nftMarketplace.getListingPrice()
    listingPrice = listingPrice.toString()

    const auctionPrice = ethers.parseEther('0.01', 'ether')

    /* create two tokens */
    await nftMarketplace.createToken("https://www.mytokenlocation.com", auctionPrice, { value: listingPrice })
    await nftMarketplace.createToken("https://www.mytokenlocation2.com", auctionPrice, { value: listingPrice })

    const [_, buyerAddress] = await ethers.getSigners()

    /* execute sale of token to another user */
    await nftMarketplace.connect(buyerAddress).createMarketSale(1, { value: auctionPrice })

    /* resell a token */
    await nftMarketplace.connect(buyerAddress).resellToken(1, auctionPrice, { value: listingPrice })

    /* query for and return the unsold items */
    items = await nftMarketplace.fetchMarketItems()
    items = await Promise.all(items.map(async i => {
      const tokenUri = await nftMarketplace.tokenURI(i.tokenId)
      let item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
      return item
    }))
    console.log('items: ', items)
  });

  it("Should allow a user to fetch their purchased NFTs", async function () {
    const [_, buyerAddress] = await ethers.getSigners();

    // Mint a token and list it for sale
    const tokenURI = "https://www.mytokenlocation3.com";
    const auctionPrice = ethers.parseEther("0.02");

    // Create the token with the correct auctionPrice
    await nftMarketplace.createToken(tokenURI, auctionPrice, { value: listingPrice });

    // Purchase the token with the correct Ether value (matching the auctionPrice)
    await nftMarketplace.connect(buyerAddress).createMarketSale(1, { value: auctionPrice }); // Ensure you're using the correct token ID (1 in this case)

    // Fetch the purchased NFTs for the buyer
    const buyerNFTs = await nftMarketplace.connect(buyerAddress).fetchMyNFTs();

    // Ensure that the buyer has the purchased NFT
    expect(buyerNFTs.length).to.equal(1);
    expect(buyerNFTs[0].owner).to.equal(buyerAddress.address); // Compare addresses, not the entire object
  });

  it("Should estimate gas cost for creating a token and listing it", async function () {
    const gasCostEstimation = await nftMarketplace.estimateCreateTokenGasCost();
    expect(gasCostEstimation).to.be.gte(0); // Ensure it's a positive value
  });
});

