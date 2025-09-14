const generateRandomPassword = () => {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const specialChars = "!@#%*+?";

  const getRandom = (chars) => chars[Math.floor(Math.random() * chars.length)];

  let password =
    getRandom(uppercase) +
    getRandom(lowercase) +
    getRandom(numbers) +
    getRandom(specialChars);

  const allChars = uppercase + lowercase + numbers + specialChars;
  for (let i = 0; i < 4; i++) {
    password += getRandom(allChars);
  }

  return password.split("").sort(() => Math.random() - 0.5).join(""); // Shuffle password
};

module.exports = { generateRandomPassword }