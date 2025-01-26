const CryptoJS = require("crypto-js");

const hash = (value) => CryptoJS.SHA256(value).toString();

function getMerkleRoot(addresses) {
    if (addresses.length === 0) return null;

    let level = addresses.map(hash);

    while (level.length > 1) {
        let nextLevel = [];
        for (let i = 0; i < level.length; i += 2) {
            if (i + 1 < level.length) {
                nextLevel.push(hash(level[i] + level[i + 1]));
            } else {
                nextLevel.push(hash(level[i] + level[i]));
            }
        }
        level = nextLevel;
    }

    return level[0];
}

function verifyAddress(address, proof, root) {
    let currentHash = hash(address);

    for (let i = 0; i < proof.length; i++) {
        currentHash = hash(proof[i] + currentHash);
    }

    return currentHash == root;
}

const addresses = [
    "0x9700f414bdcB4Dd211716D424D61490b42eD0883",
    // "0xabcdefabcdefabcdefabcdefabcdefabcdefabc",
    // "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef",
    // "0xbeefbeefbeefbeefbeefbeefbeefbeefbeefbeef",
    // "0xcafebabecafebabecafebabecafebabecafebabe"
];

const merkleRoot = getMerkleRoot(addresses);
console.log("Merkle Root:", merkleRoot);

const proof = [
    hash("0x9700f414bdcB4Dd211716D424D61490b42eD0883")
];

const isValid = verifyAddress("0x9700f414bdcB4Dd211716D424D61490b42eD0883", proof, merkleRoot);
console.log("Address Verification:", isValid);
