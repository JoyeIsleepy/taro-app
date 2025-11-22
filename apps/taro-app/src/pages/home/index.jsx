import React, { useEffect, useState } from "react";
import { View } from "@tarojs/components";
import { createOrder } from "../../server/order";
import styles from "./index.module.scss";

function Index() {
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const res = await createOrder({ id: 1 });
    console.log(res, "res");
  }

  return (
    <View className={styles.order}>
      <View>home--</View>
    </View>
  );
}

export default Index;
