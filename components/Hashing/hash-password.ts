// scripts/hash-password.ts
import bcrypt from 'bcryptjs';

const password = 'M0nde02376';
const saltRounds = 10;

bcrypt.hash(password, saltRounds).then((hash) => {
  console.log("Hashed password:", hash);
});
