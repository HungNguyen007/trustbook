/**
 * Created by hung on 03/11/2017.
 */

const bcLib = require('./index.js')
const bitcoin = bcLib.bitcoin
const crypto = bcLib.crypto

exports.hdWalletGen = function(bip32SourceKey) {
    var response = new Object();  
    var error = false;

    /*Evaluating the bip32_source_key input */
    //To do
    // if (bitcoin.HDNode.fromBase58(bip32_source_key))error = true;

    error = true;

    if (error != false)
    {
        response.bip32SourceKey = bip32SourceKey
        var master = bitcoin.HDNode.fromBase58(bip32SourceKey);
        response.version = '0x0' + master.getNetwork().bip32.private.toString(16)
        response.depth = master.depth.toString(10)
        response.fingerPrint = master.parentFingerprint.toString(16)
        response.childIndex = master.index
        response.chainCode = master.chainCode.toString('hex')
        response.bip32KeyInfoKey = master.keyPair.toWIF()
        return JSON.stringify(response);
    }

}

exports.derivedHDWalletGen = function(bip32SourceKey, bip32_custom_path) {
    var response = new Object();  
    var error = false;

    /*Evaluating the bip32_source_key input */
    //To do
    error = true;

    if (error != false)
    {
        response.bip32SourceKey = bip32SourceKey
        response.bip32_custom_path = bip32_custom_path
        var master = bitcoin.HDNode.fromBase58(bip32SourceKey);
        var child = master.derivePath(bip32_custom_path);

        response.derived_private_key = child.toBase58()
        response.derived_wif = child.keyPair.toWIF()
        response.derived_public_key = child.neutered().toBase58()
        response.derived_public_key_hex = child.keyPair.getPublicKeyBuffer().toString('hex')
        response.addr = child.getAddress()
        return JSON.stringify(response);
    }
}

exports.hdKeyGenFromPass = function(bip32_source_passphrase) {
    var response = new Object();  
    var error = false;

    /*Evaluating the bip32_source_key input */
    //To do
    error = true;

    if (error != false)
    {
        response.bip32_source_passphrase = bip32_source_passphrase
        var seedHex = "0000000000000000000000000000000000000000000000000000000000000000";
        for(var i = 0; i < 50000; i++) {
            seedHex = crypto.createHmac('sha256',bip32_source_passphrase).update(seedHex).digest().toString('hex')
        }    
        var master = bitcoin.HDNode.fromSeedHex(seedHex)

        response.bip32SourceKey = master.toBase58()
        response.version = '0x0' + master.getNetwork().bip32.private.toString(16)
        response.depth = master.depth.toString(10)
        response.fingerPrint = master.parentFingerprint.toString(16)
        response.childIndex = master.index
        response.chainCode = master.chainCode.toString('hex')
        response.bip32KeyInfoKey = master.keyPair.toWIF()

        return JSON.stringify(response);
    }
}
