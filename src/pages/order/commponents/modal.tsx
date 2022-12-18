import React, { useState, useEffect } from 'react';

import { Modal, message, Skeleton, Segmented, Card, Image, Badge, Descriptions } from 'antd'

import { ProForm, } from '@ant-design/pro-components';

import type { EditModalProps } from '../data';

import { reqUpdateOrderStatus } from '@/services/order';

import styles from '../index.less';

const options = [
    {
        label: '待付款',
        value: '5',
    },
    {
        label: '待发货',
        value: '10',
    },
    {
        label: '待收货',
        value: '40',
    },
    {
        label: '已完成',
        value: '50',
    },
]

const EditModal: React.FC<EditModalProps> = ({ row, isOpen, handleModal, actionRef }) => {
    const [initialValues, setinitialValues] = useState<any>(null)

    const title = row?.id ? "修改" : "添加"


    const handleUpdateOrderStatus = async (params: any) => {
        const res = await reqUpdateOrderStatus({ ...params, id: row?.id })
        if (res?.code === 200) {
            message.success(res?.message)
            actionRef?.current.reload()
            handleModal(false)
        } else {
            message.error(res?.message)
        }
    }

    const handleOnFinish = async (values: any) => {
        handleUpdateOrderStatus(values)
    }

    useEffect(() => {
        if (row?.id) {
            const { orderStatus, orderNo } = row
            console.log(orderStatus);

            setinitialValues({
                orderStatus,
                orderNo
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
                            {/* <ProFormText name="orderNo" disabled label="订单号" initialValue="启途" /> */}
                            <ProForm.Item name="orderStatus" label="订单状态"  >
                                <Segmented options={options} />
                            </ProForm.Item>
                        </ProForm>
                }
            </Modal >

        </>
    );
};


const Detailmodal: React.FC<any> = ({ row, isDatailOpen, handleDetailModal }) => {
    const [initialValues, setinitialValues] = useState<any>(null)

    const title = '订单详情'

    useEffect(() => {
        if (row?.id) {
            const { orderStatusName, orderNo, createTime } = row
            console.log(row);

            setinitialValues({
                orderStatusName,
                createTime,
                orderNo
            })
        }
    }, [])

    return (
        <>
            <Modal width={700} title={title} visible={isDatailOpen} onCancel={() => handleDetailModal(false)} footer={null} destroyOnClose={true}>
                <Card className={`${styles.shaded} ${styles.orderCard}`}>
                    <Descriptions title={`订单号:${initialValues?.orderNo}`} layout="vertical" bordered>
                        <Descriptions.Item label="商品图" span={6}>
                            <Image placeholder width={'100%'} height={200} src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
                        </Descriptions.Item>
                        <Descriptions.Item label="商户名称" >2</Descriptions.Item>
                        <Descriptions.Item label="商品名称" span={3}>【真】白色短袖连衣裙荷叶边裙摆宽松韩版休闲纯白清爽优雅连衣裙</Descriptions.Item>


                        <Descriptions.Item label="订单数量">2</Descriptions.Item>
                        <Descriptions.Item label="下单时间" span={6}>{initialValues?.createTime}</Descriptions.Item>
                        <Descriptions.Item label="订单状态" span={6}>
                            <Badge status="processing" text={initialValues?.orderStatusName} />
                        </Descriptions.Item>
                        <Descriptions.Item label="商品金额">$80.00</Descriptions.Item>
                        <Descriptions.Item label="运费">$20.00</Descriptions.Item>
                        <Descriptions.Item label="商品总额">$60.00</Descriptions.Item>
                        <Descriptions.Item label="收件人地址" span={5}>{initialValues?.createTime}</Descriptions.Item>
                        <Descriptions.Item label="用户备注">
                            Data disk type: MongoDB
                            <br />
                            Database version: 3.4
                            <br />
                        </Descriptions.Item>
                    </Descriptions>


                </Card>
            </Modal >

        </>
    );
};

export {
    EditModal,
    Detailmodal
} 
