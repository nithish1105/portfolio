import fs from 'fs';
import crypto from 'crypto';
import path from 'path';

const password = 'MyCharacter12';
const salt = crypto.randomBytes(16); // Actually, we'll just use a deterministic or zero IV for simplicity since it's just a demo, but better to use PBKDF2 with a fixed salt so the client can recreate the exact key.
// Client will do:
// const key = await crypto.subtle.importKey("raw", await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password)), ... )

// Wait, the user specifically mentioned: "AES-CBC–decrypted at runtime from character.enc (password MyCharacter12, key from SHA-256)"

const key = crypto.createHash('sha256').update(password).digest(); // 32 bytes
const iv = Buffer.alloc(16, 0); // 16 bytes of zeros for IV for simplicity

const inputPath = path.resolve('public/character.glb');
const outputPath = path.resolve('public/character.enc');

const inputBuffer = fs.readFileSync(inputPath);
const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

const encryptedBuffer = Buffer.concat([cipher.update(inputBuffer), cipher.final()]);

fs.writeFileSync(outputPath, encryptedBuffer);
console.log(`Successfully encrypted ${inputPath} to ${outputPath}`);
