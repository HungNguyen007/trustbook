/**
 * Created by hung on 29/06/2017.
 */

const bitcoin = require('./index.js')

exports.JS_ConvertPrvKey2WIF = function(privateKey) {
    var response = new Object();
    var extPrvKey;
    var firstSHA256;
    var secondSHA256;
    var extPrvKeyCS;
    var wif;
    var error = false;

    response.prvKey = privateKey;
    /*Evaluating the Private key input */
    //To do
    error = true;

    if (error != false)
    {
        extPrvKey = '80' + privateKey;
        response.extPrvKey  = extPrvKey;

        const firstSHA256Bytes = bitcoin.Buffer.from(extPrvKey, 'hex')
        firstSHA256 = bitcoin.createHash('sha256').update(firstSHA256Bytes).digest();
        response.firstSHA256  = firstSHA256.toString('hex').toUpperCase();

        const secondSHA256Bytes = bitcoin.Buffer.from(firstSHA256, 'hex')
        secondSHA256 = bitcoin.createHash('sha256').update(secondSHA256Bytes).digest();
        response.secondSHA256 = secondSHA256.toString('hex').toUpperCase();

        var checkSum = secondSHA256.toString('hex').substring(0,8);
        response.CKHSUM = checkSum.toUpperCase();

        extPrvKeyCS = extPrvKey + checkSum;
        response.extPrKeyCKHSUM  = extPrvKeyCS.toUpperCase();

        const bytes = bitcoin.Buffer.from(extPrvKeyCS, 'hex');
        const wif = bitcoin.base58.encode(bytes);
        response.wif  = wif;

        return JSON.stringify(response);

    }

}

exports.createRandomPrvKey = function() {
    var randomBytes = bitcoin.randomBytes(32);
    return exports.JS_ConvertPrvKey2WIF(randomBytes.toString('hex').toUpperCase());
}

exports.convertPrvKey2WIF = function(privateKey) {
    return exports.JS_ConvertPrvKey2WIF(privateKey.toString('hex').toUpperCase());
}