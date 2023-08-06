import CryptoJS from "crypto-js";
export const encryptData = (data, secretKey) => {
  if (typeof data === "number") {
    data = data.toString();
  }

  const ciphertext = CryptoJS.AES.encrypt(data, secretKey).toString();
  console.log(ciphertext);
  return ciphertext;
};

export const decryptData = (encryptedText, secretKey) => {
  if (encryptedText === null) {
    return null;
  }

  try {
    var bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);

    console.log(originalText); // 'my message'
    return originalText;
  } catch (error) {
    console.error("Decryption error:", error);
  }
};

export const SECRET_KEY = "secret key 123";
