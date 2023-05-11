// Blockchain
import Block from './Block.js';
class Blockchain {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含 
      - 名字
      - 创世区块
      - 存储区块的映射
  */
      constructor(name) {
        this.name = name;
        this.difficulty = 2;
        this.blocks = {};
        this.genesis = null;
      }
    
      addBlock(block) {
        block.previousHash = this.getPreviousBlockHash(block.height);
        block.mineBlock(this.difficulty);
        this.blocks[block.hash] = block;
      }
    
      createGenesisBlock() {
        this.genesis = new Block(this, null, 0, 'genesis');
        this.blocks[this.genesis.hash] = this.genesis;
      }
    
      getPreviousBlockHash(height) {
        if (height === 0) {
          return null;
        }
        const block = this.blocks[Object.keys(this.blocks)[Object.keys(this.blocks).length - 1]];
        if (block.height < height - 1) {
          return null;
        }
        if (block.height === height - 1) {
          return block.hash;
        }
        while (block.height > height - 1) {
          block = this.blocks[block.previousHash];
        }
        return block.hash;
      }
  // 2. 定义 longestChain 函数
  /* 
    返回当前链中最长的区块信息列表
  */
    longestChain() {
      let longestChain = [];
  for (let blockHash in this.blocks) {
    let currentBlock = this.blocks[blockHash];
    let chain = [];
    while (currentBlock !== this.genesis) {
      chain.push(currentBlock);
      currentBlock = this.blocks[currentBlock.previousHash];
      if (!currentBlock) {
        // 如果当前区块无法追溯到创世区块，则退出循环
        break;
      }
    }
    chain.push(this.genesis);
    if (chain.length > longestChain.length) {
      longestChain = chain;
    }
  }
  return longestChain;
}
}
export default Blockchain
