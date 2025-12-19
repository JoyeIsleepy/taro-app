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

import { ArrowRight } from '@nutui/icons-react-taro';
import { uploadUrl } from '@/utils/config';
import { useGlobalShare } from '../../utils/useGlobalShare.js';

import styles from './index.module.scss';

function Index() {
  useGlobalShare();
  const formRef = useRef(null);
  const [form] = Form.useForm();

  const onStart = () => {
    console.log('start触发');
  };

  const beforeUpload = async files => {
    console.log('beforeUpload files', files);
    return files; // 不过滤
  };

  const pickerOptions = [
    { label: '小吃', value: '001' },
    { label: '卤味', value: '002' },
    { label: '热门', value: '003' },
    { label: '套餐', value: '004' },
    { label: '炒饭', value: '005' },
    { label: '炒面', value: '006' },
    { label: '米线', value: '007' },
    { label: '卤味', value: '008' },
    { label: '饮料', value: '009' },
  ];

  const submitSucceed = values => {
    console.log('submitSucceed values', values);
  };
  const save = () => {
    console.log('submitSucceed values');
  };

  return (
    <View className={styles.content}>
      <Form
        ref={formRef}
        labelPosition="right"
        onFinish={values => submitSucceed(values)}
        onFinishFailed={(values, errors) => {
          console.log(errors);
        }}
        footer={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Button nativeType="submit" type="primary">
              提交
            </Button>
            <Button nativeType="reset" style={{ marginLeft: '20px' }}>
              重置
            </Button>
          </div>
        }
      >
        {/* <Form.Item
          label="菜单分类"
          name="categoryType"
          trigger="onConfirm"
          rules={[{ required: true, message: '请选择菜单分类' }]}
          getValueFromEvent={(...args) => args[1]}
          onClick={(event, ref) => {
            ref.open();
          }}
        >
          <Picker options={[pickerOptions]}>
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
                      ? pickerOptions.filter(po => po.value === value[0])[0]?.label
                      : 'Please select'
                  }
                  extra={<ArrowRight />}
                  align="center"
                />
              );
            }}
          </Picker>
        </Form.Item> */}
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
        {/* <Form.Item
          label="商品图片"
          name="image"
          rules={[{ required: true, message: '请上传商品图片' }]}
        >
          <Uploader
            url={uploadUrl}
            autoUpload={true}
            name="file"
            onStart={onStart}
            beforeUpload={beforeUpload}
            maxCount="1"
            style={{
              marginInlineEnd: '10px',
              marginBottom: '10px',
            }}
          />
        </Form.Item> */}
      </Form>
    </View>
  );
}
export default Index;
