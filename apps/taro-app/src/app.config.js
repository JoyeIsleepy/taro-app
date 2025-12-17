export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/mine/index',
    'pages/orders/index',
    'pages/menuList/index',
    'pages/menuManage/index',
  ],
  tabBar: {
    color: '#000410',
    selectedColor: '#ed7006',
    backgroundColor: '#ffffff',
    borderStyle: 'white',
    position: 'bottom',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './assets/images/home.png',
        selectedIconPath: './assets/images/home-active.png',
      },
      {
        pagePath: 'pages/menuList/index',
        text: '点单',
        iconPath: './assets/images/menuList.png',
        selectedIconPath: './assets/images/menuList-active.png',
      },
      {
        pagePath: 'pages/orders/index',
        text: '订单',
        iconPath: './assets/images/orders.png',
        selectedIconPath: './assets/images/orders.png',
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: './assets/images/mine.png',
        selectedIconPath: './assets/images/mine.png',
      },
    ],
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
});
