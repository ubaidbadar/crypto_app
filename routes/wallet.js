const Wallet = require('../models/Wallet');
const { createWallet } = require('../wallet');
const router = require('express').Router();
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/evm-utils");


router.post('/create', async (req, res) => {
    const wallet = await createWallet();
    console.log(wallet);
    const doc = await Wallet.create({ ...wallet, userId: "6368aa16b3d25bc5fdc6304e" });
    res.status(201).json(doc)
})

router.get('/balance/:address', async (req, res, next) => {
    try {
        await Moralis.start({ apiKey: process.env.MORALIS_API });
        const response = await Moralis.EvmApi.token.getWalletTokenBalances({
            address: req.params.address,
            chain: EvmChain.ETHEREUM,
        });
        console.log(response);
        res.status(200).json(response)
    }
    catch (err) {
        next(err)
    }
})


module.exports = router;