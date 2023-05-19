import Block from '../models/Block.js';
import Blockchain from '../models/Blockchain.js';
import sha256 from 'crypto-js/sha256.js'

const main = () => {

  // 初始化区块链
  var blockchain = new Blockchain('BitCoin')

  // 创建创世区块
  var genesisBlock = new Block(blockchain, 'root', 0, '0')

  // 设置创世区块
  blockchain.genesis = genesisBlock

  // 构建区块
  var newBlock = new Block(
    blockchain,
    'root', // 将前一个区块的哈希值作为新区块的数据
    1,
    genesisBlock.hash,
  )

  // 添加区块到区块链中
  blockchain.addBlock(newBlock)

  var nextBlock = new Block(
    blockchain,
    newBlock.hash, // 使用前一个区块的哈希值作为新区块的上一个哈希值
    2,
    sha256(new Date().getTime().toString()).toString(),
  )

  var nextCompetitionBlock = new Block(
    blockchain,
    newBlock.hash, // 使用前一个区块的哈希值作为新区块的上一个哈希值
    2,
    sha256((new Date().getTime() + 1).toString()).toString(),
  )

  // 添加两个高度为 2 的竞争区块到区块链中
  blockchain.addBlock(nextBlock)
  blockchain.addBlock(nextCompetitionBlock)

  let longestChain = blockchain.longestChain()

  console.assert(longestChain.length === 3, 'Block height should be 3');

  var thirdBlock = new Block(
    blockchain,
    nextCompetitionBlock.hash,
    3,
    sha256(new Date().getTime().toString()).toString(),
  )

  // 添加第三个区块到区块链中
  blockchain.addBlock(thirdBlock)

  longestChain = blockchain.longestChain()

  // 区块检查
  console.assert(longestChain[longestChain.length - 1].hash === thirdBlock.hash, `Block hash should be ${thirdBlock.hash}`);
  console.assert(
    longestChain[2].hash === thirdBlock.hash, // 修改断言，确保最长的链的第3个区块的哈希值为第3个新区块的哈希值
    `Block hash should be ${thirdBlock.hash}`,
  )
}
main()