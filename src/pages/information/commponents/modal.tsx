import React, { useState, useEffect } from 'react';

import { Modal, Button, Skeleton, Image, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons';

import { ProFormText, ProForm, ProFormTextArea, ProFormUploadButton } from '@ant-design/pro-components';

import Upload from '@/components/Upload';

import { information } from '@/utils/rules';
import type { EditModalProps, TableListItem } from '../data';

import { reqAddArticle, reqUpdateArticle } from '@/services/information';

const EditModal: React.FC<EditModalProps> = ({ row, isOpen, activeKey, handleModal, actionRef }) => {
    const title = row?.id ? "修改" : "添加"
    const [formObj] = ProForm.useForm()
    const setFileVideoKey = (fileKey: any) => formObj.setFieldsValue({ 'video': fileKey })
    const setFileImageKey = (fileKey: any) => formObj.setFieldsValue({ 'thumb': fileKey })


    const [initialValues, setinitialValues] = useState<any>(null)
    //上传图片
    const [fileThumb, setFileThumb] = useState<any>([])
    //上传视频
    const [fileVideo, setFileVideo] = useState<any>([])


    const handleAdd = async (params: any) => {
        const res = await reqAddArticle({ type: activeKey, ...params })
        if (res.code == 200) {
            message.success(res?.message)
            actionRef?.current.reload()
            handleModal(false)
        } else {
            message.error(res?.message)
        }
    }
    const handleEditor = async (params: any) => {
        const res = await reqUpdateArticle({ type: activeKey, ...params, id: row?.id })
        if (res.code == 200) {
            message.success(res?.message)
            actionRef?.current.reload()
            handleModal(false)
        } else {
            message.error(res?.message)
        }
    }


    useEffect(() => {
        if (row?.id) {
            const { title, content, thumb, video, comments } = row

            setFileThumb(thumb)
            setFileVideo(video)

            setinitialValues({
                title,
                content,
                thumb,
                comments,
                video
            })
        }
    }, [])


    return (
        <>
            <Modal width={700} title={title} open={isOpen} onCancel={() => handleModal(false)} footer={null} destroyOnClose={true}>
                {
                    initialValues === null && row?.id ? <Skeleton active paragraph={{ rows: 6 }} /> :
                        <ProForm
                            form={formObj}
                            initialValues={initialValues}
                            onFinish={(values): Promise<any> => row?.id ? handleEditor(values) : handleAdd(values)}>
                            <ProFormText name="title" label="文章标题" placeholder="请输入文章标题" tooltip='文章标题是必填项' rules={information.title} />
                            <ProFormTextArea name="content" label="文章详情" placeholder="请输入文章详情" tooltip='文章详情' />
                            <ProForm.Item label="视频上传" name="video">
                                <Upload name='file' accept='video/*' listType='text' setKey={setFileVideoKey} maxCount={1} fileList={fileVideo}>
                                    <Button icon={<UploadOutlined />}>上传视频</Button>
                                </Upload>
                            </ProForm.Item>
                            <ProForm.Item label="图片上传" name="thumb">
                                <Upload name='file' accept='image/*' listType='picture-card' setKey={setFileImageKey} maxCount={1} fileList={fileThumb}>
                                    <Button type='link' icon={<UploadOutlined />}>上传图片</Button>
                                </Upload>
                            </ProForm.Item>
                            <ProFormTextArea name="comments" label="备注" placeholder="请输入备注" tooltip='备注' />
                        </ProForm>
                }
            </Modal >

        </>
    );
};

export {
    EditModal
} 
