import React, { useRef, useState } from 'react';
import { history } from 'umi';

import { Button, Popconfirm, Image, message, Drawer } from 'antd';
import { PlusOutlined, FormOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { PageContainer, ProTable } from '@ant-design/pro-components';

import { EditModal } from './commponents/modal';

import { reqTableList, reqDel } from '@/services/member';

// import type { TableListItem, TableListPagination } from '../data';
import type { ProColumns, ActionType } from '@ant-design/pro-table';

interface IndexProps {
    handleOnCloseList: (isopen: boolean) => void
    openList: boolean
    info: any
    type: string
}

const size: string | any = 'small';
const PopconfirmTitle = `确认删除吗？此操作不可撤销  `;



const Index: React.FC<IndexProps> = ({ openList, handleOnCloseList, info, type }) => {
    const actionRef = useRef<any>()

    const { activityId } = history.location.query as { activityId: string, }

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

    const handleTableList = async (params: any) => {
        const res = await reqTableList({ ...params, type, parentId: info?.id, activityId });
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


    const handlePageTitle = () => {
        switch (type) {
            case '1': return "校内参赛队"
            case '2': return "非校内参赛队"
            case '3': return "邀请赛俱乐部"
        }
    }


    const campus: any = [
        {
            align: 'center',
            title: '队员所属学校',
            dataIndex: 'colleageName',
            hideInSearch: true,
        },
        {
            align: 'center',
            title: '未成年监护人姓名',
            dataIndex: 'supervisorName',
            hideInSearch: true,
        },
        {
            title: '未成年监护人身份证号',
            dataIndex: 'supervisorIdNo',
            hideInSearch: true,
        }
    ]

    const columns: ProColumns<any>[] = [
        {

            title: '队员姓名',
            dataIndex: 'name',

            copyable: true,
        },
        {
            align: 'center',
            title: '队员性别',
            dataIndex: 'sex',
            hideInSearch: true,
        },
        {
            align: 'center',
            title: '队员身份证号',
            dataIndex: 'idNo',
            hideInSearch: true,
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
                    <Button type="link" key='delete' icon={<DeleteOutlined />}>
                        删除
                    </Button>
                </Popconfirm>,
            ],
        },
    ]


    return (
        <Drawer width={'80%'} title={handlePageTitle()} placement="right" onClose={() => handleOnCloseList(false)} open={openList} destroyOnClose>
            {/* <PageContainer title={handlePageTitle()}> */}
            <ProTable<any>
                // scroll={{ x: 1300 }}
                search={false}

                headerTitle={`${info?.teamName} 队员信息列表`}
                defaultSize={size}
                columns={type === '1' ? [...columns, ...campus] : columns}
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
                        // size={size}
                        onClick={() => handleModal(true)}
                    >
                        新建
                    </Button>]}
            />
            {/* </PageContainer> */}
            {
                isOpen ? <EditModal isOpen={isOpen} handleModal={handleModal} row={row} actionRef={actionRef} type={type} info={info} /> : null
            }
        </Drawer>
    );
};

export default Index;
