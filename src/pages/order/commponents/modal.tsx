import React, { useState, useEffect } from 'react';

import { Modal, message, Skeleton, Tabs } from 'antd'

import { ProFormText, ProForm, ProFormTextArea } from '@ant-design/pro-components';

import { sortRules } from '@/utils/rules';
import type { EditModalProps, TableListItem } from '../data';

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
            <Modal title={title} visible={isOpen} onCancel={() => handleModal(false)} footer={null} destroyOnClose={true}>
                {
                    initialValues === null && row?.id ? <Skeleton active paragraph={{ rows: 6 }} /> :
                        <ProForm
                            initialValues={initialValues}
                            onFinish={(values): Promise<any> => handleOnFinish(values)}>
                            <ProFormText name="name" label="分类名" placeholder="请输入管理人员的手机号" tooltip='正确的手机号格式' rules={sortRules.name} />
                            <ProFormTextArea name="remark" label="备注" placeholder="请输入密码" tooltip='密码是必须的' />
                        </ProForm>
                }
            </Modal >

        </>
    );
};

export {
    EditModal
} 
