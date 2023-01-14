import React, { useRef, useState } from 'react';


import { PageContainer, ProColumns, ProList, ProTable } from '@ant-design/pro-components';

import { EditModal } from './commponents/modal';


import { reqTableList } from '@/services/vip';

import type { TableListItem, TableListPagination } from './data';
import type { ActionType } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Image } from 'antd';

interface IndexProps { }

const size: string | any = 'large';
const PopconfirmTitle = `确认删除吗？此操作不可撤销  `;



const Index: React.FC<IndexProps> = (props) => {
    const actionRef = useRef<ActionType>();

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [type, setType] = useState<number>()
    const handleModal = (show: boolean, type?: number) => {
        setType(type)
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


    const columns: ProColumns<any>[] = [
        {
            align: 'center',
            width: 160,
            title: '用户头像',
            dataIndex: 'headimg',
            hideInSearch: true,
            render: (_, row) => <Image width={60} src={row?.headimg} placeholder />
        },
        {
            title: '用户名称',
            dataIndex: 'nickName',
            copyable: true,
            hideInSearch: true,
        },



    ]



    const metas: any = {
        title: {
            dataIndex: 'nickName',
            title: '用户',
        },
        avatar: {
            dataIndex: 'headimg',
            search: false,
        },
        description: {
            dataIndex: 'title',
            search: false,
        },

    }


    return (
        <>
            <PageContainer>
                {/* <ProList<TableListItem>
                    // toolBarRender={() => {
                    //     return [
                    //         <Button key="3" type="primary">
                    //             新建
                    //         </Button>,
                    //     ];
                    // }}
                    search={false}

                    rowKey="id"
                    request={async (params): Promise<any> => handleTableList(params)
                    }
                    pagination={{
                        defaultPageSize: 10,
                        showSizeChanger: true,
                    }}
                    showActions="hover"
                    metas={metas}
                /> */}
                <ProTable<TableListItem, TableListPagination>
                    // scroll={{ x: 1300 }}
                    search={false}
                    headerTitle='会员列表'
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
                            onClick={() => handleModal(true, 1)}
                        >
                            修改关于我们
                        </Button>,
                        <Button
                            key="button"

                            icon={<PlusOutlined />}
                            onClick={() => handleModal(true, 2)}
                        >
                            修改联系我们
                        </Button>,
                    ]

                    }

                />

            </PageContainer>
            <EditModal isOpen={isOpen} handleModal={handleModal} type={type} />
        </>
    );
};

export default Index;
