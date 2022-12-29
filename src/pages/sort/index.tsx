import React, { useRef, useState } from 'react';

import { Button, Popconfirm, message } from 'antd';
import { PlusOutlined, FormOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { PageContainer, ProTable } from '@ant-design/pro-components';

import { EditModal } from './commponents/modal';

import { reqDel, reqTableList } from '@/services/sort';

import type { TableListItem, TableListPagination } from './data';
import type { ProColumns, ActionType } from '@ant-design/pro-table';

interface IndexProps { }

const size: string | any = 'small';
const PopconfirmTitle = `确认删除吗？此操作不可撤销  `;





const Index: React.FC<IndexProps> = (props) => {
    const actionRef = useRef<any>()

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [row, setRow] = useState<any>()

    const [type, setType] = useState('')

    const handleModal = (show: boolean, row: any = null, type: string = '') => {

        setRow(row)
        setIsOpen(show)
        setType(type)
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
                data: res.data,
                success: true,
                // total,
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
            title: '分类名称',
            dataIndex: 'name',
            copyable: true,
        },

        {
            width: 280,
            align: 'center',
            fixed: 'right',
            title: '操作',
            hideInSearch: true,
            render: (_, row) => [
                <Button type="link" key='edit' icon={<FormOutlined />} onClick={() => handleModal(true, row, 'edit')}>
                    编辑
                </Button>,
                <Button type="link" key='add' icon={<PlusCircleOutlined />} onClick={() => handleModal(true, row, 'add')}>
                    添加
                </Button>,
                <Popconfirm
                    key='popconfirm'
                    title={PopconfirmTitle}
                    placement="topRight"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => handleDelete(row?.id)}
                >
                    <Button type="link" key='delete' icon={<DeleteOutlined />} >
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
                    headerTitle='分类列表'
                    defaultSize={size}
                    columns={columns}
                    actionRef={actionRef}
                    request={(params): Promise<any> => handleTableList(params)}
                    rowKey="id"
                    pagination={false}
                    dateFormatter="string"
                    toolBarRender={() => [
                        <Button
                            key="button"
                            type="primary"
                            icon={<PlusCircleOutlined />}
                            // size={size}
                            onClick={() => handleModal(true, 'add')}
                        >
                            新建
                        </Button>]}
                />
            </PageContainer>
            {
                isOpen ? <EditModal isOpen={isOpen} handleModal={handleModal} row={row} actionRef={actionRef} type={type} /> : null
            }
        </>
    );
};

export default Index;
