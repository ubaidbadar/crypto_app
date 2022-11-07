const { PrivateKey } = require("bitcore-lib");
const { testnet } = require("bitcore-lib/lib/networks");
// const Mnemonic = require("bitcore-mnemonic");

const createWallet = (network = testnet) => {

  var privateKey = new PrivateKey();
  var address = privateKey.toAddress(network);
  return {
    privateKey: privateKey.toString(),
    publicKey: address.toString(),
    network: network.toString()
  };
};

module.exports = { createWallet };