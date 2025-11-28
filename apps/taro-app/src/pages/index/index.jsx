import React, { useEffect, useState } from 'react';
import { View } from '@tarojs/components';
import { Animate, Button, Space } from '@nutui/nutui-react-taro';
import { createOrder } from '../../server/order';
import styles from './index.module.scss';

function Index() {
  useEffect(() => {
    // getData();
  }, []);

  async function getData() {
    const res = await createOrder({
      name: 'zzk2',
      walletAddress: '0x1234567890abcdef1234567890abcdef12346555',
      age: 12,
    });
    console.log(res, 'res');
  }

  return (
    <View className={styles.order}>
      <View>home--</View>
      <Animate type="slide-right" action="click">
        <Button type="primary">由右向左划入</Button>
      </Animate>
      <Button onClick={getData}>创建订单</Button>
    </View>
  );
}

export default Index;
