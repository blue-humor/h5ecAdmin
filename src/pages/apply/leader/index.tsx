import React, { useRef, useState } from 'react';
import { history } from 'umi';
import { Button, Popconfirm, Image, Badge } from 'antd';
import { PlusOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';

import { PageContainer, ProTable } from '@ant-design/pro-components';

import { EditModal } from './commponents/modal';

import IconFont from '@/utils/iconFont';

import { reqTableList } from '@/services/apply';



import type { TableListItem, TableListPagination } from '../data';
import type { ProColumns } from '@ant-design/pro-table';

interface IndexProps { }

const size: string | any = 'large';
const PopconfirmTitle = `确认删除吗？此操作不可撤销  `;


const Index: React.FC<IndexProps> = (props) => {
    const actionRef = useRef<any>()

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [row, setRow] = useState<any>()

    const [activeKey, setActiveKey] = useState<any>('1');

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
            width: 100,
            title: 'Logo',
            fixed: 'left',
            hideInSearch: true,
            render: (_: any, record: { teamLogo: string | undefined; }) => <Image width={64} src={record.teamLogo} />,
        },
        {

            title: '队伍名称',
            dataIndex: 'teamName',
            copyable: true,
            ellipsis: true,
            width: 180,
            fixed: 'left',
        },
        {
            align: 'center',
            title: '领队姓名',
            dataIndex: 'leader',
            ellipsis: true,
            hideInSearch: true,
        },
        {
            align: 'center',
            title: '性别',
            dataIndex: 'sex',
            hideInSearch: true,
        },
        {
            align: 'center',
            title: '队伍类型',
            dataIndex: 'groupName',
            hideInSearch: true,
        },
        {
            align: 'center',
            title: '参赛项目',
            dataIndex: 'projectNames',
            hideInSearch: true,
        },
        {
            width: 180,
            align: 'center',
            title: '联系电话',
            dataIndex: 'contactPhone',
            hideInSearch: true,
        },
        {
            width: 240,
            align: 'center',
            title: '身份证号码',
            dataIndex: 'idNo',
            hideInSearch: true,
        },

        {
            width: 200,
            align: 'center',
            title: '创建时间',
            dataIndex: 'createDatetime',
            hideInSearch: true,
        },
        {
            width: 200,
            align: 'center',
            fixed: 'right',
            title: '操作',
            hideInSearch: true,
            render: (_, row) => [
                // <Button type="link" key='edit' icon={<FormOutlined />} onClick={() => handleModal(true, row)} />,
                <Button type="link" key='look' icon={<IconFont type='icon-chakan' />}
                    onClick={() => {
                        history.push({
                            pathname: '/apply/member',
                            query: {
                                id: `${row?.id}`,
                                type: activeKey
                            }
                        })
                    }}
                >
                    查看</Button>,
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
                    scroll={{ x: 1600 }}
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
                                    tab: '校内参赛队',
                                },
                                {
                                    key: '2',
                                    tab: '非校内参赛队',
                                },
                                {
                                    key: '3',
                                    tab: '邀请赛俱乐部',
                                },
                            ],
                        },
                    }}
                    dateFormatter="string"
                // toolBarRender={() => [
                //     <Button
                //         key="button"
                //         type="primary"
                //         icon={<PlusOutlined />}
                //         onClick={() => handleModal(true)}
                //     >
                //         新建
                //     </Button>]}
                />
            </PageContainer>
            {
                isOpen ? <EditModal isOpen={isOpen} handleModal={handleModal} row={row} actionRef={actionRef} /> : null
            }
        </>
    );
};

export default Index;
