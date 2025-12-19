import React from 'react';
import { View, Image, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Cell, Button } from '@nutui/nutui-react-taro';
import { QrCode, ArrowRight } from '@nutui/icons-react-taro';
import styles from './index.module.scss';

function Index() {
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
          <Cell extra={<ArrowRight />} onClick={jumpManage}>
            <View slot="title" className={styles.cellTitle}>
              <QrCode className={styles.icon} />
              <Text>菜单管理</Text>
            </View>
          </Cell>

          <Cell extra={<ArrowRight />}>
            <View slot="title" className={styles.cellTitle}>
              <QrCode className={styles.icon} />
              <Text>我是标题</Text>
            </View>
          </Cell>

          <Cell extra={<ArrowRight />}>
            <View slot="title" className={styles.cellTitle}>
              <QrCode className={styles.icon} />
              <Text>我是标题</Text>
            </View>
          </Cell>
        </Cell.Group>
      </View>
    </View>
  );
}

export default Index;
