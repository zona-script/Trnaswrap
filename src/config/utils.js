/**
 * 存储sessionStorage
 */
export const setStore = (name, content) => {
  if (!name)
    return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content); //从一个对象解析出字符串
  }
  window
    .sessionStorage
    .setItem(name, content);
};

/**
 * 获取sessionStorage
 */
export const getStore = name => {
  if (!name)
    return;
  return window
    .sessionStorage
    .getItem(name);
};

/**
 * 删除sessionStorage
 */
export const removeStore = name => {
  if (!name)
    return;
  window
    .sessionStorage
    .removeItem(name);
};

/**
 * 判断值是否是空 是空返回true，不是空返回false；
 * @param data
 */
export const objIsNull = data => {
  var flag = true;
  if (data != null && data != undefined && data != "" && data != "null" && data != "nil" && data != "undefined") {
    flag = false;
  }
  return flag;
}

/**
 * 判断值是否是空 是空返回true，不是空返回false；
 * @param data
 */
export const createWallet = (userpassword) => {
  return new Promise((resolve, reject) => {
    var secretSeed = lightwallet.keystore.generateRandomSeed();//注记词
    var password = userpassword;//密码
    var global_keystore = null
    let privateKey = null
    let addresses = null
    lightwallet.keystore.createVault({
        password: password,
        seedPhrase: secretSeed,
        //random salt
        hdPathString: "m/44'/195'/0'/0/0"
      }, function (err, ks) {
        global_keystore = ks
        global_keystore.keyFromPassword(password, function(err, pwDerivedKey) {
          global_keystore.generateNewAddress(pwDerivedKey);
          addresses = global_keystore.getAddresses()[0];
          privateKey = global_keystore.exportPrivateKey(addresses,pwDerivedKey)
          let wallet = {
            privateKey:privateKey,
            address:addresses
          };
          let walletItem = {}
          walletItem.wallet = wallet;
          walletItem.isFirstIn = true;
          setStore('mnemonic', secretSeed);
          setStore('walletItem', walletItem);
          resolve(wallet);
        })
      })
  })
  // let words = bip39.generateMnemonic(
  //   128,
  //   null,
  //   bip39.wordlists.english
  // );
  // let seed = bip39.mnemonicToSeed(words);
  // let root = ethers.HDNode.fromSeed(seed);
  // var key1 = root.derivePath("m/44'/195'/0'/0/0");
  // let privateKey = key1.privateKey;
  // let wallet = new ethers.Wallet(privateKey);
  
  
}


/**
 * 交易eth以太坊币
 * 传入 私钥,服务器地址昵称,收款地址,金额
 * 回调返回交易哈希值
 */
export const transferEth = (privateKey, providerName, address, amount) => {
  console.log(privateKey, providerName, address, amount);
  let wallet = new ethers.Wallet(privateKey);
  wallet.provider = ethers.providers.getDefaultProvider(providerName);

  let transaction = {
    gasLimit: 1000000,
    to: address,
    data: "0x",
    value: ethers.utils.parseEther(amount)
  };

  let sendTransactionPromise = wallet.sendTransaction(transaction);

  return sendTransactionPromise;
};


/**
 * 判断方法
 * 判断是否有钱包账户
 * 有就返回 true 否就 false
 */
export const isOwnAccount = () => {
  let walletList = JSON.parse(getStore('walletList'));
  let flag = false;
  if (!objIsNull(walletList)) {
    if (walletList.length > 0) {
      flag = true;
    }
  }
  return flag;
};

/**
 * 时间戳转换
 * 传入时间戳
 * 返回 yyyy-mm-dd HH-mm-ss
 */
export const formartTimeStamp = (timestamp) => {
  let date = new Date(timestamp * 1000); //如果date为13位不需要乘1000
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return Y + M + D + h + m + s;
};

/**
 * 交易data计算金额
 * 传入data(input)串
 * 返回 交易金额
 */
export const formartTranstionData = (data, decimals) => {
  let type = data.substr(0, 10);
  let amount;
  let amountData = parseInt(data.substr(74), 16);
  if (type.toLowerCase().toString() !== '0xa9059cbb') {
    amount = 0;
  } else {
    amount = (amountData / Math.pow(10, decimals)).toFixed(3);
  }
  return amount;
};
