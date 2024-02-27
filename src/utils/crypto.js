var CryptoJS = require("crypto-js");

// Encrypt
var encrypt = (plainText) => {
    return CryptoJS.AES.encrypt(plainText.toString(), 'moewaikyawSecretKey_@1234').toString()
};

// Decrypt
var decrypt = (ciphertext) => {
    const decryptString = CryptoJS.AES.decrypt(ciphertext, 'moewaikyawSecretKey_@1234');
    return decryptString.toString(CryptoJS.enc.Utf8);
}

module.exports = {
    encrypt,
    decrypt
}
