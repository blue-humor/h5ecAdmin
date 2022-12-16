import React, { useRef, useState } from 'react';

import { Button, Popconfirm, Typography } from 'antd';
import { PlusOutlined, FormOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { PageContainer, ProTable } from '@ant-design/pro-components';

import { EditModal } from './commponents/modal';

import type { TableListItem, TableListPagination } from './data';
import type { ProColumns, ActionType } from '@ant-design/pro-table';

interface IndexProps { }

const size: string | any = 'large';
const PopconfirmTitle = `确认删除吗？此操作不可撤销  `;


const data = [
    {
        id: '1',
        name: '父类',
        children: [
            {
                id: '2',
                name: '子类',
                children: [
                    {
                        name: '子子类'
                    }
                ]
            }
        ]
    }
]

const getData = () => {
    let data = []
    for (let i = 0; i < 100; i++) {
        data.push({ id: i, orderId: '10000012' + i, sum: 1000 + i, createDate: Date.now(), paynum: 8213802183 + 1, status: '-1' })
    }
    return data
}

const Index: React.FC<IndexProps> = (props) => {
    const actionRef = useRef<ActionType>();

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [row, setRow] = useState<TableListItem>()
    const handleModal = (show: boolean, row?: TableListItem) => {
        if (row?.id) {
            setRow(row)
        }
        setIsOpen(show)
    }

    const handleDelete = (id: number) => {

    }

    const handleTableList = async (params: TableListPagination) => {
        // const res = await reqTableList(params);
        // if (res.code === '200') {
        //     return {
        //         data: res.data.list,
        //         success: true,
        //         total: res.data.total,
        //     };
        // }
        const data = getData()
        return {
            data: data,
            success: true,
            total: data.length,
        };
    };

    /**
     * copyable 是否支持复制
     * ellipsis 是否自动缩略
     * tooltip 会在 title 之后展示一个 icon，hover 之后提示一些信息
     */


    const columns: ProColumns<TableListItem>[] = [
        {
            title: '序号',
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 80,
        },
        {
            title: '订单号',
            dataIndex: 'orderId',
            valueType: 'textarea',
            copyable: true,

        },
        {
            title: '状态',
            dataIndex: 'status',
            // valueType: 'textarea',
            valueEnum: {
                '-1': { text: '关闭', status: 'Default' },
                '2': { text: '运行中', status: 'Processing' },
                3: { text: '已上线', status: 'Success' },
                4: { text: '异常', status: 'Error' },
            },

        },
        {
            title: '金额',
            dataIndex: 'sum',
            // valueType: 'textarea',
            copyable: true,
            hideInSearch: true,
            render: (_, row) => {
                return <Typography.Text type="danger">
                    ${row?.sum}
                </Typography.Text>
            }
        },
        {
            title: '支付时间',
            dataIndex: 'createDate',
            hideInSearch: true,
        },
        {
            title: '支付单号',
            dataIndex: 'paynum',
            hideInSearch: true,
        },
        {
            width: 280,
            align: 'center',
            fixed: 'right',
            title: '操作',
            hideInSearch: true,
            render: (_, row) => [
                <Button type="link" key='edit' onClick={() => handleModal(true, row)} >
                    详情
                </Button>,
                <Popconfirm
                    key='popconfirm'
                    title={PopconfirmTitle}
                    placement="topRight"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => handleDelete(row?.id)}
                >
                    <Button type="link" key='delete' >
                        发货
                    </Button>
                </Popconfirm>,
            ],
        },


    ]


    return (
        <>
            <PageContainer>
                <ProTable<TableListItem, TableListPagination>
                    // scroll={{ x: 1300 }}
                    defaultSize={size}
                    columns={columns}
                    actionRef={actionRef}
                    request={(params): Promise<any> => handleTableList(params)}
                    rowKey="id"
                    pagination={{
                        pageSize: 10,
                    }}
                    dateFormatter="string"
                    toolBarRender={() => [
                        <Button
                            key="button"
                            type="primary"
                            icon={<PlusOutlined />}
                            // size={size}
                            onClick={() => handleModal(true)}
                        >
                            新建
                        </Button>]}
                />
            </PageContainer>
            {
                isOpen ? <EditModal isOpen={isOpen} handleModal={handleModal} row={row} /> : null
            }
        </>
    );
};

export default Index;
