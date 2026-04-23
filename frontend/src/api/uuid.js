const crypto = require('crypto');

function generateUniqueId() {
  // Generate random bytes
  const buffer = crypto.randomBytes(8); // 8 bytes = 64 bits
  // Convert to a big integer string
  const id = BigInt('0x' + buffer.toString('hex')).toString();
  // Ensure it’s 12 digits long
  return id.slice(0, 12);
}

console.log(generateUniqueId());