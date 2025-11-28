import { useLaunch } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { ConfigProvider } from '@nutui/nutui-react-taro';
import './app.scss';

function App({ children }) {
  const themeVars = {
    nutuiColorPrimaryIcon: '#ec6606',
    nutuiColorPrimaryStop1: '#ec6606',
    nutuiColorPrimaryStop2: '#ec6606',
  };

  useLaunch(() => {
    console.log('App launched.');
  });

  // children 是将要会渲染的页面
  return <ConfigProvider theme={themeVars}>{children}</ConfigProvider>;
}

export default App;
