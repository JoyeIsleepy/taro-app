import React, { useState } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import {
  Button,
  ConfigProvider,
  TextArea,
  Dialog,
} from "@nutui/nutui-react-taro";
import enUS from "@nutui/nutui-react-taro/dist/locales/en-US";
import zhCN from "@nutui/nutui-react-taro/dist/locales/zh-CN";
import "./index.scss";
function Index() {
  const [locale, setLocale] = useState(zhCN);
  const localeKey = locale === zhCN ? "zhCN" : "enUS";
 
  const handleSwitchLocale = () => {
    Taro.switchTab({
      url: "/pages/home/index",
    });
  };
  return (
    <ConfigProvider locale={locale}>
      <View className="nutui-react-demo">
        <View>
          <Button type="primary" onClick={handleSwitchLocale}>
            点击跳转
          </Button>
        </View>
      </View>
    </ConfigProvider>
  );
}

export default Index;
