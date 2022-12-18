import React, { useState, useEffect } from 'react';

import { Modal, message, Skeleton, Tabs } from 'antd'

import { ProFormText, ProForm, ProFormTextArea, ProFormUploadButton, ProFormSelect, ProFormGroup } from '@ant-design/pro-components';

import { apply } from '@/utils/rules';
import type { EditModalProps, TableListItem } from '../../data';


const options = ['男', '女']

const EditModal: React.FC<EditModalProps> = ({ row, isOpen, handleModal }) => {
    const [initialValues, setinitialValues] = useState<any>(null)

    const title = row?.id ? "修改" : "添加"


    const handleOnFinish = async (values: any) => {
        console.log(values);
    }

    useEffect(() => {
        if (row?.id) {
            const { name } = row
            setinitialValues({
                name,
            })
        }
    }, [])


    return (
        <>
            <Modal width={800} title={title} visible={isOpen} onCancel={() => handleModal(false)} footer={null} destroyOnClose={true}>
                {
                    initialValues === null && row?.id ? <Skeleton active paragraph={{ rows: 6 }} /> :
                        <ProForm
                            initialValues={initialValues}
                            onFinish={(values): Promise<any> => handleOnFinish(values)}>
                            <ProFormGroup>
                                <ProFormText width="sm" name=" " label="选择队伍" placeholder="请输入队伍名称" tooltip='队伍名称是必填项' rules={apply.teamName} />
                                <ProFormText width="sm" name=" " label="参赛动作" placeholder="请输入领队姓名" tooltip='领队姓名是必填项' rules={apply.leader} />
                                <ProFormSelect width="sm" options={options} name="sex" label="参赛项目" placeholder="请输入队伍名称" tooltip='队伍名称是必填项' rules={apply.sex} />
                            </ProFormGroup>
                            <ProFormGroup>
                                <ProFormText width="sm" name=" " label="队伍名称" placeholder="请输入队伍名称" tooltip='队伍名称是必填项' rules={apply.teamName} />
                                <ProFormText width="sm" name=" " label="领队姓名" placeholder="请输入领队姓名" tooltip='领队姓名是必填项' rules={apply.leader} />
                                <ProFormSelect width="sm" options={options} name="sex" label="性别" placeholder="请输入队伍名称" tooltip='队伍名称是必填项' rules={apply.name} />
                            </ProFormGroup>


                            <ProFormTextArea name="remark" label="备注" placeholder="请输入密码" tooltip='密码是必须的' />
                            <ProFormUploadButton
                                label="Logo"
                                name="fileImage"
                                max={1}
                                fieldProps={{
                                    name: 'file',
                                    listType: 'picture-card',
                                }}
                                title="上传logo"
                            // action={BASE_URL + '/v1/uploadFile'}
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
