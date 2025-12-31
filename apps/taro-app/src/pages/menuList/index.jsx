import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, ScrollView, Image, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { getProductList } from '@/server/order';
import { categoryType as CATEGORY_ENUM } from '@/utils/enum';
import styles from './index.module.scss';

export default function MenuPage() {
  const [productList, setProductList] = useState([]);
  const [activeCatId, setActiveCatId] = useState('');
  const [loading, setLoading] = useState(true);

  const rightScrollRef = useRef(null);
  const catRefs = useRef({}); // 存储每个分类的 DOM 位置

  /** ================= 1. 请求数据 ================= */
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getProductList({ current: 1, pageSize: 100 });
      const data = res?.list || res?.result?.list || [];
      setProductList(data);

      // 默认选中第一个分类
      const firstCat = data?.[0]?.categoryType?.[0];
      if (firstCat) {
        setActiveCatId(firstCat);
      }
    } catch (e) {
      console.error(e);
      Taro.showToast({ title: '加载失败', icon: 'none' });
    } finally {
      setLoading(false);
    }
  };

  /** ================= 2. 分类数据 ================= */
  const categories = useMemo(() => {
    const set = new Set();
    productList.forEach(item => {
      item.categoryType?.forEach(c => set.add(c));
    });

    return Array.from(set)
      .map(id => ({
        id,
        title: CATEGORY_ENUM.find(i => i.value === id)?.label || '未知分类',
      }))
      .sort((a, b) => a.id - b.id); // 可选：按 ID 排序
  }, [productList]);

  /** ================= 3. 点击左侧 → 右侧滚动 ================= */
  const scrollToCategory = catId => {
    setActiveCatId(catId);
    const nodeId = `cat_${catId}`;
    Taro.createSelectorQuery()
      .select(`#${nodeId}`)
      .boundingClientRect(rect => {
        if (rect && rightScrollRef.current) {
          rightScrollRef.current.scrollTo({
            top: rect.top - 100, // 预留顶部空间
            animated: true,
          });
        }
      })
      .exec();
  };

  /** ================= 4. 右侧滚动 → 左侧高亮 ================= */
  useEffect(() => {
    if (loading || categories.length === 0) return;

    const handleScroll = () => {
      Taro.createSelectorQuery()
        .selectAll('.cat-section')
        .boundingClientRect(rects => {
          if (!rects || rects.length === 0) return;

          const scrollTop = rightScrollRef.current?._scrollTop || 0;
          let current = categories[0].id;

          // 从上到下找第一个在可视区内的分类
          for (const rect of rects) {
            if (rect.top <= 150 && rect.bottom >= 100) {
              const catId = rect.id.replace('cat_', '');
              current = catId;
              break;
            }
          }

          setActiveCatId(current);
        })
        .exec();
    };

    // 初始高亮
    handleScroll();

    // Taro ScrollView 没有原生 scroll 事件，用定时器轮询（小程序常见做法）
    const timer = setInterval(handleScroll, 300);
    return () => clearInterval(timer);
  }, [loading, categories]);

  if (loading) {
    return (
      <View className={styles.container}>
        <Text>加载中...</Text>
      </View>
    );
  }

  return (
    <View className={styles.container}>
      {/* ================= 顶部店铺信息区 ================= */}
      <View className={styles.memberCard}>
        {/* 背景图 */}
        <Image
          src="http://file.zhangzhikai.xyz/order-menu.png"
          mode="widthFix"
          className={styles.banner}
        />
        {/* 蔬菜装饰元素 */}
        <Image
          src="https://img.icons8.com/fluency/60/00C853/coriander.png" // 香菜图标
          className={styles.vegDeco1}
        />
        <Image
          src="https://img.icons8.com/fluency/50/00C853/lotus-root.png" // 藕片图标
          className={styles.vegDeco2}
        />
        <Image
          src="https://img.icons8.com/fluency/40/00C853/green-vegetable.png"
          className={styles.vegDeco3}
        />
        {/* 店铺信息 */}
        <View className={styles.cardContent}>
          {/* 左侧小图 */}
          <Image
            className={styles.cardLogo}
            src="http://file.zhangzhikai.xyz/order-menu.png"
            mode="aspectFill"
          />

          {/* 中间信息 */}
          <View className={styles.cardInfo}>
            <Text className={styles.cardTitle}>好运麻辣烫</Text>
            <Text className={styles.cardDesc}>新鲜现烫 · 荤素随意搭</Text>
            <View className={styles.cardTags}>
              <Text>⭐ 4.9</Text>
              <Text>月售 3289+</Text>
              <Text>30分钟送达</Text>
            </View>
          </View>

          {/* 右侧箭头 */}
          <Text className={styles.arrow}>›</Text>
        </View>
      </View>

      {/* ================= 主内容区 ================= */}
      <View className={styles.content}>
        {/* 左侧分类 */}
        <ScrollView scrollY className={styles.left}>
          {categories.map(cat => (
            <View
              key={cat.id}
              className={`${styles.leftItem} ${activeCatId === cat.id ? styles.active : ''}`}
              onClick={() => scrollToCategory(cat.id)}
            >
              {cat.title}
            </View>
          ))}
        </ScrollView>

        {/* 右侧商品列表 */}
        <ScrollView scrollY className={styles.right} ref={rightScrollRef} scrollWithAnimation>
          {categories.map(cat => {
            const items = productList.filter(p => p.categoryType?.includes(cat.id));
            if (items.length === 0) return null;

            return (
              <View
                key={cat.id}
                id={`cat_${cat.id}`}
                className={`${styles.catSection} cat-section`}
              >
                <View className={styles.catTitle}>{cat.title}</View>
                {items.map(item => (
                  <View key={item.id} className={styles.product}>
                    <View className={styles.imgWrap}>
                      <Image
                        src={
                          item.image?.[0]?.url ||
                          'https://via.placeholder.com/90/FF6B35/ffffff?text=菜品'
                        }
                        mode="aspectFill"
                        className={styles.img}
                      />
                      {/* 热门角标 */}
                      {item.isHot && <Text className={styles.hotTag}>热</Text>}
                    </View>
                    <View className={styles.info}>
                      <Text className={styles.name}>{item.productName}</Text>
                      {item.description && <Text className={styles.desc}>{item.description}</Text>}
                      <Text className={styles.price}>¥{item.price}</Text>
                    </View>
                    <View className={styles.addBtn}>+</View>
                  </View>
                ))}
              </View>
            );
          })}
        </ScrollView>
      </View>

      {/* ================= 底部结算栏 ================= */}
      <View className={styles.footer}>
        <View className={styles.selectedWrap}>
          <Text className={styles.selectedText}>已选 12份</Text>
        </View>
        <View className={styles.priceWrap}>
          <Text className={styles.totalPrice}>总计 ¥68</Text>
        </View>
        <View className={styles.payBtn}>去结算</View>
      </View>
    </View>
  );
}
