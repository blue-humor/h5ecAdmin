import React, { useRef, useState } from 'react';

import { history } from 'umi';

import { Button, Popconfirm, Image } from 'antd';
import { PlusOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';

import { PageContainer, ProTable } from '@ant-design/pro-components';

import { reqTableList } from '@/services/goods';

import type { TableListItem, TableListPagination } from '../data';
import type { ProColumns, ActionType } from '@ant-design/pro-table';

interface IndexProps { }

const size: string | any = 'large';
const PopconfirmTitle = `确认删除吗？此操作不可撤销  `;




const Index: React.FC<IndexProps> = (props) => {
  const actionRef = useRef<ActionType>();

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [row, setRow] = useState<TableListItem>()

  const handleDelete = (id: number) => {

  }
  const handlePush = (params: string) => {
    history.push({
      pathname: '/goods/home/details',
      query: {
        type: params
      }
    })
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
      title: '商品图',
      align: 'center',
      fixed: 'left',
      hideInSearch: true,
      render: (_: any, record: any) => <Image width={40} src={record.thumb} />
    },
    {
      align: 'center',
      title: '标题',
      dataIndex: 'title',
      copyable: true,
      ellipsis: true,
      width: 280,
      tip: '标题过长会自动收缩',
      fixed: 'left',
    },
    {
      align: 'center',
      title: '价格',
      dataIndex: 'price',
      hideInSearch: true,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      hideInSearch: true,
    },
    {
      title: '销量',
      dataIndex: 'sales',
      hideInSearch: true,
    },

    {
      title: '创建时间',
      dataIndex: 'created_at',
      hideInSearch: true,
    },
    {
      width: 280,
      align: 'center',
      fixed: 'right',
      title: '操作',
      hideInSearch: true,
      render: (_, row) => [
        <Button type="link" key='edit' icon={<FormOutlined />} onClick={() => handlePush('edit')} />,
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
              onClick={() => handlePush('add')}
            >
              新建
            </Button>]}
        />
      </PageContainer>
    </>
  );
};

export default Index;
