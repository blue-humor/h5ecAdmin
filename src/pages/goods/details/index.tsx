import React, { useEffect, useState } from 'react';

import { history, useModel } from 'umi';

import {
    PageContainer,
    ProForm,
    ProCard,
    ProFormList,
    ProFormText,
    FooterToolbar,
    ProFormDigit,
    ProFormSelect,
    ProFormTextArea,
    ProFormMoney
} from '@ant-design/pro-components';

import { Card, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import Upload from '@/components/Upload';

import { reqAddGoods } from '@/services/goods';

import { Option } from '../data';
import styles from './index.less';


interface IndexProps {
    location?: any;
}


const options: Option[] = [
    {
        value: '1',
        label: 'Zhejiang',
    },

];

const Index: React.FC<IndexProps> = (props) => {



    const [formObj] = ProForm.useForm();

    const setthumb = (fileKey: any) => formObj.setFieldsValue({ 'thumb': fileKey })
    const setPrimaryImage = (fileKey: any) => formObj.setFieldsValue({ 'primaryImage': fileKey })
    const setDescImage = (fileKey: any) => formObj.setFieldsValue({ 'descImage': fileKey })

    const [thumbList, setThumbList] = useState<any>([])
    const [primaryImageList, setPrimaryImageList] = useState<any>([])
    const [descImageList, setDescImageList] = useState<any>([])


    const { id } = history.location.query as { id: any }


    const handleAddgoods = async (params: any) => {
        const res = await reqAddGoods(params)
        if (res?.code === 200) {
            message.success(res?.message)
            history.goBack()
        } else {
            message.success(res?.message)
        }
    }






    return (
        <>
            {/* {goodsInfo} */}
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
                onFinish={async (values) => handleAddgoods(values)}
            >

                <PageContainer
                    header={{
                        title: `${id ? '编辑商品详情' : '添加商品详情'}`,
                    }}
                >
                    <Card bordered={false} title={'商品简介'} className={styles.card}>
                        <ProForm.Group>
                            <ProFormSelect
                                width="xl"
                                name="groupId"
                                label="商品分类"
                                placeholder="请选择商品分类"
                                tooltip="最长为 24 位"
                                options={options}
                            />
                            <ProFormText
                                width="xl"
                                className={styles.proFormMargin}
                                name="title"
                                label="商品名"
                                placeholder="请输入商品标题"
                                tooltip="最长为 24 位"
                            />
                        </ProForm.Group>

                        <ProForm.Group>
                            <ProFormMoney
                                width="xl"
                                name="price"
                                label="现价"
                                placeholder="请输入现价"
                                min={0}
                                max={9999999999999999}
                                rules={[{ required: true, message: '请输入现价价格' }]}
                            />
                            <ProFormMoney
                                width="xl"
                                name="originPrice"
                                label="原价"
                                placeholder="请输入原价"
                                min={0}
                                max={9999999999999999}
                            // rules={[{ required: true, message: '请输入原价价格' }]}
                            />

                        </ProForm.Group>

                        <ProFormDigit
                            width="xl"
                            name="soldNum"
                            label="库存"
                            placeholder="请输入库存"
                            min={0}
                            max={99999999}
                            rules={[{ required: true, message: '请输入库存' }]}
                        />
                        <ProFormTextArea
                            width="xl"
                            name="desc"
                            label="描述"
                            placeholder="请输入描述"
                            rules={[{ required: true, message: '请输入描述' }]}
                        />

                        <ProForm.Item label="上传封面图" name="thumb">
                            <Upload name='file' accept='image/*' listType='picture-card' setKey={setthumb} maxCount={999} fileList={thumbList}>
                                <Button type='link' icon={<UploadOutlined />}>上传图片</Button>
                            </Upload>
                        </ProForm.Item>
                        <ProForm.Item label="上传详情轮播图" name="primaryImage">
                            <Upload name='file' accept='image/*' listType='picture-card' setKey={setPrimaryImage} maxCount={999} fileList={primaryImageList}>
                                <Button type='link' icon={<UploadOutlined />}>上传图片</Button>
                            </Upload>
                        </ProForm.Item>
                        <ProForm.Item label="上传详情图" name="descImage">
                            <Upload name='file' accept='image/*' listType='picture-card' setKey={setDescImage} maxCount={999} fileList={descImageList}>
                                <Button type='link' icon={<UploadOutlined />}>上传图片</Button>
                            </Upload>
                        </ProForm.Item>


                    </Card>

                    <Card bordered={false} title="商品规格" className={styles.card}>
                        <ProFormList
                            name="sku"
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
                            creatorRecord={{ name: '', items: [{ vlue: '' }] }}
                            initialValue={[{ name: '', items: [{ vlue: '' }, { vlue: '' }] }]}
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
                                    <ProFormText allowClear={false} width="xs" name={['vlue']} />
                                </ProFormList>
                            </ProForm.Item>
                        </ProFormList>
                    </Card>

                </PageContainer>
            </ProForm>
        </>
    );
};

export default Index;