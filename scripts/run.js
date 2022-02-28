/** @format */

const main = async () => {
	const [owner, randomPerson] = await hre.ethers.getSigners();

	const domainContractFactory = await hre.ethers.getContractFactory('Domains');
	const domainContract = await domainContractFactory.deploy('bns');
	await domainContract.deployed();
	console.log('Contract deployed to:', domainContract.address);
	console.log('Contract deployed by:', owner.address);

	let txn;
	let balance;

	// 	run a transaction
	txn = await domainContract.register('chukky', {
		value: hre.ethers.utils.parseEther('1'),
	});
	await txn.wait();

	const domainOwner = await domainContract.getAddress('chukky');
	console.log('owner of chukky domain:', domainOwner);

	balance = await hre.ethers.provider.getBalance(domainContract.address);
	console.log('Contract balance:', hre.ethers.utils.formatEther(balance));

	// Trying to set a record that doesn't belong to me!
	// txn = await domainContract.connect(randomPerson).setRecord('chukky', "trying to set a record not belonging to the address 'randomPerson'");
	// await txn.wait()

	// Trying to rob the contract!
	try {
		txn = await domainContract.connect(randomPerson).withdraw();
		await txn.wait();
		
	} catch (error) {
		console.log("Could not rob contract")
		
	}

	balance = await hre.ethers.provider.getBalance(domainContract.address);
	console.log('Contract balance before withdrawal:',hre.ethers.utils.formatEther(balance));

	let ownerBalance = await hre.ethers.provider.getBalance(owner.address)
	console.log('Balance of owner before withdrawal:',hre.ethers.utils.formatEther(ownerBalance),);

	txn = await domainContract.connect(owner).withdraw();
	await txn.wait()

	const contractBalance = await hre.ethers.provider.getBalance(domainContract.address);
	ownerBalance = await hre.ethers.provider.getBalance(owner.address);

	console.log('Contract balance after withdrawal:',hre.ethers.utils.formatEther(contractBalance),);
	console.log('Balance of owner after withdrawal:',hre.ethers.utils.formatEther(ownerBalance),);
	
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
