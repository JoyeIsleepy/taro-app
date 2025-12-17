// app.tsx
import { useLaunch } from '@tarojs/taro'; 
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

  return <ConfigProvider theme={themeVars}>{children}</ConfigProvider>;
}

export default App;
