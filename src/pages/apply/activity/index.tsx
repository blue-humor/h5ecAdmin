import React, { useRef, useState } from 'react';
import { history, Link } from 'umi';
import { Button, Popconfirm, Image, Tooltip, Tag } from 'antd';
import { DeleteOutlined, FormOutlined, PlusOutlined } from '@ant-design/icons';

import { PageContainer, ProTable } from '@ant-design/pro-components';

import { EditModal } from './commponents/modal';

import IconFont from '@/utils/iconFont';

import { reqActivityList, reqActivitDel } from '@/services/apply';



import type { TableListItem, TableListPagination } from '../data';
import type { ProColumns } from '@ant-design/pro-table';

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
        const res = await reqActivitDel({ id })
        if (res?.code === 200) {
            actionRef?.current.reload()
        }
    }

    const handleTableList = async (params: any) => {


        const res = await reqActivityList({ ...params })
        if (res.code === 200) {
            const { list, total } = res?.data
            return {
                data: list,
                success: true,
                total: total,
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
            width: 100,
            title: '活动封面',
            // fixed: 'left',
            hideInSearch: true,
            render: (_: any, record) => <Image width={64} src={record?.thumbList[0]?.url} />,
        },
        {
            width: 180,
            title: '活动名称',
            dataIndex: 'title',
            // copyable: true,
            ellipsis: true,

        },
        {
            width: 100,
            title: '状态',
            // fixed: 'left',
            hideInSearch: true,
            render: (_: any, record: { status: string | undefined; }) => <Tag color={`${record?.status === '已报名' ? '#1654ff' : ''}`}>{record?.status}</Tag>,
        },

        {
            width: 200,
            title: '描述',
            dataIndex: 'intro',
            ellipsis: true,
            hideInSearch: true,

        },

        {
            width: 150,
            align: 'center',
            fixed: 'right',
            title: '操作',
            hideInSearch: true,
            render: (_, row) => [
                <Button type="link" key='look' icon={<IconFont type='icon-chakan' />}
                    onClick={() => {
                        history.push({
                            pathname: '/apply/activity/leader',
                            query: {
                                activityId: `${row?.id}`,
                                activityname: row?.title
                            }
                        })
                    }}
                >
                    查看</Button>,
                <Button type="link" key='edit' icon={<FormOutlined />} onClick={() => handleModal(true, row)} >
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
                    // headerTitle='领队列表'
                    search={false}

                    // scroll={{ x: 1600 }}
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
