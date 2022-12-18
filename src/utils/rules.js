export const bannerRule = {
  name: [
    {
      required: true,
      message: '轮播图名称不能为空',
    },
  ],
};

export const common = {
  phone: [
    {
      required: true,
      message: '手机号不能为空',
    },
    {
      max: 11,
      message: '手机号码最长11位!',
    },
    {
      pattern: /^1[3|4|5|6|7|8|9]\d{9}$/,
      message: '请输入正确的手机号',
    },
  ],
};
export const apply = {
  groupName: [{ required: true, message: '请选择队伍' }],
  projectNames: [{ required: true, message: '请选择参赛项目' }],
  teamName: [{ required: true, message: '请输入队伍名称' }],
  leader: [{ required: true, message: '请输入负责人/领队姓名' }],
  sex: [{ required: true, message: '请选择性别' }],
  teamLogo: [{ required: true, message: '请上传队伍logo' }],
  name: [{ required: true, message: '请输入队员姓名' }],
  supervisorIdNo: [{ required: true, message: '请输入未成年人监护人身份证号' }],
  supervisorName: [{ required: true, message: '请输入未成年人监护人姓名' }],

  email: [
    {
      required: true,
      message: '请输入您的电子邮箱',
    },
    {
      pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
      message: '请输入正确的电子邮箱',
    },
  ],
  idNo: [
    {
      required: true,
      message: '请输入您的身份证号码',
    },
    {
      pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
      message: '请输入正确的身份证号码',
    },
  ],
  contactPhone: [
    {
      required: true,
      message: '请输入联系电话',
    },
    {
      max: 11,
      message: '手机号码最长11位!',
    },
    {
      pattern: /^1[3|4|5|6|7|8|9]\d{9}$/,
      message: '请输入正确的手机号',
    },
  ],

  //校内参赛队员
  schoolName: [{ required: true, message: '请输入学校名称' }],
};

export const details = {
  title: [
    {
      required: true,
      message: '文章标题不能为空',
    },
  ],
  editor: [
    {
      required: true,
      message: '文章详情不能为空',
    },
  ],
  classify: [
    {
      required: true,
      message: '文章分类不能为空',
    },
  ],
  cover: [
    {
      required: true,
      message: '请选择文章封面',
    },
  ],

  //   age: [{
  //     required: true,
  //     message: '年龄不能为空',
  //   },
  //   {
  //     pattern: new RegExp(/^[1-9]\d*$/, 'g'),
  //     message: '只能输入数字',
  //   },
  // ],
};

export const merchant = {
  title: [
    {
      required: true,
      message: '文章标题不能为空',
    },
  ],
};
export const sortRules = {
  name: [
    {
      required: true,
      message: '分类名称不能为空',
    },
  ],
};

export const referRule = {
  title: [
    {
      required: true,
      message: '文章标题不能为空',
    },
  ],
};
