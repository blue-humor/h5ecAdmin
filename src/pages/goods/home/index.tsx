import React, { useRef, useState } from 'react';

import { history, useModel } from 'umi';

import { Button, Popconfirm, Image, Tag } from 'antd';
import { PlusOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';

import { PageContainer, ProTable } from '@ant-design/pro-components';

import { reqTableList, reqDelete } from '@/services/goods';
import { priceFormat } from '@/utils/index';

import type { TableListItem, TableListPagination } from '../data';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import styles from './index.less';
interface IndexProps { }

const size: string | any = 'small';
const PopconfirmTitle = `确认删除吗？此操作不可撤销  `;




const Index: React.FC<IndexProps> = (props) => {



  const actionRef = useRef<ActionType>();

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [row, setRow] = useState<TableListItem>()

  const handleDelete = async (id: number) => {
    const res = await reqDelete({ id })
    if (res?.code === 200) {
      actionRef?.current.reload()
    }
  }
  const handleAddPush = () => {
    history.push({
      pathname: '/goods/home/details',
    })
  }
  const handleEditPush = (row?: any) => {
    history.push({
      pathname: '/goods/home/details',
      query: {
        id: row?.id,
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
      render: (_: any, record: any) => <Image width={60} src={record.thumb} />
    },
    {
      title: '标题',
      dataIndex: 'title',
      copyable: true,
      ellipsis: true,
      width: 200,
      fixed: 'left',
    },
    {
      width: 100,
      align: 'center',
      title: '现价',
      dataIndex: 'price',
      hideInSearch: true,
      render: (_, row) => <Tag className={styles.homeTagPrice}>
        ￥{row?.price}
      </Tag>
    },
    // {
    //   width: 100,
    //   align: 'center',
    //   title: '原价',
    //   dataIndex: 'originPrice',
    //   hideInSearch: true,
    //   render: (_, row) => <Tag className={styles.homeTagOriginal}>
    //     ￥{row?.originPrice}
    //   </Tag>
    // },
    {
      width: 100,
      align: 'center',
      title: '库存',
      dataIndex: 'soldNum',
      hideInSearch: true,

      render: (_, row) => <Tag className={styles.homeSoldNum}>
        {row?.soldNum}件
      </Tag>
    },
    // {
    //   title: '销量',
    //   dataIndex: 'sales',
    //   hideInSearch: true,
    // },
    {
      width: 160,
      align: 'center',
      fixed: 'right',
      title: '操作',
      hideInSearch: true,
      render: (_, row) => [
        <Button key='edit' type="link" icon={<FormOutlined />} onClick={() => handleEditPush(row)} >
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
          <Button key='delete' type="link" icon={<DeleteOutlined />} >
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
          search={false}
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
              // size={size}
              onClick={() => handleAddPush()}
            >
              新建
            </Button>]}
        />
      </PageContainer>
    </>
  );
};

export default Index;
