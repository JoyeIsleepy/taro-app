import React, { useEffect, useState } from 'react';
import { View } from '@tarojs/components';
import { Uploader } from '@nutui/nutui-react-taro';
import { createOrder } from '../../server/order';
import API from '@packages/api';
import { useGlobalShare } from '../../utils/useGlobalShare.js';

import styles from './index.module.scss';

function Index() {
  useGlobalShare();
  const uploadUrl = `http://localhost:3001/api${API.COMMON.UPLOAD_URL}`;
  // const uploadUrl = 'https://zhangzhikai.xyz/api/public/file';

  const onStart = () => {
    console.log('start触发');
  };

  const beforeUpload = async files => {
    console.log('beforeUpload files', files);
    return files; // 不过滤
  };

  return (
    <View className={styles.content}>
      <Uploader
        url={uploadUrl}
        autoUpload={true}
        name="file"
        onStart={onStart}
        beforeUpload={beforeUpload}
        style={{
          marginInlineEnd: '10px',
          marginBottom: '10px',
        }}
      />
    </View>
  );
}
export default Index;
