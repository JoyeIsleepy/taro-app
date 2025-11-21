import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.scss";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View className="index">
      <Text>Hello world!</Text>
      <View
        onClick={() => {
          Taro.switchTab({ url: "/pages/home/index" });
        }}
      >
        跳转去tabbar
      </View>
    </View>
  );
}
