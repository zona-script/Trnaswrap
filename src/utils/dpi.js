// (function (){
//     // let head = document.getElementsByTagName("head");
//     // let meta = document.createElement("meta");
//     // let scale = window.screen.width /480;
//     // var str = `width=480, initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}, user-scalable=no,target-densitydpi=device-dpi,minimal-ui,uc-fitscreen=no`;
//     // var str1 = `width=device-width,initial-scale=1, user-scalable=no,target-densitydpi=device-dpi,minimal-ui,uc-fitscreen=no`;
//     // meta.name = 'viewport'
//     // meta.content = str1;
//     // head[0].appendChild(meta);
// })()

var documentElement = document.documentElement

function callback() {
  var clientWidth = documentElement.clientWidth
  // 屏幕宽度大于780，不在放大
  clientWidth = clientWidth < 780 ? clientWidth : 780
  documentElement.style.fontSize = clientWidth / 10 + 'px'
}

document.addEventListener('DOMContentLoaded', callback)
window.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize', callback)
