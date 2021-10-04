const CryptoJS = require("crypto-js");

export const encryptData = (payload, encrytionKey) => {
  CryptoJS.AES.encrypt(JSON.stringify(paylaod), encrytionKey).toString();
  return;
};
export const decryptData = (id, encrytionKey) => {
  let bytes = CryptoJS.AES.decrypt(id, encrytionKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
