import React, { useState, useEffect } from 'react';

import { Modal, message, Skeleton, Segmented, Card, Image, Badge, Descriptions, Drawer } from 'antd'

import { ProForm } from '@ant-design/pro-components';
import ProSkeleton from '@ant-design/pro-skeleton';

import { handleStatus, priceFormat } from '@/utils/index';
import IconFont from '@/utils/iconFont';



import { reqUpdateOrderStatus, reqOrderDetails } from '@/services/order';
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
    const handleOrderDetails = async () => {
        const res = await reqOrderDetails({ id: row?.id })
        if (res?.code === 200) {
            const { orderNo, goodsName, goodsPictureUrl, itemPaymentAmount, goodsPaymentPrice, buyQuantity, PaymentAmount, actualPrice } = res?.data?.orderitemList[0]
            const { createTime, orderStatus, orderStatusName, remark } = res?.data?.order
            const { address } = res?.data


            setinitialValues({
                address,
                actualPrice,
                PaymentAmount,
                goodsPaymentPrice,
                goodsName,
                goodsPictureUrl,
                itemPaymentAmount,
                orderStatusName,
                orderStatus,
                createTime,
                orderNo,
                buyQuantity
            })

        }

    }
    useEffect(() => {
        if (row?.id) {
            handleOrderDetails()

            // setinitialValues({
            //     orderStatusName,
            //     orderStatus,
            //     createTime,
            //     orderNo
            // })
        }
    }, [])

    return (
        <>
            <Drawer width={760} open={isDatailOpen} onClose={() => handleDetailModal(false)}>
                {
                    initialValues === null && row?.id ? <ProSkeleton type="descriptions" /> : <Card className={`${styles.shaded} ${styles.orderCard}`}>
                        <Descriptions title={`订单号:${initialValues?.orderNo}`} layout="vertical" bordered>
                            <Descriptions.Item label="商品图" span={3}>
                                <Image placeholder width={'300px'} src={initialValues?.goodsPictureUrl} />
                            </Descriptions.Item>
                            {/* <Descriptions.Item label="商户名称" >{ }</Descriptions.Item> */}
                            <Descriptions.Item label="商品名称" span={3}>{initialValues?.goodsName}</Descriptions.Item>


                            <Descriptions.Item label="商品数量">{initialValues?.buyQuantity}</Descriptions.Item>
                            <Descriptions.Item label="下单时间" span={6}>{initialValues?.createTime}</Descriptions.Item>
                            <Descriptions.Item label="订单状态" span={6}>
                                <Badge status={handleStatus(initialValues?.orderStatus)} text={initialValues?.orderStatusName} />
                            </Descriptions.Item>
                            <Descriptions.Item label="商品金额">￥{priceFormat(initialValues?.actualPrice, 2)}</Descriptions.Item>
                            <Descriptions.Item label="运费">{'0'}</Descriptions.Item>
                            <Descriptions.Item label="商品总额">￥{priceFormat(initialValues?.itemPaymentAmount, 2)}</Descriptions.Item>
                            <Descriptions.Item label="收件人地址" span={5}>
                                姓名：{initialValues?.address?.name}
                                <br />
                                手机号：{initialValues?.address?.phone}
                                <br />
                                收货地址：
                                {`${initialValues?.address?.provinceName} 
                                 ${initialValues?.address?.cityName}
                                ${initialValues?.address?.detailAddress}`
                                }
                            </Descriptions.Item>
                            <Descriptions.Item label="用户备注">
                                {initialValues?.remark}
                            </Descriptions.Item>
                        </Descriptions>


                    </Card>

                }

            </Drawer>

        </>
    );
};

export {
    EditModal,
    Detailmodal
} 
