const CryptoJS = require("crypto-js");

const encryptData = (payload, encrytionKey) => {
  return CryptoJS.AES.encrypt(JSON.stringify(payload), encrytionKey).toString();
};
const decryptData = (id, encrytionKey) => {
  let bytes = CryptoJS.AES.decrypt(id, encrytionKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

module.exports = { encryptData, decryptData };
