import React, { useEffect, useState } from 'react';
import { Button, View } from '@tarojs/components';
import { createOrder } from '../../server/order';
import styles from './index.module.scss';

function Index() {
  useEffect(() => {
    // getData();
  }, []);

  async function getData() {
    const res = await createOrder({
      name: 'demoname122',
      walletAddress: '0x1234567890abcdef1234567890abcdef12345555',
      age: 12,
    });
    console.log(res, 'res');
  }

  return (
    <View className={styles.order}>
      <View>home--</View>
      <Button onClick={getData}>创建订单</Button>
    </View>
  );
}

export default Index;
