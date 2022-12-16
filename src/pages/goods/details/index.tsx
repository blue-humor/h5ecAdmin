import React, { useEffect, useState } from 'react';

import {
    PageContainer,
    ProForm,
    ProCard,
    ProFormList,
    ProFormText,
    FooterToolbar,
    ProFormDigit,
    ProFormCascader,
    ProFormTextArea,
    ProFormUploadButton,
} from '@ant-design/pro-components';

import { Card } from 'antd';


import styles from './index.less';

interface IndexProps {
    location?: any;
}

interface Option {
    value: string | number;
    label: string;
    children?: Option[];
}

const options: Option[] = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
            },
        ],
    },
];

const Index: React.FC<IndexProps> = (props) => {
    const [formObj] = ProForm.useForm();
    const setDetails = (content: string) => formObj.setFieldsValue({ desc: content });

    const [query, setQuery] = useState({
        type: '',
    });

    useEffect(() => {
        setQuery(props.location.query);
        console.log();
    }, [props.location]);

    return (
        <>
            <ProForm
                form={formObj}
                layout="vertical"
                hideRequiredMark
                submitter={{
                    render: (_props, dom) => {
                        return (
                            <FooterToolbar>
                                {/* {getErrorInfo(error)} */}
                                {dom}
                            </FooterToolbar>
                        );
                    },
                }}
                initialValues={{}}
                onFinish={async (e) => console.log(e)}
            >
                <PageContainer
                    header={{
                        title: `${query.type === 'add' ? '添加商品详情' : '编辑商品详情'}`,
                    }}
                >
                    <Card bordered={false} title={'商品简介'} className={styles.card}>
                        <ProForm.Group>
                            <ProFormCascader
                                name="name"
                                tooltip="最长为 24 位"
                                placeholder="请选择分类"
                                width="lg"
                                label="商品分类"
                                request={async () => options}
                            />
                            <ProFormText
                                className={styles.proFormMargin}
                                name="name"
                                tooltip="最长为 24 位"
                                placeholder="请输入商品标题"
                                width="xl"
                                label="商品名"
                            />
                        </ProForm.Group>

                        <ProForm.Group>
                            <ProFormDigit
                                width="md"
                                name="price"
                                label="最高价格"
                                placeholder="请输入价格"
                                min={0}
                                max={99999999}
                                rules={[{ required: true, message: '请输入价格' }]}
                            />
                            <ProFormDigit
                                width="md"
                                name="price"
                                label="最低价格"
                                placeholder="请输入价格"
                                min={0}
                                max={99999999}
                                rules={[{ required: true, message: '请输入价格' }]}
                            />

                            <ProFormDigit
                                name="stock"
                                label="库存"
                                width="md"
                                placeholder="请输入库存"
                                min={0}
                                max={99999999}
                                rules={[{ required: true, message: '请输入库存' }]}
                            />
                        </ProForm.Group>

                        <ProFormTextArea
                            name="description"
                            label="描述"
                            placeholder="请输入描述"
                            rules={[{ required: true, message: '请输入描述' }]}
                        />

                        <ProFormUploadButton
                            name="upload"
                            label="上传封面图"
                            max={999}
                            fieldProps={{
                                name: 'file',
                                listType: 'picture-card',
                            }}
                            action="/upload.do"
                        // extra="longgggggggggggggggggggggggggggggggggg"
                        />

                        <ProFormUploadButton
                            name="upload"
                            label="上传详情封面图"
                            max={999}
                            fieldProps={{
                                name: 'file',
                                listType: 'picture-card',
                            }}
                            action="/upload.do"
                        // extra="longgggggggggggggggggggggggggggggggggg"
                        />
                    </Card>

                    <Card bordered={false} title="颜色尺码" className={styles.card}>
                        <ProFormList
                            name="attributes"
                            label="规格"
                            creatorButtonProps={{
                                creatorButtonText: '添加规格项',
                            }}
                            min={1}
                            copyIconProps={false}
                            itemRender={({ listDom, action }, { index }) => (
                                <ProCard
                                    bordered
                                    style={{ marginBlockEnd: 8 }}
                                    title={`规格${index + 1}`}
                                    extra={action}
                                    bodyStyle={{ paddingBlockEnd: 0 }}
                                >
                                    {listDom}
                                </ProCard>
                            )}
                            creatorRecord={{ name: '', items: [{ name: '' }] }}
                            initialValue={[{ name: '颜色', items: [{ name: '红' }, { name: '黄' }] }]}
                        >
                            <ProFormText style={{ padding: 0 }} width="md" name="name" label="规格名" />
                            <ProForm.Item isListField style={{ marginBlockEnd: 0 }} label="规格值">
                                <ProFormList
                                    name="items"
                                    creatorButtonProps={{
                                        creatorButtonText: '新建',
                                        icon: false,
                                        type: 'link',
                                        style: { width: 'unset' },
                                    }}
                                    min={1}
                                    copyIconProps={false}
                                    deleteIconProps={{ tooltipText: '删除' }}
                                    itemRender={({ listDom, action }) => (
                                        <div
                                            style={{
                                                display: 'inline-flex',
                                                marginInlineEnd: 25,
                                            }}
                                        >
                                            {listDom}
                                            {action}
                                        </div>
                                    )}
                                >
                                    <ProFormText allowClear={false} width="xs" name={['name']} />
                                </ProFormList>
                            </ProForm.Item>
                        </ProFormList>
                    </Card>

                    {/* <Card bordered={false} title="商品详情" className={styles.card}>
            <ProForm.Item name={'desc'}>
              <TinymceEditor initialValuesDoc="" setDetails={setDetails} />
            </ProForm.Item>
          </Card> */}
                </PageContainer>
            </ProForm>
        </>
    );
};

export default Index;