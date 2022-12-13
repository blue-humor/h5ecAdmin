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
