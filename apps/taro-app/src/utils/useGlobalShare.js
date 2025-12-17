// src/hooks/useGlobalShare.ts
import { useShareAppMessage, useShareTimeline } from '@tarojs/taro';

/**
 * 全局通用分享钩子
 * @param customConfig 页面自定义的分享配置（会覆盖默认配置）
 * @returns 无
 */
export const useGlobalShare = customConfig => {
  // 全局默认分享配置
  const defaultConfig = {
    title: '好运麻辣烫', // 全局默认标题
    path: '/pages/index/index', // 全局默认路径
    // imageUrl: 'https://xxx.com/default-share.jpg', // 全局默认分享图片
  };

  // 合并默认配置和页面自定义配置
  const finalConfig = { ...defaultConfig, ...customConfig };

  // 仅在微信小程序端执行（跨端兼容）
  if (process.env.TARO_ENV === 'weapp') {
    // 分享给好友
    useShareAppMessage(() => finalConfig);

    // 可选：分享到朋友圈的全局配置
    useShareTimeline(() => finalConfig);
  }
};
