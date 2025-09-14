const crypto = require('crypto-js');

const SECRET_KEY = process.env.ENCRYPTION_SECRET_KEY;

// Function to encrypt data
const encryptData = (data) => {
  return crypto.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Function to decrypt data (for debugging or server-side usage)
const decryptData = (encryptedData) => {
  try {
    const bytes = crypto.AES.decrypt(encryptedData, SECRET_KEY);
    return JSON.parse(bytes.toString(crypto.enc.Utf8));
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
};

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log(hashedPassword)
};

module.exports = { encryptData, decryptData, hashPassword };
