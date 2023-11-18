const { ethers } = require("hardhat");

async function main() {
  const HealthTrust = await ethers.deployContract("HealthTrust", []);
  await HealthTrust.waitForDeployment();
  console.log(`HealthTrust deployed at ${HealthTrust.target}`);
  // verify(HealthTrust.target, []);
}

const verify = async (contractAddress, args) => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
