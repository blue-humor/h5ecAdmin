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
    path: '/welcome',
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
    path: '/welcome',
    name: '商户管理',
    icon: 'shop',
    component: './Welcome',
  },
  {
    path: '/welcome',
    name: '商品管理',
    icon: 'shopping',
    component: './Welcome',
  },
  {
    path: '/welcome',
    name: '订单管理',
    icon: 'orderedList',
    component: './Welcome',
  },
  {
    path: '/welcome',
    name: '报名管理',
    icon: 'Audit',
    component: './Welcome',
  },
  {
    path: '/welcome',
    name: '咨询管理',
    icon: 'comment',
    component: './Welcome',
  },
  {
    path: '/welcome',
    name: '会员管理',
    icon: 'user',
    component: './Welcome',
  },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },

  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
