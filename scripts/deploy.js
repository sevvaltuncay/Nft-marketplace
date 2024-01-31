async function main() {
  const NFTMarketplace = await hre.ethers.deployContract("NFTMarketplace");

  await NFTMarketplace.waitForDeployment();

  console.log(`deployed to contract target ${NFTMarketplace.target}`);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
