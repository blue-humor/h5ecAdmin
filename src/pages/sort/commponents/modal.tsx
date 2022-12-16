import React, { useState, useEffect } from 'react';

import { Modal, message, Skeleton, Tabs } from 'antd'

import { ProFormText, ProForm, ProFormTextArea, ProFormSelect } from '@ant-design/pro-components';

import { sortRules } from '@/utils/rules';
import type { EditModalProps, TableListItem } from '../data';

const EditModal: React.FC<EditModalProps> = ({ row, isOpen, handleModal }) => {
    const [initialValues, setinitialValues] = useState<any>(null)

    const title = row?.id ? "修改" : "添加"


    const handleOnFinish = async (values: any) => {
        console.log(values);
    }

    useEffect(() => {
        if (row?.id && row?.children) {
            const { name, children } = row
            console.log(row);
            setinitialValues({
                name,
                childrenName: children[0]?.name
            })
        }
    }, [row])


    return (
        <>
            <Modal title={title} open={isOpen} onCancel={() => handleModal(false)} footer={null} destroyOnClose={true}>
                {
                    initialValues === null && row?.id ? <Skeleton active paragraph={{ rows: 6 }} /> :
                        <ProForm
                            initialValues={initialValues}
                            onFinish={(values): Promise<any> => handleOnFinish(values)}>
                            {
                                !row?.children ? <ProFormSelect name="name" label="父级分类" placeholder="请输入管理人员的手机号" tooltip='正确的手机号格式' rules={sortRules.name} options={[
                                    {
                                        value: 'chapter',
                                        label: '盖章后生效',
                                    },
                                ]} /> : null
                            }
                            <ProFormText name="name" label="分类名称" placeholder="请输入管理人员的手机号" tooltip='正确的手机号格式' rules={sortRules.name} />
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
