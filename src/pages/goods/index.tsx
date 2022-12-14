import React, { useRef, useState } from 'react';

import { Button, Popconfirm, Row } from 'antd';
import { PlusOutlined, FormOutlined, DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';

import { PageContainer, ProTable } from '@ant-design/pro-components';

import type { TableListItem, TableListPagination } from './data';
import type { ProColumns, ActionType } from '@ant-design/pro-table';

interface IndexProps { }

const size: string | any = 'large';
const PopconfirmTitle = `确认删除账号吗？此操作不可撤销  `;


const getData = () => {
  let data = []
  for (let i = 0; i < 100; i++) {
    data.push({ id: i, name: '上衣' + i, createDate: Date.now() })
  }
  return data
}

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
    // const res = await reqTableList(params);
    // if (res.code === '200') {
    //     return {
    //         data: res.data.list,
    //         success: true,
    //         total: res.data.total,
    //     };
    // }
    const data = getData()
    return {
      data: data,
      success: true,
      total: data.length,
    };
  };

  /**
   * copyable 是否支持复制
   * ellipsis 是否自动缩略
   * tooltip 会在 title 之后展示一个 icon，hover 之后提示一些信息
   */


  const columns: ProColumns<TableListItem>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 80,
    },
    {
      title: '分类名',
      dataIndex: 'name',
      valueType: 'textarea',
      copyable: true,

    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      hideInSearch: true,
    },
    {
      width: 280,
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
          // scroll={{ x: 1300 }}
          defaultSize={size}
          columns={columns}
          actionRef={actionRef}
          request={(params): Promise<any> => handleTableList(params)}
          rowKey="id"
          pagination={{
            pageSize: 10,
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
    </>
  );
};

export default Index;
