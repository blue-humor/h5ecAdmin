import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { Modal, message, Skeleton, Tabs } from 'antd'

import { ProFormText, ProForm, ProFormTextArea, ProFormUploadButton, ProFormSelect, ProFormGroup } from '@ant-design/pro-components';

import { apply } from '@/utils/rules';
import { reqAdd, reqEdit } from '@/services/member';
// import type { EditModalProps } from '../../data';


const options = ['男', '女']

const EditModal: React.FC<any> = ({ row, isOpen, handleModal, actionRef, type, info }) => {

    const { activityId } = history.location.query as { activityId: string, }

    const [initialValues, setinitialValues] = useState<any>(null)

    const title = row?.id ? "修改" : "添加"


    const handleAdd = async (params: any) => {
        const res = await reqAdd({ ...params, type, parentId: info?.id, activityId })
        if (res?.code === 200) {
            message.success(res?.message)
            actionRef?.current.reload()
            handleModal(false)
        } else {
            message.success(res?.message)
        }
    }

    const handleEdit = async (params: any) => {
        const res = await reqEdit({ ...params, type, parentId: info?.id, id: row?.id, activityId })
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
            const { name, sex, idNo, supervisorName, supervisorIdNo, colleageName } = row
            setinitialValues({
                name,
                sex,
                idNo,
                supervisorName,
                supervisorIdNo,
                colleageName
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
                            onFinish={(values): Promise<any> => row?.id ? handleEdit(values) : handleAdd(values)}>
                            <ProFormText name="name" label="队员姓名" placeholder="请输入队员姓名" tooltip='队员姓名是必填项' rules={apply.name} />
                            <ProFormSelect name="sex" label="性别" placeholder="请选择队员性别" tooltip='队员性别是必选项' options={options} rules={apply.sex} />
                            <ProFormText name="idNo" label="身份证号" placeholder="请输入队伍名称" tooltip='队伍名称是必填项' rules={apply.idNo} />

                            {
                                type === '1' ? <>
                                    <ProFormText name="colleageName" label="队员所属学校" placeholder="请输入队员所属学校" tooltip='队员所属学校是必填项' rules={apply.colleageName} />
                                    <ProFormText name="supervisorName" label="未成年监护人姓名" placeholder="请输入未成年监护人姓名" tooltip='未成年监护人姓名是必填项' rules={apply.supervisorName} />
                                    <ProFormText name="supervisorIdNo" label="未成年监护人身份证号" placeholder="请输入未成年监护人身份证号" tooltip='未成年监护人姓名是必填项' rules={apply.supervisorIdNo} />
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
