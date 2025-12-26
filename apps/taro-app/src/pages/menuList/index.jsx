import React, { useEffect, useMemo, useState } from 'react';
import { View, ScrollView, Image, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { getProductList } from '@/server/order';
import { categoryType as CATEGORY_ENUM } from '@/utils/enum';
import styles from './index.module.scss';

export default function MenuPage() {
  const [productList, setProductList] = useState([]);
  const [activeCatId, setActiveCatId] = useState('');
  const [loading, setLoading] = useState(true);

  /** ================= 1. 请求数据 ================= */
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getProductList({ current: 1, pageSize: 50 });
      const data = res?.list || res?.result?.list || [];
      setProductList(data);

      const firstCat = data?.[0]?.categoryType?.[0];
      if (firstCat) setActiveCatId(firstCat);
    } catch (e) {
      console.error(e);
      Taro.showToast({ title: '加载失败', icon: 'none' });
    } finally {
      setLoading(false);
    }
  };

  /** ================= 2. 左侧分类 ================= */
  const categories = useMemo(() => {
    const set = new Set();
    productList.forEach(item => {
      item.categoryType?.forEach(c => set.add(c));
    });

    return Array.from(set).map(id => ({
      id,
      title: CATEGORY_ENUM.find(i => i.value === id)?.label || id,
    }));
  }, [productList]);

  /** ================= 3. 右侧商品（筛选后） ================= */
  const filteredProducts = useMemo(() => {
    if (!activeCatId) return productList;
    return productList.filter(item => item.categoryType?.includes(activeCatId));
  }, [productList, activeCatId]);

  if (loading) {
    return (
      <View className={styles.container}>
        <Text>加载中...</Text>
      </View>
    );
  }

  return (
    <View className={styles.container}>
      {/* ================= 顶部会员卡 ================= */}
      <View className={styles.memberCard}>
        <View className={styles.item}>
          <View className={styles['title-1']}>🌟 zzk会员卡</View>
          <View className={styles['title-2']}>欢迎光临，很高兴为您服务！</View>
        </View>
      </View>

      {/* ================= 主体内容 ================= */}
      <View className={styles.content}>
        {/* 左侧分类 */}
        <ScrollView scrollY className={styles.left}>
          {categories.map(cat => (
            <View
              key={cat.id}
              className={`${styles.leftItem} ${activeCatId === cat.id ? styles.active : ''}`}
              onClick={() => setActiveCatId(cat.id)}
            >
              {cat.title}
            </View>
          ))}
        </ScrollView>

        {/* 右侧商品（平铺） */}
        <ScrollView scrollY className={styles.right}>
          {filteredProducts.length === 0 ? (
            <View className={styles.empty}>暂无商品</View>
          ) : (
            filteredProducts.map(item => (
              <View key={item.id} className={styles.product}>
                <Image className={styles.img} src={item.image?.[0]?.url || ''} mode="aspectFill" />
                <View className={styles.info}>
                  <Text className={styles.name}>{item.productName}</Text>
                  <Text className={styles.price}>¥{item.price}</Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
}
