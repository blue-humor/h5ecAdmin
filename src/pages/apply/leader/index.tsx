import React, { useRef, useState } from 'react';
import { history, Link } from 'umi';
import { Button, Popconfirm, Image, Tooltip } from 'antd';
import { DeleteOutlined, FileExcelOutlined } from '@ant-design/icons';

import { PageContainer, ProTable } from '@ant-design/pro-components';


import IconFont from '@/utils/iconFont';

import { reqTableList, reqDelete } from '@/services/apply';

import MemberModel from './commponents/member/index';


import type { TableListItem, TableListPagination } from '../data';
import type { ProColumns } from '@ant-design/pro-table';

interface IndexProps { }

const size: string | any = 'small';
const PopconfirmTitle = `确认删除吗？此操作不可撤销  `;


const Index: React.FC<IndexProps> = (props) => {

    const { activityId, activityname } = history.location.query as { activityId: string, activityname: string }

    const actionRef = useRef<any>()


    const [info, setInfo] = useState<any>()

    const [activeKey, setActiveKey] = useState<any>('1');

    const [openList, setOpenList] = useState(false)



    const handleDelete = async (id: number) => {
        const res = await reqDelete({ id })
        if (res?.code === 200) {
            actionRef?.current.reload()
        }
    }

    const handleTableList = async (params: any) => {


        const res = await reqTableList({ ...params, type: activeKey, activityId })
        if (res.code === 200) {
            const { list, total } = res?.data
            return {
                data: list,
                success: true,
                total: total,
            };
        }
    };


    const handleOnCloseList = (isOpen: boolean, info: any = null) => {
        // openList, handleOnCloseList, info 
        setOpenList(isOpen)
        setInfo(info)
    }

    /**
     * copyable 是否支持复制
     * ellipsis 是否自动缩略
     * tooltip 会在 title 之后展示一个 icon，hover 之后提示一些信息
     */

    const typeColumns: any = [{
        width: 100,
        title: '学校公章文件',
        fixed: 'left',
        hideInSearch: true,
        render: (_: any, record: { colleageCert: string | undefined; }) => <Image width={64} src={record.colleageCert} />,
    },]

    const columns: ProColumns<TableListItem>[] = [
        {
            width: 100,
            title: 'Logo',
            // fixed: 'left',
            hideInSearch: true,
            render: (_: any, record) => <Image width={64} src={record.teamLogo} />,
        },
        {

            title: '队伍名称',
            dataIndex: 'teamName',
            // copyable: true,
            ellipsis: true,
            width: 180,
        },
        {
            align: 'center',
            title: '领队姓名',
            dataIndex: 'leader',
            ellipsis: true,
            hideInSearch: true,
        },
        {
            width: 200,
            align: 'center',
            title: '邮箱',
            dataIndex: 'email',
            copyable: true,
            ellipsis: true,
            hideInSearch: true,
        },
        {
            width: 160,
            align: 'center',
            title: '性别',
            dataIndex: 'sex',
            hideInSearch: true,
        },
        {
            width: 140,
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
            ellipsis: true,
            width: 180,
            render: (_, row) => <Tooltip title={`${row?.projectType}-${row?.projectNames}`}>
                <span>{`${row?.projectType}-${row?.projectNames}`}</span>
            </Tooltip>
        },
        {
            width: 140,
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
            width: 260,
            align: 'center',
            fixed: 'right',
            title: '操作',
            hideInSearch: true,
            render: (_, row) => [
                // <Button type="link" key='edit' icon={<FormOutlined />} onClick={() => handleModal(true, row)} />,
                <Button type="link" key='look' icon={<IconFont type='icon-chakan' />}
                    onClick={() => {
                        // history.push({
                        //     pathname: '/apply/member',
                        //     query: {
                        //         id: `${row?.id}`,
                        //         type: activeKey,
                        //         teamName: row?.teamName
                        //     }
                        // })
                        handleOnCloseList(true, row)
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
                <Button type='link' icon={<FileExcelOutlined />}>
                    <a download href={`${BASE_URL}/data/exportexcel?id=${row?.id}`}>
                        下载
                    </a>
                </Button>
            ],
        },


    ]


    return (
        <>
            <PageContainer title={`${activityname}的领队列表`}>
                <ProTable<TableListItem, TableListPagination>
                    // headerTitle='领队列表'
                    search={false}
                    scroll={{ x: 1600 }}
                    defaultSize={size}
                    columns={activeKey === '1' ? [...typeColumns, ...columns] : columns}
                    actionRef={actionRef}
                    request={(params): Promise<any> => handleTableList(params)}
                    rowKey="id"
                    pagination={{
                        defaultPageSize: 10,
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
                                    tab: '俱乐部组',
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
            <MemberModel handleOnCloseList={handleOnCloseList} openList={openList} info={info} type={activeKey} />
        </>
    );
};

export default Index;
