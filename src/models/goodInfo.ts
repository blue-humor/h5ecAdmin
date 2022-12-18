import { useState, useCallback } from 'react';

export default () => {
  const [goodsInfo, setGoodsInfo] = useState<any>({});

  const handleGoodsInfo = (params: any) => {
    setGoodsInfo(() => params);
  };

  return {
    goodsInfo,
    handleGoodsInfo,
  };
};
