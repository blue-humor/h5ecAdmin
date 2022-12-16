import React, { useState, useEffect } from 'react';

import { Modal, message, Skeleton, Tabs } from 'antd'

import { ProFormText, ProForm, ProFormUploadButton } from '@ant-design/pro-components';

import { reqUploadFile } from '@/services/banner';

import { sortRules } from '@/utils/rules';
import type { EditModalProps } from '../data';

const EditModal: React.FC<EditModalProps> = ({ row, isOpen, handleModal, actionRef }) => {
    const [initialValues, setinitialValues] = useState<any>(null)

    const title = row?.id ? "修改" : "添加"

    const handleUpload = async (params: any) => {
        const res = await reqUploadFile(params)
        if (res?.code === 200) {
            message.success(res?.message)
            actionRef?.current.reload()
            handleModal(false)
        } else {
            message.success(res?.message)
        }
    }


    const handleOnFinish = async (values: any) => {
        handleUpload(values)
    }



    useEffect(() => {
        if (row) {
            const { fileName, fileUrl } = row
            console.log(row);

            setinitialValues({
                fileName,
                fileUrl: [{ ...fileUrl }]
            })
        }
    }, [])


    return (
        <>
            <Modal title={title} open={isOpen} onCancel={() => handleModal(false)} footer={null} destroyOnClose={true}>
                {
                    initialValues === null && row?.id ? <Skeleton active paragraph={{ rows: 6 }} /> :
                        <ProForm
                            initialValues={initialValues}
                            onFinish={(values): Promise<any> => row?.id ? handleOnFinish({ ...values, id: row?.id }) : handleOnFinish(values)}>
                            <ProFormText name="fileName" label="轮播名" placeholder="请输入轮播图名称" tooltip='轮播名是必须的' rules={sortRules.name} />
                            <ProFormUploadButton
                                name="fileUrl"
                                label="图片上传"
                                tooltip='图片格式为png'
                                max={1}
                                fieldProps={{
                                    name: 'file',
                                    listType: 'picture-card',
                                }}
                                action="/upload.do"
                                extra=""
                            />
                        </ProForm>
                }
            </Modal >

        </>
    );
};

export {
    EditModal
} 
