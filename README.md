# trustbook

1. Installation
Following the guide at https://www.npmjs.com/package/bitcoinjs-lib

2. Integration test
$ npm run integration

3. Browserifying
browserify index.js --standalone foo > app.js

4. [Installing uglify-es to support ES6]
npm install uglify-es -g

4. [Uglifying]
uglifyjs app.js --output app.min.js --compress --mangle reserved=[Array,BigInteger,Boolean,ECPair,Function,Number,Point] 

uglifyjs BitCoin_PrvKey2WIF.js --output BitCoin_PrvKey2WIF.min.js --compress --mangle --reserved 'const,Array,BigInteger,Boolean,ECPair,Function,Number,Point'

5. [Obfuscator]
sudo npm install javascript-obfuscator -g

javascript-obfuscator BitCoin_PrvKey2WIF.min.js --output BitCoin_PrvKey2WIF-obfuscated.min.js --compact true --controlFlowFlattening false --selfDefending false --debugProtection false --debugProtection false --debugProtectionInterval false --disableConsoleOutput true --rotateStringArray true --stringArray true --stringArrayEncoding false --stringArrayThreshold 0.75 --unicodeEscapeSequence true

{
    compact: true,
    controlFlowFlattening: false,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: true,
    rotateStringArray: true,
    selfDefending: true,
    stringArray: true,
    stringArrayEncoding: false,
    stringArrayThreshold: 0.75,
    unicodeEscapeSequence: true
}

