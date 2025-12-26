import React, { useEffect, useState, useRef } from 'react';
import { View } from '@tarojs/components';
import {
  Button,
  Form,
  Input,
  InputNumber,
  TextArea,
  Uploader,
  Picker,
  Cell,
} from '@nutui/nutui-react-taro';
import CustomUploader from '@/components/CustomUploader';
import { ArrowRight } from '@nutui/icons-react-taro';
import { categoryType } from '@/utils/enum';
import { createProduct } from '@/server/order';
import { useGlobalShare } from '../../utils/useGlobalShare.js';

import styles from './index.module.scss';

function Index() {
  useGlobalShare();
  const formRef = useRef(null);
  const [form] = Form.useForm();

  const submitFailed = error => {
    console.log({ title: JSON.stringify(error), icon: 'error' });
  };

  const submitSucceed = async values => {
    const res = await createProduct(values);
    console.log(res, 'res');
  };

  return (
    <View className={styles.content}>
      <Form
        form={form}
        labelPosition="right"
        onFinish={values => submitSucceed(values)}
        onFinishFailed={(values, errors) => submitFailed(errors)}
        footer={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Button onClick={() => form.submit()} type="primary">
              提交
            </Button>
            <Button onClick={() => form.resetFields()} style={{ marginLeft: '20px' }}>
              重置
            </Button>
          </div>
        }
      >
        <Form.Item
          label="菜单分类"
          name="categoryType"
          trigger="onConfirm"
          getValueFromEvent={(...args) => args[1]}
          onClick={(event, ref) => {
            ref.open();
          }}
        >
          <Picker options={[categoryType]}>
            {value => {
              return (
                <Cell
                  style={{
                    padding: 0,
                    '--nutui-cell-divider-border-bottom': '0',
                  }}
                  className="nutui-cell--clickable"
                  title={
                    value.length
                      ? categoryType.filter(po => po.value === value[0])[0]?.label
                      : '请选择菜单分类'
                  }
                  extra={<ArrowRight />}
                  align="center"
                />
              );
            }}
          </Picker>
        </Form.Item>

        <Form.Item
          align="center"
          label="产品名称"
          name="productName"
          rules={[{ required: true, message: '请输入产品名称' }]}
        >
          <Input className="nut-input-text" placeholder="请输入产品名称" type="text" />
        </Form.Item>
        <Form.Item
          label="产品价格"
          name="price"
          rules={[{ required: true, message: '请输入产品价格' }]}
        >
          <Input type="number" placeholder="请输入产品价格" />
        </Form.Item>
        <Form.Item
          label="商品图片"
          name="image"
          rules={[{ required: true, message: '请上传商品图片' }]}
        >
          <CustomUploader maxCount="1" />
        </Form.Item>
      </Form>
    </View>
  );
}
export default Index;
