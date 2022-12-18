import React, { useRef, useState } from 'react';


import { PageContainer, ProList } from '@ant-design/pro-components';

import { EditModal } from './commponents/modal';


import { reqTableList } from '@/services/vip';

import type { TableListItem, TableListPagination } from './data';
import type { ActionType } from '@ant-design/pro-table';

interface IndexProps { }

const size: string | any = 'large';
const PopconfirmTitle = `确认删除吗？此操作不可撤销  `;



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
        const res = await reqTableList(params);
        if (res.code === 200) {
            return {
                data: res.data.list,
                success: true,
                total: res.data.total,
            };
        }

    };


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
                <ProList<TableListItem>
                    // toolBarRender={() => {
                    //     return [
                    //         <Button key="3" type="primary">
                    //             新建
                    //         </Button>,
                    //     ];
                    // }}
                    search={{}}
                    rowKey="id"
                    request={async (params): Promise<any> => handleTableList(params)
                    }
                    pagination={{
                        defaultPageSize: 10,
                        showSizeChanger: true,
                    }}
                    showActions="hover"
                    metas={metas}
                />
            </PageContainer>
            {
                isOpen ? <EditModal isOpen={isOpen} handleModal={handleModal} row={row} /> : null
            }
        </>
    );
};

export default Index;
