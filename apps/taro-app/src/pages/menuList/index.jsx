import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { SideBar } from '@nutui/nutui-react-taro';
import styles from './index.module.scss';

export default function Index() {
  const sectionTops = useRef([]); // 记录相对 ScrollView 的 top
  const [value, setValue] = useState(0);
  const list = Array.from(new Array(20).keys());
  const [scrollIntoView, setScrollIntoView] = useState('');

  useEffect(() => {
    Taro.nextTick(() => {
      const query = Taro.createSelectorQuery();

      list.forEach(item => {
        // 注意：需要选择 scroll-view 内部的 section
        query.select(`#section-${item}`).boundingClientRect();
      });

      query.select('#rightScroll').boundingClientRect(); // 获取 scroll-view 自身位置
      query.exec(res => {
        const scrollViewTop = res.pop().top; // 最后一个是 scroll-view 的 rect

        // 把每个区块的 "相对 scroll-view 的位置" 算出来
        sectionTops.current = res.map(r => r.top - scrollViewTop);
      });
    });
  }, []);

  // 左侧点击
  const handleSideClick = index => {
    setValue(index);
    setScrollIntoView(`#section-${index}`);
  };

  // 右侧滚动
  const handleRightScroll = e => {
    const scrollTop = e.detail.scrollTop;

    for (let i = 0; i < sectionTops.current.length - 1; i++) {
      if (scrollTop >= sectionTops.current[i] && scrollTop < sectionTops.current[i + 1]) {
        if (value !== i) setValue(i);
        return;
      }
    }

    setValue(sectionTops.current.length - 1);
  };

  return (
    <View className={styles.container}>
      <View className={styles.memberCard}>
        <View className={styles.item}>
          <View className={styles['title-1']}>🌟 zzk会员卡</View>
          <View className={styles['title-2']}>欢迎光临，很高兴为您服务！</View>
        </View>
      </View>

      <View className={styles.contentWrapper}>
        <SideBar value={value} onChange={handleSideClick} className={styles.leftBar}>
          {list.map(item => (
            <SideBar.Item key={item} title={`分类 ${item + 1}`} />
          ))}
        </SideBar>

        <ScrollView
          id="rightScroll"
          scrollY
          className={styles.rightContent}
          scrollIntoView={scrollIntoView}
          onScroll={handleRightScroll}
        >
          {list.map(item => (
            <View
              id={`section-${item}`}
              key={item}
              className={styles.section}
              style={{ height: '400px' }}
            >
              <View className={styles.sectionTitle}>模块 {item + 1}</View>
              <View className={styles.sectionBody}>内容区域 {item + 1}</View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
