import SecureStorage from 'secure-web-storage';
import CryptoJS from 'crypto-js';

const HASH_KEY = process.env.REACT_APP_KEY

export const secureStorage = new SecureStorage(localStorage, {
  hash: function hash(key) {
      key = CryptoJS.SHA256(key, HASH_KEY);
      return key.toString();
  },
  encrypt: function encrypt(data) {
      data = CryptoJS.AES.encrypt(data, HASH_KEY);
      data = data.toString();
      return data;
  },
  decrypt: function decrypt(data) {
      data = CryptoJS.AES.decrypt(data, HASH_KEY);
      data = data.toString(CryptoJS.enc.Utf8);
      return data;
  }
});