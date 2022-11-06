const { PrivateKey } = require("bitcore-lib");
const { testnet } = require("bitcore-lib/lib/networks");
// const Mnemonic = require("bitcore-mnemonic");

const createWallet = (network = testnet) => {

  var privateKey = new PrivateKey();
  var address = privateKey.toAddress(network);
  console.log(privateKey);
  console.log(address);
  return {
    privateKey: privateKey.toString(),
    address: address.toString(),
    network: network.toString()
  };
};

module.exports = { createWallet };