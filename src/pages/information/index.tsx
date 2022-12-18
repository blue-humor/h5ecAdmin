import React, { useRef, useState } from 'react';

import { Button, Popconfirm, Image, Typography } from 'antd';
import { PlusOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';

import { PageContainer, ProTable } from '@ant-design/pro-components';

import { EditModal } from './commponents/modal';


import { reqTableList } from '@/services/information';

import type { TableListItem, TableListPagination } from './data';
import type { ProColumns } from '@ant-design/pro-table';


interface IndexProps { }

const size: string | any = 'large';
const PopconfirmTitle = `确认删除吗？此操作不可撤销  `;


const Index: React.FC<IndexProps> = (props) => {
    const actionRef = useRef<any>()

    const [activeKey, setActiveKey] = useState<any>('1');

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [row, setRow] = useState<any>()
    const handleModal = (show: boolean, row: any = null) => {
        setRow(row)
        setIsOpen(show)
    }

    const handleDelete = (id: number) => {

    }


    const handleTableList = async (params: any) => {
        const res = await reqTableList({ ...params, type: activeKey })
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
            width: 150,
            title: '文章图片',
            dataIndex: 'thumb',
            hideInSearch: true,
            render: (_, row) => <Image src={row?.thumb} width={100} />
        },

        {
            width: 280,
            title: '文章标题',
            dataIndex: 'title',
            copyable: true,
            ellipsis: true,


        },

        {
            width: 280,
            ellipsis: true,
            title: '文章视频',
            dataIndex: 'video',
            hideInSearch: true,
            render: (_, row) => <Typography.Link target='_blank' href={row?.video} >{row?.video}</Typography.Link>
        },

        {
            width: 280,
            align: 'center',
            fixed: 'right',
            title: '操作',
            hideInSearch: true,
            render: (_, row) => [
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
                    // scroll={{ x: 1300 }}
                    defaultSize={size}
                    columns={columns}
                    actionRef={actionRef}
                    request={(params): Promise<any> => handleTableList(params)}
                    rowKey="id"
                    pagination={{
                        defaultPageSize: 5,
                        showSizeChanger: true,
                    }}
                    toolbar={{
                        multipleLine: true,
                        tabs: {
                            activeKey,
                            onChange: (key) => {
                                setActiveKey(key)
                                actionRef.current.reload()
                            },
                            items: [
                                {
                                    key: '1',
                                    tab: '投稿集锦',
                                },
                                {
                                    key: '2',
                                    tab: '赛事新闻',
                                },
                                {
                                    key: '3',
                                    tab: '合作培训',
                                },
                                {
                                    key: '4',
                                    tab: '精选课程',
                                },
                            ],
                        },
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
                isOpen ? <EditModal isOpen={isOpen} handleModal={handleModal} row={row} actionRef={actionRef} activeKey={activeKey} /> : null
            }
        </>
    );
};

export default Index;
