import React, { useState, useEffect } from 'react';

import { Modal, message, Skeleton, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons';


import { ProFormText, ProForm, ProFormTextArea, ProFormSelect } from '@ant-design/pro-components';
import Upload from '@/components/Upload';
import { sortRules } from '@/utils/rules';

import { reqAdd, reqEdit } from '@/services/sort';

import type { EditModalProps, TableListItem } from '../data';

const EditModal: React.FC<EditModalProps> = ({ row, isOpen, handleModal, actionRef, type }) => {


    const [formObj] = ProForm.useForm()
    const setFileImageKey = (fileKey: any) => formObj.setFieldsValue({ 'thumbnail': fileKey })

    const [initialValues, setinitialValues] = useState<any>(null)

    const [thumbnail, setThumbnail] = useState<any>([])



    const title = row?.id ? "修改" : "添加"

    const handleAdd = async (params: any, groupId: any = null) => {
        const res = await reqAdd({ ...params, groupId })
        if (res.code === 200) {
            actionRef.current.reload();
            handleModal(false)
            message.success('添加成功')
        } else {
            message.error('添加失败')
        }
    }
    const handleUpdate = async (params: any) => {
        const res = await reqEdit({ ...params, id: row?.id })
        if (res.code === 200) {
            actionRef?.current.reload();
            handleModal(false)
            message.success('编辑成功')
        } else {
            message.error('编辑失败')
        }
    }


    useEffect(() => {
        if (row?.id && type === 'edit') {
            const { name, thumbnail } = row
            setThumbnail(thumbnail || [])
            setinitialValues({
                name,
            })
        } else {
            setinitialValues({})
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
                            onFinish={async (values: any): Promise<void> => {
                                if (row.id && type === 'add') {
                                    handleAdd(values, row?.id)
                                    return
                                } else if (row?.id && type === 'edit') {
                                    handleUpdate(values)
                                    return
                                } else {
                                    handleAdd(values)
                                }
                            }}>

                            <ProFormText name="name" label="分类名称" placeholder="请输入分类名称" tooltip='分类名称是必须得' rules={sortRules.name} />
                            {/* <ProFormTextArea name="remark" label="备注" placeholder="请输入备注" /> */}
                            <ProForm.Item label="分类封面上传" name="thumbnail">
                                <Upload name='file' accept='image/*' listType='picture-card' setKey={setFileImageKey} maxCount={1} fileList={thumbnail}>
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
