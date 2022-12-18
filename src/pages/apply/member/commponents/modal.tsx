import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { Modal, message, Skeleton, Tabs } from 'antd'

import { ProFormText, ProForm, ProFormTextArea, ProFormUploadButton, ProFormSelect, ProFormGroup } from '@ant-design/pro-components';

import { apply } from '@/utils/rules';
import type { EditModalProps, TableListItem } from '../../data';


const options = ['男', '女']

const EditModal: React.FC<EditModalProps> = ({ row, isOpen, handleModal }) => {

    const { id, type } = history.location.query

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
                            <ProFormText name="name" label="队员姓名" placeholder="请输入队员姓名" tooltip='队员姓名是必填项' rules={apply.teamName} />
                            <ProFormSelect name="sex" label="性别" placeholder="请选择队员性别" tooltip='队员性别是必选项' options={options} rules={apply.sex} />
                            <ProFormText name="idNo" label="身份证号" placeholder="请输入队伍名称" tooltip='队伍名称是必填项' rules={apply.teamName} />

                            {
                                type === '1' ? <>
                                    <ProFormText name="colleageName" label="队员所属学校" placeholder="请输入队员所属学校" tooltip='队员所属学校是必填项' rules={apply.leader} />
                                    <ProFormText name="supervisorName" label="未成年监护人姓名" placeholder="请输入未成年监护人姓名" tooltip='未成年监护人姓名是必填项' rules={apply.leader} />
                                    <ProFormText name="supervisorIdNo" label="未成年监护人身份证号" placeholder="请输入未成年监护人身份证号" tooltip='未成年监护人姓名是必填项' rules={apply.leader} />
                                </> : null
                            }






                        </ProForm>
                }
            </Modal >

        </>
    );
};

export {
    EditModal
} 
