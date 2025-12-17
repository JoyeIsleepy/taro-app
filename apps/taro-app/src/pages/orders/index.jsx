import React, { useState } from 'react';
import { View } from '@tarojs/components';
import { useDidShow, useDidHide } from '@tarojs/taro';
import styles from './index.module.scss';
function Index() {
  const [active, setActive] = useState(false);

  useDidShow(() => {
    setActive(true);
  });

  useDidHide(() => {
    setActive(false);
  });
  return (
    <View>
      {active && (
        <View className={styles.order} key="tab-orders">
          <View>订单</View>
        </View>
      )}
    </View>
  );
}

export default Index;
