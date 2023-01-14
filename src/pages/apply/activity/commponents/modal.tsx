import React, { useState, useEffect } from 'react';

import { Button, message, Modal, Skeleton } from 'antd'
import { UploadOutlined } from '@ant-design/icons';

import { ProFormText, ProForm, ProFormTextArea } from '@ant-design/pro-components';

import Upload from '@/components/Upload';

import { reqActivitEdit, reqActivityAdd } from '@/services/apply';

import { activity } from '@/utils/rules';


import type { EditModalProps } from '../../data';



const EditModal: React.FC<EditModalProps> = ({ row, isOpen, handleModal, actionRef }) => {

    const title = row?.id ? "修改" : "添加"

    const [initialValues, setinitialValues] = useState<any>(null)

    const [formObj] = ProForm.useForm()
    const setFileImageKey = (fileKey: any) => formObj.setFieldsValue({ 'thumbList': fileKey })



    //上传图片
    const [fileThumb, setFileThumb] = useState<any>([])




    const handleAdd = async (params: any) => {
        console.log(params);

        const res = await reqActivityAdd(params)
        if (res?.code === 200) {
            message.success(res?.message)
            actionRef?.current.reload()
            handleModal(false)
        } else {
            message.success(res?.message)
        }
    }

    const handleEdit = async (params: any) => {

        const res = await reqActivitEdit({ ...params, id: row?.id })
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
            const { title, intro, thumbList, } = row

            setFileThumb(thumbList)

            setinitialValues({
                title,
                intro,
                thumbList,
            })
        }
    }, [])

    return (
        <>
            <Modal width={800} title={title} open={isOpen} onCancel={() => handleModal(false)} footer={null} destroyOnClose={true}>
                {
                    initialValues === null && row?.id ? <Skeleton active paragraph={{ rows: 6 }} /> :
                        <ProForm
                            form={formObj}
                            initialValues={initialValues}
                            onFinish={(values): Promise<any> => row?.id ? handleEdit(values) : handleAdd(values)}>
                            <ProFormText name="title" label="活动标题" placeholder="活动标题" tooltip='活动标题是必填项' rules={activity.title} />
                            <ProFormTextArea name="intro" label="活动简介" placeholder="请输入活动简介" tooltip='活动简介' />

                            <ProForm.Item label="图片上传" name="thumbList" rules={activity.image} >
                                <Upload name='file' accept='image/*' listType='picture-card' setKey={setFileImageKey} maxCount={1} fileList={fileThumb}>
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
