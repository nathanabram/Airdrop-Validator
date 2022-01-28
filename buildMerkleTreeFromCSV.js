const fs = require("fs");
const MerkleTree = require("./merkleTree.js");

const exportCSVtoMerkle = (pathToCSV, headers, columnToUseAsLeafs) => {
	const csv = fs.readFileSync(pathToCSV);

	//First, Load the CSV in and get an array of all the secrets.

	// Convert the data to String and
	// split it in an array
	var array = csv.toString().split("\n");
	let result = [];

	// convert CSV to array
	let finalArr = [];
	for (let i = 0; i < array.length; i++) {
		let obj = {};

		// Create an empty object to later add
		// values of the current row to it
		// Declare string str as current array
		// value to change the delimiter and
		// store the generated string in a new
		// string s
		let str = array[i];
		let s = "";

		// By Default, we get the comma separated
		// values of a cell in quotes " " so we
		// use flag to keep track of quotes and
		// split the string accordingly
		// If we encounter opening quote (")
		// then we keep commas as it is otherwise
		// we replace them with pipe |
		// We keep adding the characters we
		// traverse to a String s
		let flag = 0;
		for (let ch of str) {
			if (ch === '"' && flag === 0) {
				flag = 1;
			} else if (ch === '"' && flag == 1) flag = 0;
			if (ch === "," && flag === 0) ch = "|";
			if (ch !== '"') s += ch;
		}

		// Split the string using pipe delimiter |
		// and store the values in a properties array
		let properties = s.split("|");

		for (let j in headers) {
			obj[headers[j]] = properties[j];
			// Add the generated object to our
			// result array
			result.push(obj);
		}
		finalArr.push(obj);
	}

	// Convert the resultant array to json and
	// generate the JSON output file.
	//let json = JSON.stringify(result);
	//fs.writeFileSync('output.json', json);

	let leaves = [];

	for (let i = 0; i < finalArr.length; i++) {
		if (!finalArr[i][columnToUseAsLeafs].includes(" ")) {
			leaves.push(finalArr[i][columnToUseAsLeafs]);
		}
	}

	// Take each wallet and turn it into a buffer
	const bufferLeaves = leaves.map((leaf) => Buffer.from(leaf));

	// Create a MerkleTree object initialized with the wallets as it's leaves
	const loadedMerkleTree = new MerkleTree.MerkleTree(bufferLeaves);
	const root = loadedMerkleTree.getRoot();

	// Create a JSON file to store the loadedMerkleTree
	let loadedMerkleTreejson = JSON.stringify(loadedMerkleTree);
	fs.writeFileSync("loadedMerkleTree.json", loadedMerkleTreejson);

	return [loadedMerkleTree, root];
};

// Export the loadedMerkleTree
module.exports = { exportCSVtoMerkle };
