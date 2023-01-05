import React, { useEffect, useState } from 'react';

import { history } from 'umi';

import {
    PageContainer,
    ProForm,
    ProCard,
    ProFormList,
    ProFormText,
    FooterToolbar,
    ProFormDigit,

    ProFormMoney
} from '@ant-design/pro-components';
import ProSkeleton from '@ant-design/pro-skeleton';

import { Card, message, Button, Cascader, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import Upload from '@/components/Upload';

import { reqAddGoods, reqInfo, reqEdit } from '@/services/goods';
import { reqTableList } from '@/services/sort';
import { reqSpecsList } from '@/services/specs';


import { goodDetails } from '@/utils/rules';
import styles from './index.less';


interface IndexProps {
    location?: any;
}




const Index: React.FC<IndexProps> = (props) => {



    const [formObj] = ProForm.useForm();

    const setthumb = (fileKey: any) => formObj.setFieldsValue({ 'thumb': fileKey })
    const setPrimaryImage = (fileKey: any) => formObj.setFieldsValue({ 'primaryImage': fileKey })
    const setDescImage = (fileKey: any) => formObj.setFieldsValue({ 'descImage': fileKey })
    const setThumbnail = (fileKey: any) => formObj.setFieldsValue({ 'thumbnail': fileKey })



    const [thumbList, setThumbList] = useState<any>([])
    const [primaryImageList, setPrimaryImageList] = useState<any>([])
    const [descImageList, setDescImageList] = useState<any>([])
    const [thumbnailList, setThumbnailList] = useState<any>([])


    const [groupOptions, setGroupOptions] = useState<any>([])
    const [specsList, setSpecsList] = useState<any>([])

    const [initialValues, setInitialValues] = useState<any>(null)

    const { id } = history.location.query as { id: any }


    const handleAddGoods = async (params: any) => {
        console.log(params);
        const res = await reqAddGoods(params)
        if (res?.code === 200) {
            message.success(res?.message)
            history.goBack()
        } else {
            message.success(res?.message)
        }
    }
    const handleUploadGoods = async (params: any) => {
        console.log(params);

        const res = await reqEdit({ ...params, id })
        if (res?.code === 200) {
            message.success(res?.message)
            history.goBack()
        } else {
            message.success(res?.message)
        }
    }


    const handleInfo = async () => {
        const res = await reqInfo({ id: id })
        if (res?.code === 200) {
            const { thumb, primaryImage, descImage, price, originPrice, soldNum, title, sku, desc, categoryId } = res?.data
            setThumbList(thumb)
            setPrimaryImageList(primaryImage)
            setDescImageList(descImage)

            setInitialValues({
                price,
                originPrice,
                soldNum,
                title,
                sku,
                desc,
                thumb,
                descImage,
                primaryImage,
                categoryId
            })

        }

    }

    const handleSort = async () => {
        const res = await reqTableList({})
        if (res?.code === 200) {
            setGroupOptions(res?.data)
        }
    }

    const handleSpecsList = async () => {
        const res = await reqSpecsList({})
        if (res?.code === 200) {
            setSpecsList(res?.data)
        }
    }


    useEffect(() => {
        if (id) {
            handleInfo()
        }
        handleSort()
        handleSpecsList()
        return () => {

        }
    }, [])




    return (
        <>
            {/* {goodsInfo} */}
            {
                initialValues === null && id ? <ProSkeleton type="descriptions" /> : <ProForm
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
                    initialValues={initialValues}
                    onFinish={async (values): Promise<any> => id ? handleUploadGoods(values) : handleAddGoods(values)}
                >

                    <PageContainer
                        header={{
                            title: `${id ? '编辑商品详情' : '添加商品详情'}`,
                        }}
                    >
                        <Card bordered={false} title={'商品简介'} className={styles.card}>
                            <ProForm.Group>
                                <ProForm.Item name="categoryId" label="商品分类" tooltip="商品分类是必须选择" rules={goodDetails.category}>
                                    <Cascader placeholder="请选择商品分类" style={{ width: '552px' }} fieldNames={{ label: 'name', value: 'id', children: 'children' }} options={groupOptions} />
                                </ProForm.Item>
                                <ProFormText
                                    width="xl"
                                    className={styles.proFormMargin}
                                    name="title"
                                    label="商品名"
                                    placeholder="请输入商品标题"
                                    tooltip="最长为 24 位"
                                    rules={goodDetails.title}
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
                                // rules={[{ required: true, message: '请输入现价价格' }]}
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
                                rules={goodDetails.soldNum}
                            />
                            {/* <ProFormTextArea
                                width="xl"
                                name="desc"
                                label="描述"
                                placeholder="请输入描述"
                                rules={goodDetails.desc}
                            /> */}

                            <ProForm.Item label="上传封面图" name="thumb" rules={goodDetails.thumb}>
                                <Upload name='file' accept='image/*' listType='picture-card' setKey={setthumb} maxCount={1} fileList={thumbList}>
                                    <Button type='link' icon={<UploadOutlined />}>上传图片</Button>
                                </Upload>
                            </ProForm.Item>
                            <ProForm.Item label="上传商品轮播图" name="primaryImage" rules={goodDetails.primaryImage}>
                                <Upload name='file' accept='image/*' listType='picture-card' setKey={setPrimaryImage} maxCount={999} fileList={primaryImageList}>
                                    <Button type='link' icon={<UploadOutlined />}>上传图片</Button>
                                </Upload>
                            </ProForm.Item>
                            <ProForm.Item label="上传详情图" name="descImage" rules={goodDetails.descImage}>
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
                                // creatorRecord={{ name: '', items: [{ vlue: '' }] }}
                                initialValue={initialValues?.sku}
                            >

                                <ProForm.Group>
                                    <ProFormText style={{ padding: 0 }} width="md" name="name" label="规格名" placeholder="请输入规格名" />
                                    <ProFormMoney
                                        width="md"
                                        name="price"
                                        label="价格"
                                        placeholder="请输入价格"
                                        min={0}
                                        max={9999999999999999}
                                    // rules={[{ required: true, message: '请输入现价价格' }]}
                                    />
                                    <ProFormDigit
                                        width="md"
                                        name="soldNum"
                                        label="库存"
                                        placeholder="请输入库存"
                                        min={0}
                                        max={99999999}
                                        rules={goodDetails.soldNum}
                                    />

                                </ProForm.Group>
                                <ProForm.Group>
                                    {
                                        specsList?.map((item: any) => {
                                            return <ProForm.Item key={item?.id} name={item?.key} label={item?.name} tooltip="选择商品规格" rules={goodDetails.category}>
                                                <Select placeholder={`请选择${item?.name}`} fieldNames={{ label: 'name', value: 'id' }} options={item?.children} />
                                            </ProForm.Item>
                                        })
                                    }
                                </ProForm.Group>
                                <ProForm.Group>
                                    {/* <ProForm.Item label="上传规格图" name="thumbnail" >
                                        <Upload name='file' accept='image/*' listType='picture-card' setKey={setThumbnail} maxCount={1} fileList={thumbnailList}>
                                            <Button type='link' icon={<UploadOutlined />}>上传图片</Button>
                                        </Upload>
                                    </ProForm.Item> */}
                                </ProForm.Group>
                            </ProFormList>
                        </Card>

                    </PageContainer>
                </ProForm>
            }

        </>
    );
};

export default Index;