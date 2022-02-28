/** @format */

const main = async () => {
	const [owner, randomPerson] = await hre.ethers.getSigners();

	const domainContractFactory = await hre.ethers.getContractFactory('Domains');
	const domainContract = await domainContractFactory.deploy("bns");
	await domainContract.deployed();
	console.log('Contract deployed to:', domainContract.address);
	console.log('Contract deployed by:', owner.address);

	// let txn;
	// let balance;

	// // 	run a transaction
	// txn = await domainContract.register('chukky_beima', {
	// 	value: hre.ethers.utils.parseEther('1'),
	// });
	// await txn.wait();

	// txn = await domainContract.setRecord("chukky_beima", "the first beima name service contract")

	// const domainOwner = await domainContract.getAddress('chukky_beima');
	// console.log('owner of chukky domain:', domainOwner);

	// balance = await hre.ethers.provider.getBalance(domainContract.address);
	// console.log('Contract balance:', hre.ethers.utils.formatEther(balance));

	

	// Trying to set a record that doesn't belong to me!
	// txn = await domainContract.connect(randomPerson).setRecord('chukky', "trying to set a record not belonging to the address 'randomPerson'");
	// await txn.wait()
};

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

runMain();
