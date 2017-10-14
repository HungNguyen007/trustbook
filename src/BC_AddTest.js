/**
 * Created by hung on 29/06/2017.
 */

const bitcoin = require('./index.js')

exports.BC_PrvKey2AddForm = function(privateKey) {
    var response = new Object();
    var pubKey, firstSHA256, RIPEMD160, netByte ,secondSHA256, thirdSHA256, CKHSUM, fullAddress, address;

    var prvKeyBytes = new Buffer(privateKey, 'hex')
    var ecparams = bitcoin.ecurve.getCurveByName('secp256k1');
    var curvePt = ecparams.G.multiply(bitcoin.BigInteger.fromBuffer(prvKeyBytes));
    var x = curvePt.affineX.toBuffer(32);
    var y = curvePt.affineY.toBuffer(32);
    
    var error = false;

    response.prvKey = privateKey;
    /*Evaluating the Private key input */
    //To do
    error = true;

    if (error != false)
    {
        pubKey = Buffer.concat([new Buffer([0x04]), x, y]);
        response.pubKey  = pubKey.toString('hex').toUpperCase();

        const firstSHA256Bytes = bitcoin.Buffer.from(pubKey, 'hex');
        firstSHA256 = bitcoin.createHash('sha256').update(firstSHA256Bytes).digest();
        response.firstSHA256  = firstSHA256.toString('hex').toUpperCase();

        const  RIPEMD160Bytes = bitcoin.Buffer.from(firstSHA256, 'hex');
        RIPEMD160 = bitcoin.createHash('rmd160').update(RIPEMD160Bytes).digest();
        response.RIPEMD160 = RIPEMD160.toString('hex').toUpperCase();

        netByte = '00' + RIPEMD160.toString('hex');
        response.netByte = netByte.toString('hex').toUpperCase();

        const secondSHA256Bytes = bitcoin.Buffer.from(netByte, 'hex')
        secondSHA256 = bitcoin.createHash('sha256').update(secondSHA256Bytes).digest();
        response.secondSHA256 = secondSHA256.toString('hex').toUpperCase();

        const thirdSHA256Bytes = bitcoin.Buffer.from(secondSHA256, 'hex')
        thirdSHA256 = bitcoin.createHash('sha256').update(thirdSHA256Bytes).digest();
        response.thirdSHA256 = thirdSHA256.toString('hex').toUpperCase();

        var checkSum = thirdSHA256.toString('hex').substring(0,8);
        response.CKHSUM = checkSum.toUpperCase();

        fullAddress = netByte + checkSum;
        response.fullAddress  = fullAddress.toUpperCase();

        const bytes = bitcoin.Buffer.from(fullAddress, 'hex');
        address = bitcoin.base58.encode(bytes);
        response.address  = address;

        return JSON.stringify(response);

    }

}

exports.BC_RandomAddForm = function() {
    var randomBytes = bitcoin.randomBytes(32);
    return exports.BC_PrvKey2AddForm(randomBytes.toString('hex').toUpperCase());

}

exports.BC_GenPubKey = function(prvKey) {

}

exports.BC_ConvertPrvKey2Add = function(privateKey) {
    return exports.BC_PrvKey2AddForm(privateKey.toString('hex').toUpperCase());

}