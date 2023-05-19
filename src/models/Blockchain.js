import _ from 'lodash'
import Block from './Block.js'

class Blockchain {
  // 构造函数，用于创建新的区块链
  constructor(name) {
    this.chain = [] // 区块链
    this.difficulty = 2 // proof of work 难度
    this.pendingTransactions = [] //未处理的交易
    this.miningReward = 100 // 挖矿奖励
    this.name = name // 区块链名称
    this.genesis = null // 创世区块
    this.createGenesisBlock() // 创建创世区块
  }

  // 创建创世区块
  createGenesisBlock() {
    const genesisBlock = new Block(this, 'Genesis block', 0, '0')
    this.chain.push(genesisBlock)
    this.genesis = genesisBlock
  }

  // 获取最后一个区块
  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  // 添加区块到区块链中
  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash
    newBlock.mineBlock(this.difficulty) // 进行 proof of work
    this.chain.push(newBlock)
  this.height = this.getBlockHeight()
  }

  // 验证区块链的有效性
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i]
      const previousBlock = this.chain[i - 1]

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false
      }
    }
    return true
  }
  getBlockHeight() {
    return this.chain.length
  }

  // 挖矿，即在区块链上加入新的区块(目前只是示例，并不真的处理交易逻辑)
  minePendingTransactions(miningRewardAddress) {
    let block = new Block(
  this,
  this.pendingTransactions,
  Date.now(),
  this.getLatestBlock().hash,
)
block.mineBlock(this.difficulty)

console.log('Block successfully mined!')
this.chain.push(block)

this.pendingTransactions = [
  {
    amount: this.miningReward,
    address: miningRewardAddress,
  },
]
}

// 向 pendingTransactions 中添加新的交易
createTransaction(transaction) {
this.pendingTransactions.push(transaction)
}

// 获取钱包的余额
getBalanceOfAddress(address) {
let balance = 0

for (const block of this.chain) {
  for (const trans of block.transactions) {
    if (trans.fromAddress === address) {
      balance -= trans.amount
    }

    if (trans.toAddress === address) {
      balance += trans.amount
    }
  }
}

return balance
}

// 返回当前区块链中最长的链
longestChain() {
  let currentChain = _.cloneDeep(this.chain)
let longestChain = currentChain
for (let i = 0; i < currentChain.length; i++) {
const block = currentChain[i]
const previousBlock = currentChain[i-1]
let forkedChain = [block]
if (previousBlock && block.previousHash === previousBlock.hash) {
// 链路通畅，进行下一步
continue
}
// 链路断开，进入分岔处理
let forkIndex = -1
for (let j = i + 1; j < currentChain.length; j++) {
const anotherBlock = currentChain[j]
const anotherPreviousBlock = currentChain[j-1]
if (anotherBlock.previousHash === block.hash) {
// 找到分岔口位置
forkIndex = j-1
break;
}
}
if (forkIndex > 0) {
// 有分岔口，进行分岔处理
const forkedChain = currentChain.slice(i, forkIndex+1)
let forkedLatestBlock = forkedChain[forkedChain.length-1]
for (let k = forkIndex+1; k < currentChain.length; k++) {
const block = currentChain[k];
if (block.previousHash === forkedLatestBlock.hash) {
forkedChain.push(block)
forkedLatestBlock = block
}
}
if (forkedChain.length > longestChain.length) {
longestChain = forkedChain
}
}
}
return longestChain
}
}

export default Blockchain