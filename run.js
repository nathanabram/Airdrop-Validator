const { exportCSVtoMerkle } = require("./buildMerkleTreeFromCSV");
const { MerkleTree } = require("./merkleTree.js");
const fs = require("fs");

let csv = fs.readFileSync("./data.csv");
let tree = exportCSVtoMerkle();
