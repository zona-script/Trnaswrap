/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  // {
  //   path: '/',
  //   redirect: 'invite',
  //   meta: {
  //     title: 'Invite',
  //     keepAlive: false
  //   }
  // },
  { path: '/', name: 'home', component: () => import('@/views/home') },
  { path: '/invite', name: 'invite', component: () => import('@/views/invite') }
]
