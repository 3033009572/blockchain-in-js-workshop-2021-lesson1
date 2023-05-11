import sha256 from 'crypto-js/sha256.js';
class Block {
  // 完成构造函数及其参数
  constructor(chain, previousHash, height, data) {
    this.chain = chain;
    this.previousHash = previousHash;
    this.height = height;
    this.data = data;
    this.timestamp = Date.now();
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return sha256(this.previousHash + this.height + this.timestamp + this.data).toString();
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.timestamp = Date.now();
      this.hash = this.calculateHash();
    }
    console.log(`Block mined: ${this.hash}`);
  }

  isValid() {
    if (this.hash !== this.calculateHash()) {
      console.log('Block hash invalid.');
      return false;
    }
    if (this.previousHash !== this.chain.getPreviousBlockHash(this.height)) {
      console.log('Previous block hash invalid.');
      return false;
    }
    return true;
  }
}

  export default Block;
