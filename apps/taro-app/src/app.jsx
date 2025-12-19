// app.tsx
import '@nutui/nutui-react-taro/dist/style.css';
import { useLaunch } from '@tarojs/taro';
import { ConfigProvider } from '@nutui/nutui-react-taro';
import './app.scss';

function App({ children }) {
  useLaunch(() => {
    console.log('App launched.');
  });

  const theme = {
    'nutui-form-item-label-font-size': '14px',
  };

  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
}

export default App;
