/**
 * 合约地址
 */
let ipConfig = {}
if (process.env.NODE_ENV === 'development') {
  ipConfig = {
    wtrxAddress: 'TNaQCSF38fFbp9RNCTj95PzcmZzDTr4orW',
    BFactory: 'TJCqsG9xgaPK6ftVJg5EPNzTSvvb1TVdi2',
    MasterChef: 'TUwJ4Kqdt62PZkU7fypMZwmD2kaWrpc1Zy',
    FactoryManager: 'TTRokbpzqKEpoMGdGeBPqceGzZGAuo85UF',
    RewardToken: 'TU2acWGkLSCCRtsKRxDoxiJaWHkqLCVKHp'
  }
} else {
  ipConfig = {
    wtrxAddress: 'TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR',
    BFactory: 'TXU7bsdPKp8KdgPDTtf2VdAvZmGjFs5Wt8',
    MasterChef: 'TPfeyfwWHeVyFmDPbHSfKw7cbXXABL5vzP',
    FactoryManager: 'TF8f1TFd72WWysLchSHSR2L1DTc5gAXuXZ',
    RewardToken: 'TUMZX3VRgN651CY4f4CNsi5SvTkTSqVuu5'
  }
}
export default ipConfig