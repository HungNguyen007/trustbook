
const lib = require('./index.js')

exports.BC_ConvertSecretPhr2Add = function(secretPhr) {
    var response = new Object();
    var error = false;

    response.secretPhr = secretPhr;
    /* Evaluating the Secret phrase input */
    //To do
    error = true;

    if (error != false)
    {    
        var hash256Bytes = lib.crypto.createHash('sha256').update(secretPhr).digest()
        response.prvKey = hash256Bytes.toString('hex').toUpperCase();
        var extKey = "80" + hash256Bytes.toString('hex').toUpperCase();
       
        var wif = lib.bs58check.encode(Buffer.from(extKey, 'hex'));        
        var keyPair = new lib.bitcoin.ECPair.fromWIF(wif, lib.bitcoin.networks.mainnet)
        var address = keyPair.getAddress()
        response.address = address

        return JSON.stringify(response);
    }

}