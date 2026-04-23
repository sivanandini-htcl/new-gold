// utils/orderId.js

// HEX ID - your original: randomBytes(6).toString("hex") = 12 hex chars
export function generateHexId() {
  const arr = new Uint8Array(6);
  crypto.getRandomValues(arr);
  return Array.from(arr).map(b => b.toString(16).padStart(2, "0")).join("");
}

// Numeric-like ID - your original: randomBytes(8) → BigInt → slice(0,12)
export function generateUniqueId() {
  const arr = new Uint8Array(8);
  crypto.getRandomValues(arr);
  const hex = Array.from(arr).map(b => b.toString(16).padStart(2, "0")).join("");
  const id = BigInt("0x" + hex).toString();
  return id.slice(0, 12);
}