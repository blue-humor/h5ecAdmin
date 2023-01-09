import React, { useRef, useState } from 'react';

import { Button, Popconfirm, Tag } from 'antd';
import { PlusOutlined, FormOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { PageContainer, ProTable } from '@ant-design/pro-components';

import { EditModal, Detailmodal } from './commponents/modal';
import IconFont from '@/utils/iconFont';
import { priceFormat } from '@/utils/index';


import type { TableListItem, TableListPagination } from './data';
import type { ProColumns, ActionType } from '@ant-design/pro-table';

import { reqTableList } from '@/services/order';
import commonStyles from '@/common/css/index.less';
import styles from './index.less';

interface IndexProps { }

const size: string | any = 'small';
const PopconfirmTitle = `确认删除吗？此操作不可撤销  `;




const Index: React.FC<IndexProps> = (props) => {
    const actionRef = useRef<ActionType>();

    //编辑
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [row, setRow] = useState<TableListItem>()
    const handleModal = (show: boolean, row: any = null) => {
        setRow(row)
        setIsOpen(show)
    }
    //详情
    const [isDatailOpen, setIsDatailOpen] = useState<boolean>(false)
    const handleDetailModal = (show: boolean, row: any = null) => {
        setRow(row)
        setIsDatailOpen(show)
    }

    const handleDelete = (id: number) => {

    }

    const handleTableList = async (params: TableListPagination) => {
        const res = await reqTableList(params);
        if (res.code === 200) {
            const { list, total } = res?.data
            return {
                data: list,
                success: true,
                total,
            };
        }
    };

    /**
     * copyable 是否支持复制
     * ellipsis 是否自动缩略
     * tooltip 会在 title 之后展示一个 icon，hover 之后提示一些信息
     */


    const columns: ProColumns<any>[] = [
        {
            title: '序号',
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 60,
        },
        {

            title: '订单号',
            dataIndex: 'orderNo',

            copyable: true,
        },
        {
            align: 'center',
            title: '状态',
            dataIndex: 'orderStatus',
            valueEnum: {
                '-1': { text: '全部', status: 'Default' },
                '5': { text: '待付款', status: 'Default' },
                '10': { text: '待发货', status: 'Error' },
                "40": { text: '待收货', status: 'Processing' },
                "50": { text: '已完成', status: 'Success' },
            },
        },
        {
            align: 'center',
            title: '商品总额',
            dataIndex: 'paymentAmount',
            //  ,
            copyable: true,
            hideInSearch: true,
            render: (_, row) => <Tag className={`${commonStyles.shaded} ${styles.tagColor}`}>
                ￥{priceFormat(row?.paymentAmount, 2)}
            </Tag>
        },
        {
            width: 200,
            align: 'center',
            title: '支付单号',
            hideInSearch: true,
        },
        {
            width: 200,
            align: 'center',
            title: '支付时间',
            dataIndex: 'createTime',
            hideInSearch: true,
        },

        {
            width: 280,
            align: 'center',
            fixed: 'right',
            title: '操作',
            hideInSearch: true,
            render: (_, row) => [
                <Button type="link" key='details' onClick={() => handleDetailModal(true, row)} icon={<IconFont type='icon-xiangqing2' />}>
                    详情
                </Button>,
                <Button type="link" key='delete' onClick={() => handleModal(true, row)} icon={<FormOutlined />}>
                    编辑
                </Button>
            ],
        },


    ]


    return (
        <>
            <PageContainer>
                <ProTable<TableListItem, TableListPagination>
                    // scroll={{ x: 1300 }}
                    search={false}
                    defaultSize={size}
                    columns={columns}
                    actionRef={actionRef}
                    request={(params): Promise<any> => handleTableList(params)}
                    rowKey="id"
                    pagination={{
                        defaultPageSize: 10,
                        showSizeChanger: true,
                    }}
                    dateFormatter="string"
                // toolBarRender={() => [
                //     <Button
                //         key="button"
                //         type="primary"
                //         icon={<PlusOutlined />}
                //         // size={size}
                //         onClick={() => handleModal(true)}
                //     >
                //         新建
                //     </Button>]}
                />
            </PageContainer>
            {
                isOpen ? <EditModal isOpen={isOpen} handleModal={handleModal} row={row} actionRef={actionRef} /> : null
            }
            {
                isDatailOpen ? <Detailmodal isDatailOpen={isDatailOpen} handleDetailModal={handleDetailModal} row={row} /> : null
            }
        </>
    );
};

export default Index;
