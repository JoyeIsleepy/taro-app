import React, { useState } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { Button, Cell } from '@nutui/nutui-react-taro';
import { ArrowRight, User } from '@nutui/icons-react-taro';
import mineBg from '@/assets/images/mine-bg.png';
import unnamed from '@/assets/images/unnamed.png';
import styles from './index.module.scss';
function Index() {
  return (
    <View className={styles.mine}>
      <Image src={mineBg} className={styles.bgImage} mode="widthFix" />
      <View className={styles.topImg}>
        <Image src={unnamed} className={styles.unnamedImage} />
        <Text>Hey,上午好！</Text>
      </View>
      <View className={styles.memberCard}>
        <View className={styles.item}>
          <View className={styles['title-1']}>zzk会员卡</View>
          <View className={styles['title-2']}>限时享大礼包</View>
        </View>
        <Button type="primary">免费入会</Button>
      </View>

      <View className={styles.infoSection}>
        <View className={styles['title-1']}>我的功能</View>

        <Cell.Group>
          <Cell
            title={
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <User style={{ marginRight: 5 }} />
                我是标题
              </View>
            }
            extra={<ArrowRight />}
          />
          <Cell
            title={
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <User style={{ marginRight: 5 }} />
                我是标题
              </View>
            }
            extra={<ArrowRight />}
          />
          <Cell
            title={
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <User style={{ marginRight: 5 }} />
                我是标题
              </View>
            }
            extra={<ArrowRight />}
          />
        </Cell.Group>
      </View>
    </View>
  );
}

export default Index;
