
const initTronWeb = () => { // 初始化tronweb
  return new Promise(function(resolve, reject) {
    const tries = 0
    const loadFinish = function() {
      resolve(window.tronWeb)
    }
    const timer = setInterval(function() {
      if (window.tronWeb) {
        clearInterval(timer)
        if (!window.tronWeb.defaultAddress.base58) {
          window.tronWeb.on('addressChanged', function() {
            return loadFinish()
          })
        } else {
          return loadFinish()
        }
      }
      if (tries > 10) {
        clearInterval(timer)
        reject()
      }
    }, 100)
  })
}
const allowance = (coinAddress, contractAddress) => { // 查询授权
  return new Promise(function(resolve, reject) {
    try {
      window.tronWeb.contract().at(coinAddress).then((Contract) => {
        Contract['allowance'](window.tronWeb.defaultAddress.base58, contractAddress).call().then((res) => {
          resolve(res)
        })
      })
    } catch (error) {
      console.log(error)
      reject()
    }
  })
}
const bPoolAllowance = (coinAddress, contractAddress) => { // BPool查询授权
  return new Promise(function(resolve, reject) {
    try {
      var functionSelector = 'allowance(address,address)'
      var parameter = [
        { type: 'address', value: window.tronWeb.defaultAddress.base58 },
        { type: 'address', value: contractAddress }
      ]
      window.tronWeb.transactionBuilder.triggerConstantContract(coinAddress, functionSelector, {}, parameter).then((transaction) => {
        resolve(transaction)
      })
    } catch (error) {
      console.log(error)
      reject()
    }
  })
}
// const Web3Utils = require('web3');
// const MAX = Web3Utils.utils.toTwosComplement(-1);
const approved = (coinAddress, contractAddress) => { // 授权
  return new Promise(function(resolve, reject) {
    try {
      // console.log('MAX================'+MAX)
      window.tronWeb.contract().at(coinAddress).then((Contract) => {
        Contract['approve'](contractAddress, '100000000000000000000000000').send({ shouldPollResponse: true }).then((res) => {
          if (res) {
            resolve(res)
          }
        })
      })
    } catch (error) {
      reject(0)
      console.log(error)
    }
  })
}
const decimals = (address) => { // 查询精度
  return new Promise(function(resolve, reject) {
    try {
      window.tronWeb.contract().at(address).then((Contract) => {
        Contract['decimals']().call().then((res) => {
          if (res) {
            resolve(res)
          }
        })
      })
    } catch (error) {
      console.log(error)
    }
  })
}
const getConfirmedTransaction = (id) => { // 轮询获取交易信息
  return new Promise(function(resolve, reject) {
    try {
      var interval = window.setInterval(() => {
        window.tronWeb.trx.getTransactionInfo(id).then((res) => {
          if (res.contractResult) {
            clearInterval(interval)
            console.log(res)
            resolve(res)
          }
        })
      }, 2000)
    } catch (error) {
      console.log(error)
    }
  })
}

const getBalanceInPool = (pair, coin) => { // 获取单个币种在Pool中的余额
  return new Promise(function(resolve, reject) {
    var functionSelector = 'getBalance(address)'
    var parameter = [
      { type: 'address', value: coin.address }
    ]
    window.tronWeb.transactionBuilder.triggerConstantContract(pair.address, functionSelector, {}, parameter).then((transaction) => {
      const tokenBalanceInPool = parseInt(transaction.constant_result[0], 16) / Math.pow(10, coin.decimals)
      resolve(tokenBalanceInPool)
    })
  })
}
const getMyBalanceInPool = (pair) => { // 获取Pool中我的LPtoken余额
  return new Promise(function(resolve, reject) {
    var functionSelector = 'balanceOf(address)'
    var parameter = [
      { type: 'address', value: window.tronWeb.defaultAddress.base58 }
    ]
    window.tronWeb.transactionBuilder.triggerConstantContract(pair.address, functionSelector, {}, parameter).then((transaction) => {
      const myBalanceInPool = parseInt(transaction.constant_result[0], 16)
      resolve(myBalanceInPool)
    })
  })
}
const getLpBalanceInPool = (pair) => { // 获取LPtoken总额
  return new Promise(function(resolve, reject) {
    var functionSelector = 'totalSupply()'
    var parameter = []
    window.tronWeb.transactionBuilder.triggerConstantContract(pair.address, functionSelector, {}, parameter).then((transaction) => {
      const lpTotal = parseInt(transaction.constant_result[0], 16)
      resolve(lpTotal)
    })
  })
}
const getTokenDenormalizedWeight = (coinAddress, contractAddress) => { // 获取token在交易对中的权重
  return new Promise(function(resolve, reject) {
    var functionSelector = 'getDenorm(address)'
    var parameter = [
      { type: 'address', value: coinAddress }
    ]
    window.tronWeb.transactionBuilder.triggerConstantContract(contractAddress, functionSelector, {}, parameter).then((transaction) => {
      if (transaction) {
        const denormalizedWeight = transaction.constant_result[0]
        resolve(denormalizedWeight)
      }
    })
  })
}
export {
  approved,
  decimals,
  getConfirmedTransaction,
  allowance,
  getBalanceInPool,
  getMyBalanceInPool,
  getLpBalanceInPool,
  bPoolAllowance,
  getTokenDenormalizedWeight
}
export default initTronWeb
