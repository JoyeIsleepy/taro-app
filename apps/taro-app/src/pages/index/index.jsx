import React, { useEffect, useState } from 'react';
import { View } from '@tarojs/components';
import { Button } from '@nutui/nutui-react-taro';
import { createOrder } from '../../server/order';
import { useGlobalShare } from '../../utils/useGlobalShare.js';

import styles from './index.module.scss';

function Index() {
  useGlobalShare();

  async function getData() {
    const res = await createOrder({
      name: 'zzk2',
      walletAddress: '0x1234567890abcdef1234567890abcdef12346555',
      age: 12,
    });
    console.log(res, 'res');
  }

  return (
    <View className={styles.home} key="tab-index">
      <View>home--</View>
      <Button onClick={getData}>创建订单</Button>
    </View>
  );
}
export default Index;
