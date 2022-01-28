const { MerkleTree } = require("./merkleTree.js");
const fs = require("fs");
const { keccak256, bufferToHex } = require("ethereumjs-util");

// get leafs as an array
let addresses = [
	"0x05vLRJkqeFpN6mdZXX6s6vylj554HSdymHME4sNMI04ItHWNMA85lr1QeCjhSNXk",
	"0xQme29Is9rEmCACOKfpeSWDkNjDQKnPwL33jQIAgA91dKFantrD2PnFxjOwDIQZrk",
	"0x4ED9I35HK4r8iKKxNobkIkykFtzo8V0GYgz1OgbAWkG4Iw4BdpQXpPutk3Q4EBNI",
];

const generateTreeFromHexLeafs = (leafs) => {
	const bufferLeafs = leafs.map((leaf) => Buffer.from(leaf));
	tree = new MerkleTree(bufferLeafs);

	return tree;
};

const getProofFromHexLeaf = (tree, leaf) => {
	bufferLeaf = Buffer.from(leaf);
	return tree.getProof(bufferLeaf);
};

let tree = generateTreeFromHexLeafs(addresses);
let proof = getProofFromHexLeaf(
	tree,
	"0x4ED9I35HK4r8iKKxNobkIkykFtzo8V0GYgz1OgbAWkG4Iw4BdpQXpPutk3Q4EBNI"
);

console.log(proof);
