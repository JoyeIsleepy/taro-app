import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView } from '@tarojs/components';
import { useGlobalShare } from '../../utils/useGlobalShare.js';
import styles from './index.module.scss';

const categories = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  title: `分类 ${i + 5}`,
  modules: Array.from({ length: 5 }, (_, j) => `模块 ${j + 1}`),
  content: `内容区域 ${i + 5}`,
}));

export default function Index() {
  useGlobalShare();

  const [activeId, setActiveId] = useState(0);
  const leftScrollRef = useRef(null);
  const rightRefs = useRef([]);

  const onRightScroll = () => {
    const scrollTop = rightRefs.current[0]?.scrollTop || 0;
    let currentId = 0;

    for (let i = 0; i < rightRefs.current.length; i++) {
      const el = rightRefs.current[i];
      if (el) {
        const { top } = el.getBoundingClientRect();
        if (top <= 100) {
          // 可调整阈值
          currentId = i;
        }
      }
    }

    if (currentId !== activeId) {
      setActiveId(currentId);
      // 同步滚动左侧菜单到对应位置
      scrollLeftTo(currentId);
    }
  };

  // 左侧菜单滚动到指定分类
  const scrollLeftTo = id => {
    const itemHeight = 50; // 每个左侧项的高度（根据你的样式调整）
    if (leftScrollRef.current) {
      leftScrollRef.current.scrollTo({
        top: id * itemHeight,
        animated: true,
      });
    }
  };

  // 点击左侧菜单切换
  const onLeftClick = id => {
    setActiveId(id);
    // 滚动右侧内容到对应区域
    if (rightRefs.current[id]) {
      rightRefs.current[id].scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <View className={styles.container} key="tab-menuList">
      <View className={styles.memberCard}>
        <View className={styles.item}>
          <View className={styles['title-1']}>🌟 zzk会员卡</View>
          <View className={styles['title-2']}>欢迎光临，很高兴为您服务！</View>
        </View>
      </View>

      <View className={styles.contentWrapper}>
        {/* 左侧可滚动菜单 */}
        <ScrollView scrollY className={styles.leftMenu} ref={leftScrollRef}>
          {categories.map(cat => (
            <View
              key={cat.id}
              className={`${styles.leftItem} ${activeId === cat.id ? styles.active : ''}`}
              onClick={() => onLeftClick(cat.id)}
            >
              {cat.title}
            </View>
          ))}
        </ScrollView>

        {/* 右侧内容区（独立滚动） */}
        <ScrollView scrollY className={styles.rightContent} onScroll={onRightScroll}>
          {categories.map((cat, index) => (
            <View
              key={cat.id}
              ref={el => (rightRefs.current[index] = el)} // 收集 ref
              className={styles.section}
            >
              <View className={styles.sectionTitle}>{cat.title}</View>
              <View className={styles.sectionContent}>{cat.content}</View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
