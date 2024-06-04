import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export function getRandomHex(len) {
    return crypto.randomBytes(Math.ceil(len / 2)).toString('hex').slice(0, len);
}