import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import { SideBar, Elevator } from '@nutui/nutui-react-taro';
import styles from './index.module.scss';

function Index() {
  const [value, setValue] = useState(0);
  const list = Array.from(new Array(103).keys());
  const dataList = [
    {
      title: 'A',
      list: [
        {
          name: '安徽',
          id: 1,
        },
      ],
    },
    {
      title: 'B',
      list: [
        {
          name: '北京',
          id: 2,
        },
      ],
    },
    {
      title: 'G',
      list: [
        {
          name: '甘肃',
          id: 31,
        },
        {
          name: '广东',
          id: 32,
        },
        {
          name: '广东',
          id: 33,
        },
        {
          name: '贵州',
          id: 34,
        },
      ],
    },
    {
      title: 'H',
      list: [
        {
          name: '湖南',
          id: 41,
        },
        {
          name: '湖北',
          id: 42,
        },
        {
          name: '湖北',
          id: 43,
        },
        {
          name: '湖南',
          id: 44,
        },
        {
          name: '海南',
          id: 45,
        },
      ],
    },
    {
      title: 'L',
      list: [
        {
          name: '辽宁',
          id: 51,
        },
      ],
    },
    {
      title: 'S',
      list: [
        {
          name: '山东',
          id: 51,
        },
        {
          name: '山西',
          id: 52,
        },
        {
          name: '上海',
          id: 53,
        },
        {
          name: '陕西',
          id: 54,
        },
      ],
    },
  ];
  const onItemClick = (key, item) => {
    console.log(key, JSON.stringify(item));
  };

  const onIndexClick = key => {
    console.log(key);
  };
  return (
    <View className={styles.container}>
      <SideBar value={value} onChange={val => setValue(val)} className="left-bar">
        {list.map(item => (
          <SideBar.Item key={item} title={`Opt ${item + 1}`} />
        ))}
      </SideBar>
      <Elevator
        showKeys={false}
        list={dataList}
        height="100%"
        onItemClick={(key, item) => onItemClick(key, item)}
        onIndexClick={key => onIndexClick(key)}
      >
        <Elevator.Context.Consumer>
          {value => {
            return (
              <>
                <Text>{value?.name}</Text>
                {/* <Fabulous style={{ marginLeft: '4px' }} height={12} /> */}
              </>
            );
          }}
        </Elevator.Context.Consumer>
      </Elevator>
    </View>
  );
}

export default Index;
