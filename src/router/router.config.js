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
  { path: '/home', name: 'home', component: () => import('@/views/home') },
  { path: '/invite', name: 'invite', component: () => import('@/views/invite') },
  { path: '/pool', name: 'pool', component: () => import('@/views/pool') },
  { path: '/createApair', name: 'createApair', component: () => import('@/views/createApair')},
  { path: '/exchange', name: 'exchange', component: () => import('@/views/exchange') },
  { path: '/doubleAssets', name: 'doubleAssets', component: () => import('@/views/doubleAssets') }
]
