import React, { useState } from 'react';
import { View, Image, Text } from '@tarojs/components';
import { Button, Cell } from '@nutui/nutui-react-taro'; 
import { ArrowRight, QrCode } from '@nutui/icons-react'
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
function Index() {
  const renderCellTitle = text => (
    <View className={styles.cellTitle}>
      <QrCode className={styles.icon} />
      <Text>{text}</Text>
    </View>
  );

  function jumpManage() {
    Taro.navigateTo({
      url: '/pages/menuManage/index',
    });
  }

  return (
    <View className={styles.mine} key="tab-mine">
      {/* 背景图 */}
      <Image
        src="http://file.zhangzhikai.xyz/mine-bg.png"
        className={styles.bgImage}
        mode="widthFix"
        lazyLoad
      />

      {/* 顶部信息 */}
      <View className={styles.topImg}>
        <Image
          src="http://file.zhangzhikai.xyz/unnamed.png"
          className={styles.unnamedImage}
          lazyLoad
        />
        <Text>Hey，上午好！</Text>
      </View>

      {/* 会员卡 */}
      <View className={styles.memberCard}>
        <View className={styles.item}>
          <View className={styles['title-1']}>好运麻辣烫</View>
          <View className={styles['title-2']}>限时享大礼包</View>
        </View>
        <Button type="primary">免费入会</Button>
      </View>

      {/* 功能区 */}
      <View className={styles.infoSection}>
        <View className={styles['title-1']}>我的功能</View>

        <Cell.Group>
          <Cell title={renderCellTitle('菜单管理')} extra={<ArrowRight />} onClick={jumpManage} />
          <Cell title={renderCellTitle('我是标题')} extra={<ArrowRight />} />
          <Cell title={renderCellTitle('我是标题')} extra={<ArrowRight />} />
        </Cell.Group>
      </View>
    </View>
  );
}

export default Index;
