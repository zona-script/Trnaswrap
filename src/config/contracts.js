/**
 * 合约地址
 */
let ipConfig = {}
if (process.env.NODE_ENV !== 'development') {
  ipConfig = {
    TnsAddress:'TY4qtw3j3R7NqsysEx4ZhGS5oSVNgiMhYk',
    UsdtAddress:'TBen279FEKKSd6RF2jiLWQdqnCzyTCak9a',
    TusdtAddress: 'TLHLj2DM7rW6yy3ggE7D3C9F8DnbVp2cmz',
    BFactory: 'TWzmTZZ99JF65PUUxBT7CPdQd7EuN9uBXx',
    MasterChef: 'TUwJ4Kqdt62PZkU7fypMZwmD2kaWrpc1Zy',
    FactoryManager: 'TTRokbpzqKEpoMGdGeBPqceGzZGAuo85UF',
    RewardToken: 'TU2acWGkLSCCRtsKRxDoxiJaWHkqLCVKHp'
  }
} else {
  ipConfig = {
    TnsAddress:'TZ9T4v6gwcLb4tk1M9hdU6rdhYvnEriEbY',
    UsdtAddress:'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
    TusdtAddress: 'TNJ1LXrBKfN82fCRnptBjjwo5hXd5GB6eE',
    BFactory: 'TUiTwoVhn3YvesC1tFbAxxj6NvSmd7MXFR',
    MasterChef: 'TAAB8zcMWCCSfLpAZSox9rSN6nSzLcQXG5',
    FactoryManager: 'THBgKxkcTHvzao4b4Q7XyE6FfSwumMHzzG',
    RewardToken: 'TZAG1SE4B9LGLWmSeWFrZB3HSFz2jFCFny'
  }
}
export default ipConfig