// 导入 sha256 加密模块
import sha256 from 'crypto-js/sha256.js'

// 定义 Block 类
class Block {
  // 构造函数，用于创建新的区块
  constructor(blockchain, data, index, previousHash) {
    this.index = index // 区块的位置
    this.previousHash = previousHash // 前一个区块的哈希值
    this.timestamp = new Date().getTime() // 区块的创建时间戳
    this.data = data // 区块存储的数据
    this.hash = this.calculateHash() // 当前区块的哈希值
    this.nonce = 0 // 用于 proof of work，当前区块的 nonce 值
    this.blockchain = blockchain // 区块所在的区块链
  }
  verifyDifficulty() {
    const leadingZeros = '0'.repeat(this.difficulty)
    return this.hash.startsWith(leadingZeros)
  }

  // 计算当前区块的哈希值
  calculateHash() {
    return sha256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce,
    ).toString()
  }

  // proof of work 验证，即尝试寻找合适的 nonce 值计算哈希值
  mineBlock() {
    while(!this.verifyDifficulty()) {
      this.nonce++
      this.hash = this.calculateHash()
    }
  }
}

export default Block