import React, { useRef, useState } from 'react';

import { Button, Popconfirm, Image, Badge } from 'antd';
import { PlusOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';

import { PageContainer, ProTable } from '@ant-design/pro-components';

import { EditModal } from './commponents/modal';

import { reqTableList } from '@/services/apply';

import type { TableListItem, TableListPagination } from './data';
import type { ProColumns } from '@ant-design/pro-table';

interface IndexProps { }

const size: string | any = 'large';
const PopconfirmTitle = `确认删除吗？此操作不可撤销  `;


const renderBadge = (count: number, active = false) => {
    return (
        <Badge
            count={count}
            style={{
                marginBlockStart: -2,
                marginInlineStart: 4,
                color: active ? '#1890FF' : '#999',
                backgroundColor: active ? '#E6F7FF' : '#eee',
            }}
        />
    );
};

const Index: React.FC<IndexProps> = (props) => {
    const actionRef = useRef<any>()

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [row, setRow] = useState<any>()

    const [activeKey, setActiveKey] = useState<React.Key>('tab1');

    const handleModal = (show: boolean, row: any = null) => {
        setRow(row)
        setIsOpen(show)
    }

    const handleDelete = (id: number) => {

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
            width: 80,
            title: 'logo',

            fixed: 'left',
            hideInSearch: true,
            render: (_: any, record: { teamLogo: string | undefined; }) => <Image width={40} src={record.teamLogo} />,
        },
        {

            title: '队伍名称',
            dataIndex: 'teamName',
            copyable: true,
            ellipsis: true,
            width: 150,
            fixed: 'left',
        },
        {

            title: '领队姓名',
            dataIndex: 'leader',
            ellipsis: true,
            hideInSearch: true,
        },
        {

            title: '性别',
            dataIndex: 'sex',
            hideInSearch: true,
        },
        {

            title: '队伍名称',
            dataIndex: 'groupName',
            hideInSearch: true,
        },
        {

            title: '参赛项目',
            dataIndex: 'projectNames',
            hideInSearch: true,
        },
        {
            width: 180,
            title: '联系电话',
            dataIndex: 'contactPhone',
            hideInSearch: true,
        },
        {
            width: 240,
            title: '身份证号码',
            dataIndex: 'contactPhone',
            hideInSearch: true,
        },

        {
            width: 200,

            title: '创建时间',
            dataIndex: 'createDatetime',
            hideInSearch: true,
        },
        {
            width: 160,
            align: 'center',
            fixed: 'right',
            title: '操作',
            hideInSearch: true,
            render: (_, row) => [
                <Button type="link" key='edit' icon={<FormOutlined />} onClick={() => handleModal(true, row)} />,
                <Popconfirm
                    key='popconfirm'
                    title={PopconfirmTitle}
                    placement="topRight"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => handleDelete(row?.id)}
                >
                    <Button type="link" key='delete' icon={<DeleteOutlined />} />
                </Popconfirm>,
            ],
        },


    ]


    return (
        <>
            <PageContainer>
                <ProTable<TableListItem, TableListPagination>
                    scroll={{ x: 1700 }}
                    defaultSize={size}
                    columns={columns}
                    actionRef={actionRef}
                    request={(params): Promise<any> => handleTableList(params)}
                    rowKey="id"
                    pagination={{
                        pageSize: 5,
                    }}
                    toolbar={{
                        menu: {
                            type: 'tab',
                            activeKey: activeKey,
                            items: [
                                {
                                    key: 'tab1',
                                    label: <span>应用{renderBadge(99, activeKey === 'tab1')}</span>,
                                },
                                {
                                    key: 'tab2',
                                    label: <span>项目{renderBadge(30, activeKey === 'tab2')}</span>,
                                },
                                {
                                    key: 'tab3',
                                    label: <span>文章{renderBadge(30, activeKey === 'tab3')}</span>,
                                },
                            ],
                            onChange: (key) => {
                                setActiveKey(key as string);
                            },
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
                isOpen ? <EditModal isOpen={isOpen} handleModal={handleModal} row={row} actionRef={actionRef} /> : null
            }
        </>
    );
};

export default Index;
