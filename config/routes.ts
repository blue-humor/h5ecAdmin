export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },

  {
    path: '/banner',
    name: 'Banner',
    icon: 'picture',
    component: './banner',
  },
  {
    path: '/sort',
    name: '分类管理',
    icon: 'Appstore',
    component: './sort',
  },
  {
    path: '/msc',
    name: '商户管理',
    icon: 'shop',
    component: './msc',
  },
  {
    path: '/goods',
    name: '商品管理',
    icon: 'shopping',
    routes: [
      { path: '/goods/home', name: '商品列表', component: './goods/home' },
      {
        path: '/goods/home/details',
        name: '商品详情',
        component: './goods/details',
        hideInMenu: true,
      },

      { path: '/goods', redirect: '/goods/home' },
      { component: './404' },
    ],
  },
  {
    path: '/order',
    name: '订单管理',
    icon: 'orderedList',
    component: './order',
  },
  {
    path: '/apply',
    name: '报名管理',
    icon: 'Audit',
    routes: [
      { path: '/apply/leader', name: '领队列表', component: './apply/leader' },
      { path: '/apply/member', name: '队员列表', component: './apply/member', hideInMenu: true },
      { path: '/apply', redirect: '/apply/leader' },
      { component: './404' },
    ],
  },
  {
    path: '/information',
    name: '资讯管理',
    icon: 'comment',
    component: './information',
  },
  {
    path: '/vip',
    name: '会员管理',
    icon: 'user',
    component: './vip',
  },

  {
    path: '/',
    redirect: '/banner',
  },
  {
    component: './404',
  },
];
