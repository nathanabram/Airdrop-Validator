const { exportCSVtoMerkle } = require("./buildMerkleTreeFromCSV");
const { MerkleTree } = require("./merkleTree.js");
const fs = require("fs");

let csv = fs.readFileSync("./data.csv");
console.log(csv);
let [tree, root] = exportCSVtoMerkle("./data.csv", ["Addresses"], "Addresses");

console.log(tree);
console.log(root);
