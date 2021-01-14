const Decimal = require('decimal.js')

function calcRelativeDiff(expected, actual) {
  return ((Decimal(expected).minus(Decimal(actual))).div(expected)).abs()
}

// 计算A->B的价格（用于展示）
function calcSpotPrice(tokenBalanceIn, tokenWeightIn, tokenBalanceOut, tokenWeightOut, swapFee) {
  const numer = Decimal(tokenBalanceIn).div(Decimal(tokenWeightIn))
  const denom = Decimal(tokenBalanceOut).div(Decimal(tokenWeightOut))
  const ratio = numer.div(denom)
  const scale = Decimal(1).div(Decimal(1).sub(Decimal(swapFee)))
  const spotPrice = ratio.mul(scale)
  // console.log('numer----------'+numer)
  // console.log('denom----------'+denom)
  // console.log('ratio----------'+ratio)
  // console.log('scale----------'+scale)
  // console.log('spotPrice----------'+spotPrice)
  return spotPrice
}
// //计算A->B的价格(用于计算swap), 输入固定，计算输出
function calcOutGivenIn(tokenBalanceIn, tokenWeightIn, tokenBalanceOut, tokenWeightOut, tokenAmountIn, swapFee) {
  const weightRatio = Decimal(tokenWeightIn).div(Decimal(tokenWeightOut))
  const adjustedIn = Decimal(tokenAmountIn).times((Decimal(1).minus(Decimal(swapFee))))
  const y = Decimal(tokenBalanceIn).div(Decimal(tokenBalanceIn).plus(adjustedIn))
  const foo = y.pow(weightRatio)
  const bar = Decimal(1).minus(foo)
  const tokenAmountOut = Decimal(tokenBalanceOut).times(bar)
  return tokenAmountOut
}

function calcInGivenOut(tokenBalanceIn, tokenWeightIn, tokenBalanceOut, tokenWeightOut, tokenAmountOut, swapFee) {
  const weightRatio = Decimal(tokenWeightOut).div(Decimal(tokenWeightIn))
  const diff = Decimal(tokenBalanceOut).minus(tokenAmountOut)
  const y = Decimal(tokenBalanceOut).div(diff)
  const foo = y.pow(weightRatio).minus(Decimal(1))
  const tokenAmountIn = (Decimal(tokenBalanceIn).times(foo)).div(Decimal(1).minus(Decimal(swapFee)))
  return tokenAmountIn
}
function calcOutGivenInAfterPrice(tokenBalanceIn, tokenWeightIn, tokenBalanceOut, tokenWeightOut, tokenAmountIn, swapFee) {
  const weightRatio = Decimal(tokenWeightIn).div(Decimal(tokenWeightOut))
  const adjustedIn = Decimal(tokenAmountIn).times((Decimal(1).minus(Decimal(swapFee))))
  const y = Decimal(tokenBalanceIn).div(Decimal(tokenBalanceIn).plus(adjustedIn))
  const foo = y.pow(weightRatio)
  const bar = Decimal(1).minus(foo)
  const tokenAmountOut = Decimal(tokenBalanceOut).times(bar)
  const newTokenBalanceIn = Decimal(tokenBalanceIn).add(Decimal(tokenAmountIn))
  const newTokenBalanceOut = Decimal(tokenBalanceOut).sub(tokenAmountOut)
  return calcSpotPrice(newTokenBalanceIn, tokenWeightIn, newTokenBalanceOut, tokenWeightOut, swapFee)
}

// //单币种添加，用于计算输出的lp token是多少
function calcPoolOutGivenSingleIn(tokenBalanceIn, tokenWeightIn, poolSupply, totalWeight, tokenAmountIn, swapFee) {
  console.log('////////////////////////////////')

  const normalizedWeight = Decimal(tokenWeightIn).div(Decimal(totalWeight))
  const zaz = Decimal(1).sub(Decimal(normalizedWeight)).mul(Decimal(swapFee))
  const tokenAmountInAfterFee = Decimal(tokenAmountIn).mul(Decimal(1).sub(zaz))
  const newTokenBalanceIn = Decimal(tokenBalanceIn).add(tokenAmountInAfterFee)
  const tokenInRatio = newTokenBalanceIn.div(Decimal(tokenBalanceIn))
  const poolRatio = tokenInRatio.pow(normalizedWeight)
  const newPoolSupply = poolRatio.mul(Decimal(poolSupply))
  const poolAmountOut = newPoolSupply.sub(Decimal(poolSupply))
  console.log('poolAmountOut========' + poolAmountOut.toString())
  return poolAmountOut
}

// //单币种添加，用于计算得到的token是多少，输出的是lp token是
function calcSingleInGivenPoolOut(tokenBalanceIn, tokenWeightIn, poolSupply, totalWeight, poolAmountOut, swapFee) {
  const normalizedWeight = Decimal(tokenWeightIn).div(Decimal(totalWeight))
  const newPoolSupply = Decimal(poolSupply).plus(Decimal(poolAmountOut))
  const poolRatio = newPoolSupply.div(Decimal(poolSupply))
  const boo = Decimal(1).div(normalizedWeight)
  const tokenInRatio = poolRatio.pow(boo)
  const newTokenBalanceIn = tokenInRatio.mul(Decimal(tokenBalanceIn))
  const tokenAmountInAfterFee = newTokenBalanceIn.sub(Decimal(tokenBalanceIn))
  const zar = (Decimal(1).sub(normalizedWeight)).mul(Decimal(swapFee))
  const tokenAmountIn = tokenAmountInAfterFee.div(Decimal(1).sub(zar))
  return tokenAmountIn
}
function getTokenInGivenPoolOut(
  tokenBalanceIn,
  tokenInAmount,
  tokenBalanceOut,
  tokenOutAmount,
  poolSupply
) {
  console.log(tokenBalanceIn, tokenInAmount, tokenBalanceOut, tokenOutAmount, poolSupply)
  const perIn = Decimal(tokenInAmount).div(Decimal(tokenBalanceIn))
  const perOut = Decimal(tokenOutAmount).div(Decimal(tokenBalanceOut))
  if (perIn > perOut) {
    return perOut.mul(poolSupply)
  }
  return perIn.mul(poolSupply)
}

module.exports = {
  calcSpotPrice,
  calcOutGivenIn,
  calcInGivenOut,
  calcPoolOutGivenSingleIn,
  calcSingleInGivenPoolOut,
  calcRelativeDiff,
  calcOutGivenInAfterPrice,
  getTokenInGivenPoolOut
}
