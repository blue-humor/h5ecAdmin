import React, { useState, useEffect } from 'react';

import { Modal, message, Skeleton, Segmented, Card, Image, Badge, Descriptions, Drawer, Avatar, Row } from 'antd'

import { ProForm, FooterToolbar } from '@ant-design/pro-components';

import { handleStatus } from '@/utils/index';
import IconFont from '@/utils/iconFont';

import { reqUpdateOrderStatus } from '@/services/order';
import type { EditModalProps } from '../data';

import styles from '../index.less';

const options = [
    {
        label: (<div style={{ padding: '10px 20px' }}>
            <IconFont type='icon-daifukuan' style={{ fontSize: '40px' }} />
            <div>待付款</div>
        </div>
        ),
        value: '5',
    },
    {
        label: (<div style={{ padding: '10px 20px' }}>
            <IconFont type='icon-daifahuo' style={{ fontSize: '40px' }} />
            <div>待发货</div>
        </div>
        ),
        value: '10',
    },
    {
        label: (<div style={{ padding: '10px 20px' }}>
            <IconFont type='icon-daishouhuo' style={{ fontSize: '40px' }} />
            <div>待收货</div>
        </div>
        ),
        value: '40',
    },
    {
        label: (<div style={{ padding: '10px 20px' }}>
            <IconFont type='icon-yiwancheng' style={{ fontSize: '40px' }} />
            <div>已完成</div>
        </div>
        ),
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
            const { orderStatus, orderNo, } = row
            console.log(orderStatus * 1,);

            setinitialValues({
                orderStatus: orderStatus,
                orderNo
            })
        }
    }, [])

    return (
        <>
            <Modal title={title} open={isOpen} onCancel={() => handleModal(false)} footer={null} destroyOnClose={true}>
                {
                    initialValues === null && row?.id ? <Skeleton active paragraph={{ rows: 6 }} /> :
                        <ProForm
                            initialValues={initialValues}
                            onFinish={(values): Promise<any> => handleOnFinish(values)}>
                            {/* <ProFormText name="orderNo" disabled label="订单号" initialValue="启途" /> */}
                            <ProForm.Item name="orderStatus" label="订单状态" tooltip='点击修改订单状态' >
                                <Segmented options={options} onResize={undefined} onResizeCapture={undefined} />
                            </ProForm.Item>
                        </ProForm>
                }
            </Modal >

        </>
    );
};


const Detailmodal: React.FC<any> = ({ row, isDatailOpen, handleDetailModal }) => {
    const [initialValues, setinitialValues] = useState<any>(null)
    useEffect(() => {
        if (row?.id) {
            const { orderStatusName, orderStatus, orderNo, createTime } = row
            console.log(row);

            setinitialValues({
                orderStatusName,
                orderStatus,
                createTime,
                orderNo
            })
        }
    }, [])

    return (
        <>
            <Drawer width={800} open={isDatailOpen} onClose={() => handleDetailModal(false)}>
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
                            <Badge status={handleStatus(initialValues?.orderStatus)} text={initialValues?.orderStatusName} />
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
            </Drawer>

        </>
    );
};

export {
    EditModal,
    Detailmodal
} 
