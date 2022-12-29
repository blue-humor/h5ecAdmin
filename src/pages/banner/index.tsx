import React, { useRef, useState } from 'react';

import { Button, Popconfirm, Image, message } from 'antd';
import { PlusOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';

import { PageContainer, ProTable } from '@ant-design/pro-components';

import { EditModal } from './commponents/modal';

import { reqTableList, reqDel } from '@/services/banner';

import type { TableListItem, TableListPagination } from './data';
import type { ProColumns, ActionType } from '@ant-design/pro-table';

interface IndexProps { }

const size: string | any = 'small';
const PopconfirmTitle = `确认删除吗？此操作不可撤销  `;



const Index: React.FC<IndexProps> = (props) => {
    const actionRef = useRef<any>()

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [row, setRow] = useState<any>()
    const handleModal = (show: boolean, row: any = null) => {
        setRow(row)
        setIsOpen(show)
    }


    const handleDelete = async (id: number) => {
        const res = await reqDel({ id })
        if (res?.code === 200) {
            message.success(res?.message)
            actionRef?.current.reload()
        }
    }

    const handleTableList = async (params: TableListPagination) => {
        const res = await reqTableList(params);
        if (res.code === 200) {
            return {
                data: res.data.list,
                success: true,
                total: res.data.total,
            };
        }


    };

    /**
     * copyable 是否支持复制
     * ellipsis 是否自动缩略
     * tooltip 会在 title 之后展示一个 icon，hover 之后提示一些信息
     */


    const columns: ProColumns<TableListItem>[] = [

        {
            align: 'center',
            width: 160,
            title: '轮播图片',
            dataIndex: 'fileUrl',
            hideInSearch: true,
            render: (_, row) => <Image width={80} src={row?.fileUrl[0]?.url} placeholder />
        },
        {
            title: '标题',
            dataIndex: 'fileName',
            copyable: true,
        },
        {
            width: 280,
            align: 'center',
            fixed: 'right',
            title: '操作',
            hideInSearch: true,
            render: (_, row) => [
                <Button key='edit' type="link" icon={<FormOutlined />} onClick={() => handleModal(true, row)} >
                    编辑
                </Button>,
                <Popconfirm
                    key='popconfirm'
                    title={PopconfirmTitle}
                    placement="topRight"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => handleDelete(row?.id)}
                >
                    <Button key='delete' type="link" icon={<DeleteOutlined />}>
                        删除
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
                    headerTitle='banner列表'
                    defaultSize={size}
                    columns={columns}
                    actionRef={actionRef}
                    request={(params): Promise<any> => handleTableList(params)}
                    rowKey="id"
                    pagination={{
                        defaultPageSize: 5,
                        showSizeChanger: true,
                    }}
                    dateFormatter="string"
                    toolBarRender={() => [
                        <Button
                            key="button"
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => handleModal(true)}
                        >
                            新建
                        </Button>]}
                />
            </PageContainer>
            {
                isOpen ? <EditModal isOpen={isOpen} handleModal={handleModal} row={row} actionRef={actionRef} /> : null
            }
        </>
    );
};

export default Index;
