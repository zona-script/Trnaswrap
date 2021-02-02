/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    redirect: 'invite',
    meta: {
      title: 'Invite',
      keepAlive: false
    }
  },
  { path: '/home', name: 'home', component: () => import('@/views/home/home') },
  { path: '/invite', name: 'invite', component: () => import('@/views/invite/invite') },
  { path: '/pool', name: 'pool', component: () => import('@/views/pool/pool') },
  { path: '/createApair', name: 'createApair', component: () => import('@/views/createApair/createApair')},
  { path: '/exchange', name: 'exchange', component: () => import('@/views/exchange/exchange') },
  { path: '/addLiquidity', name: 'addLiquidity', component: () => import('@/views/addLiquidity/addLiquidity') },
  { path: '/convert', name: 'convert', component: () => import('@/views/convert/convert') },
  { path: '/vote', name: 'vote', component: () => import('@/views/vote/vote') },
  { path: '/farm', name: 'farm', component: () => import('@/views/farm/farm') },
]
