import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { SideBar } from '@nutui/nutui-react-taro';
import styles from './index.module.scss';

export default function Index() {
  const sectionTops = useRef([]); // 各区块顶部位置
  const [value, setValue] = useState(0); // 侧边栏选中项
  const list = Array.from(new Array(20).keys()); // 20项
  const [scrollIntoView, setScrollIntoView] = useState('');

  useEffect(() => {
    // 页面渲染后计算区块位置
    Taro.nextTick(() => {
      const query = Taro.createSelectorQuery();
      list.forEach(item => {
        query.select(`#section-${item}`).boundingClientRect();
      });
      query.exec(res => {
        sectionTops.current = res.map(r => r.top);
      });
    });
  }, []);

  // 点击左侧
  const handleSideClick = index => {
    setValue(index);
    setScrollIntoView(`section-${index}`);
  };

  // 监听右侧滚动
  const handleRightScroll = e => {
    const scrollTop = e.detail.scrollTop;

    for (let i = 0; i < sectionTops.current.length - 1; i++) {
      if (scrollTop >= sectionTops.current[i] && scrollTop < sectionTops.current[i + 1]) {
        setValue(i);
        return;
      }
    }
    // 滚动到最后
    setValue(sectionTops.current.length - 1);
  };

  return (
    <View className={styles.container}>
      <View className={styles.memberCard}>
        <View className={styles.item}>
          <View className={styles['title-1']}>zzk会员卡</View>
          <View className={styles['title-2']}>限时享大礼包</View>
        </View>
        <View type="primary">免费入会</View>
      </View>

      {/* 左侧菜单 */}
      {/* <SideBar value={value} onChange={handleSideClick} className={styles.leftBar}>
        {list.map(item => (
          <SideBar.Item key={item} title={`分类 ${item + 1}`} />
        ))}
      </SideBar> */}

      {/* 右侧内容 */}
      {/* <ScrollView
        id="rightScroll"
        scrollY
        className={styles.rightContent}
        scrollIntoView={scrollIntoView}
        onScroll={handleRightScroll}
      >
        {list.map(item => (
          <View
            id={`section-${item}`}
            className={styles.section}
            key={item}
            style={{ height: '400px' }}
          >
            <View className={styles.sectionTitle}>模块 {item + 1}</View>
            <View className={styles.sectionBody}>内容区域 {item + 1}</View>
          </View>
        ))}
      </ScrollView> */}
    </View>
  );
}
