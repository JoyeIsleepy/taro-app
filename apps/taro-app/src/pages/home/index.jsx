import React, { useEffect, useState } from 'react';
import { View } from '@tarojs/components';
import { createOrder } from '../../server/order';
import styles from './index.module.scss';

function Index() {
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const res = await createOrder({
      name: 'demoname133',
      walletAddress: '0x1234567890abcdef1234567890abcdef12345662',
      age: 12,
    });
    console.log(res, 'res');
  }

  return (
    <View className={styles.order}>
      <View>home--</View>
    </View>
  );
}

export default Index;
