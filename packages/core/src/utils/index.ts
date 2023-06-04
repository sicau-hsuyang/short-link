import * as sha256 from 'crypto-js/sha256';

export function createHashCode(content: string): string {
  return sha256(content).toString().substring(0, 8).toUpperCase();
}
