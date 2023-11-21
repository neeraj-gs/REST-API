//use authentication helpers to add or remove salt , encrypt adn crete a random
import crypto from 'crypto';

const SECRET = 'ngs-rest-api';

export const authentication = (salt: string, password: string): string => {
  return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
}

export const random = () => crypto.randomBytes(128).toString('base64');