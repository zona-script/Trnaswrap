/**
 * 合约地址
 */
let ipConfig = {}
if (process.env.NODE_ENV === 'development') {
  ipConfig = {
    DAI:'0x58750d1b4d16c818ef016385fb6f2a583b791306',
    OPC:"0x8d31dd67773aa8b006f994bdf0c09e62051631c6",
    OPS:"0x678e65764d2a7e9ed742d931f109f640b9c5c350",
    OPB:"0x51daadd8d591d2b7ab36a77fc4ab300f20741133",
    DAIOPCLPPool:"0x67395b5ee88133201fa0c74892960e2d29a4a669",
    DAIOPSLPPool:"0xe1b47f9fe6098f8eb0e2379a75b69fc59f1c4b04",
    Treasury:"0x4e824ace362a95bfbeca3199c952aa13cb3a6442",
    Boardroom:"0xA78B6BD268a8E4435A873567711BDd739253c9C9",
    Timelock:"0xe20eb7ed987210b0d76fa0dbc751b70af699e184"
  }
} else {
  ipConfig = {
    DAI:'0x58750d1b4d16c818ef016385fb6f2a583b791306',
    OPC:"0x8d31dd67773aa8b006f994bdf0c09e62051631c6",
    OPS:"0x678e65764d2a7e9ed742d931f109f640b9c5c350",
    OPB:"0x51daadd8d591d2b7ab36a77fc4ab300f20741133",
    DAIOPCLPPool:"0x67395b5ee88133201fa0c74892960e2d29a4a669",
    DAIOPSLPPool:"0xe1b47f9fe6098f8eb0e2379a75b69fc59f1c4b04",
    Treasury:"0x4e824ace362a95bfbeca3199c952aa13cb3a6442",
    Boardroom:"0xA78B6BD268a8E4435A873567711BDd739253c9C9",
    Timelock:"0xe20eb7ed987210b0d76fa0dbc751b70af699e184"
  }
}
export default ipConfig