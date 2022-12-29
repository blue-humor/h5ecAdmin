import React from 'react';
import { message, Upload } from 'antd';
import type { UploadProps } from 'antd';
interface IndexProps {
  url?: string | undefined
  maxCount: number
  name: string
  accept: string
  listType: any
  fileList: any[]
  setKey: (params: any) => void
}

const Index: React.FC<IndexProps> = ({ name, accept, fileList, listType, children, setKey, maxCount }) => {
  const token = window.sessionStorage.getItem('token') as string

  const handleOnChange = ({ file, fileList }: { file: any, fileList: [] }) => {


    let arr: any = []

    if (file.status === 'done') {
      fileList.forEach((item: any) => {
        const { name, uid, status, response } = item
        arr.push({
          uid,      // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
          // name,   // 文件名
          // status, // 状态有：uploading done error removed，被 beforeUpload 拦截的文件没有 status 属性
          url: response?.data || item?.url,
        })
      });
      setKey(arr);
      return
    }




  };
  return (
    <>
      <Upload<UploadProps>
        maxCount={maxCount}
        name={name}
        headers={{ token }}
        accept={accept}
        defaultFileList={fileList}
        action={BASE_URL + '/v1/pc/upload'}
        listType={listType}
        onChange={(file: any) => handleOnChange(file)}
      >
        {children}
      </Upload>
    </>
  );
};


export default Index;
