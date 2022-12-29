export const handleStatus = (params: string | number): any => {
  switch (params) {
    case -1:
      return 'default';
    case 5:
      return 'default';
    case 10:
      return 'error';
    case 40:
      return 'processing';
    case 50:
      return 'success';
  }
};

//  * 格式化价格数额为字符串
//  * 可对小数部分进行填充，默认不填充
//  * @param price 价格数额，以分为单位!
//  * @param fill 是否填充小数部分 0-不填充 1-填充第一位小数 2-填充两位小数
//  */
export function priceFormat(price: any, fill = 0) {
  if (isNaN(price) || price === null || price === Infinity) {
    return price;
  }

  let priceFormatValue: any = Math.round(parseFloat(`${price}`) * 10 ** 8) / 10 ** 8; // 恢复精度丢失
  priceFormatValue = `${Math.ceil(priceFormatValue) / 100}`; // 向上取整，单位转换为元，转换为字符串
  if (fill > 0) {
    // 补充小数位数
    if (priceFormatValue.indexOf('.') === -1) {
      priceFormatValue = `${priceFormatValue}.`;
    }
    const n = fill - priceFormatValue.split('.')[1]?.length;
    for (let i = 0; i < n; i++) {
      priceFormatValue = `${priceFormatValue}0`;
    }
  }
  return priceFormatValue;
}
