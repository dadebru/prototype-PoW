const Block = require('./models/Block');
const db = require('./db');
const TARGET_DIFFICULTY = BigInt('0x00' + 'F'.repeat(62));

let mining = false;

function startMining() {
	mining = true;
	mine();
}

function stopMining() {
	mining = false;
}

function mine() {
	if (!mining) return;

	let block = new Block();
	while (BigInt('0x' + block.hash()) >= TARGET_DIFFICULTY) {
		block.nonce++;
	}

	db.blockchain.addBlock(block);

	console.log(
		`Mined block #${db.blockchain.blockHeight()} with a hash of 
        ${block.hash()} at nonce ${block.nonce}`
	);
	setTimeout(mine, 500);
}

module.exports = {
	startMining,
	stopMining,
};
