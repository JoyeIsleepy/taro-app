// app.tsx
import { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { useLaunch } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { ConfigProvider } from '@nutui/nutui-react-taro';
import Loading from './components/Loading';
import '@nutui/nutui-react-taro/dist/styles/themes/default.css';
import './app.scss';

function App({ children }) {
  const [loading, setLoading] = useState(false);
  const themeVars = {
    nutuiColorPrimaryIcon: '#ec6606',
    nutuiColorPrimaryStop1: '#ec6606',
    nutuiColorPrimaryStop2: '#ec6606',
  };

  useLaunch(() => {
    console.log('App launched.');
  });

  return <ConfigProvider theme={themeVars}>{children}</ConfigProvider>;
}

export default App;
