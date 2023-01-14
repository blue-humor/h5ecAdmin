import React, { useState, useEffect } from 'react';

import { Modal, message, Form, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons';



import Upload from '@/components/Upload';

import { ProFormText, ProForm, ProFormTextArea } from '@ant-design/pro-components';

import { reqAbout, reqAboutUpdate } from '@/services/vip';
import type { EditModalProps, TableListItem } from '../data';



const EditModal: React.FC<EditModalProps> = ({ type, isOpen, handleModal }) => {

    const title = type === 1 ? "关于我们" : "联系我们"


    const [form] = ProForm.useForm()
    const setFileImageKey = (fileKey: any) => form.setFieldsValue({ 'thumb': fileKey })

    const [fileUrl, setFileUrl] = useState<any>([]);

    const handleOnFinish = async (values: any) => {
        const res = await reqAboutUpdate({ ...values, id: 1 })
        if (res?.code === 200) {
            message.success(res?.message)
            handleModal(false)
        } else {
            message.error(res?.message)
        }
    }

    //
    const handleAbout = async () => {
        const res = await reqAbout({})
        if (res.code === 200) {
            const { concatperson, concattel, intro, thumb } = res?.data

            if (type === 1) {
                form.setFieldsValue({
                    concatperson,
                    concattel,
                    intro,
                })
                return
            } else {
                setFileUrl([{ url: thumb, uid: '1' }])
                form.setFieldsValue({
                    concatperson,
                    concattel,
                    intro,
                    thumb: [{ url: thumb }]
                })
                return
            }
        }
    }

    useEffect(() => {
        handleAbout()
    }, [type])


    return (
        <>
            <Modal title={title} visible={isOpen} onCancel={() => handleModal(false)} footer={null} destroyOnClose={true}>
                <ProForm
                    form={form}
                    onFinish={(values): Promise<any> => handleOnFinish(values)}>
                    <ProFormText name="concatperson" label="联系人" placeholder="请输入联系人" />
                    <ProFormText name="concattel" label="联系电话" placeholder="请输入联系电话" />
                    <ProFormTextArea name="intro" label="简介" placeholder="请输入简介" />
                    {
                        type === 2 ? <ProForm.Item label="图片上传" name="thumb">
                            <Upload name='file' accept='image/*' listType='picture-card' setKey={setFileImageKey} maxCount={1} fileList={fileUrl}>
                                <Button type='link' icon={<UploadOutlined />}>上传图片</Button>
                            </Upload>
                        </ProForm.Item> : null
                    }
                </ProForm>
            </Modal >
        </>
    );
};

export {
    EditModal
} 
