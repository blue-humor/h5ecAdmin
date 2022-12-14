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
    component: './Welcome',
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
    component: './goods',
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
    component: './apply',
  },
  {
    path: '/refer',
    name: '咨询管理',
    icon: 'comment',
    component: './refer',
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
