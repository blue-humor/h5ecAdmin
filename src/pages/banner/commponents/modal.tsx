import React, { useState, useEffect } from 'react';

import { Modal, message, Skeleton, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons';

import { ProFormText, ProForm } from '@ant-design/pro-components';


import Upload from '@/components/Upload';

import { reqUploadFile } from '@/services/banner';

import { bannerRule } from '@/utils/rules';
import type { EditModalProps } from '../data';



const EditModal: React.FC<EditModalProps> = ({ row, isOpen, handleModal, actionRef }) => {

    const title = row?.id ? "修改" : "添加"
    const [formObj] = ProForm.useForm()
    const setFileImageKey = (fileKey: any) => formObj.setFieldsValue({ 'fileUrl': fileKey })

    const [initialValues, setinitialValues] = useState<any>(null)

    const [fileUrl, setFileUrl] = useState<any>([]);


    const handleAddBanner = async (params: any) => {
        console.log(params);

        const res = await reqUploadFile(params)
        if (res?.code === 200) {
            message.success(res?.message)
            actionRef?.current.reload()
            handleModal(false)
        } else {
            message.success(res?.message)
        }
    }

    const handleEditBanner = async (params: any) => {

        const res = await reqUploadFile({ ...params, id: row?.id })
        if (res?.code === 200) {
            message.success(res?.message)
            actionRef?.current.reload()
            handleModal(false)
        } else {
            message.success(res?.message)
        }
    }





    useEffect(() => {
        if (row?.id) {
            const { fileName, fileUrl } = row
            fileUrl ? setFileUrl([{ url: fileUrl }]) : null
            setinitialValues({
                fileName,
                // 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                fileUrl
            })
        }
    }, [])


    return (
        <>
            <Modal title={title} open={isOpen} onCancel={() => handleModal(false)} footer={null} destroyOnClose={true}>
                {
                    initialValues === null && row?.id ? <Skeleton active paragraph={{ rows: 6 }} /> :
                        <ProForm
                            form={formObj}
                            initialValues={initialValues}
                            onFinish={(values): Promise<any> => row?.id ? handleEditBanner(values) : handleAddBanner(values)}>
                            <ProFormText name="fileName" label="轮播图名" placeholder="请输入轮播图名称" tooltip='轮播名是必须的' rules={bannerRule.name} />
                            <ProForm.Item label="图片上传" name="fileUrl">
                                <Upload name='file' accept='image/*' listType='picture-card' setKey={setFileImageKey} maxCount={1} fileList={fileUrl}>
                                    <Button type='link' icon={<UploadOutlined />}>上传图片</Button>
                                </Upload>
                            </ProForm.Item>
                        </ProForm>
                }
            </Modal >

        </>
    );
};

export {
    EditModal
} 
