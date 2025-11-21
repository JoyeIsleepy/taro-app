export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/home/index",
    "pages/mine/index",
    "pages/orders/index",
    "pages/menuList/index"
  ],
  tabBar: {
    color: "#000410",
    selectedColor: "#ed7006",
    backgroundColor: "#ffffff",
    borderStyle: "white",
    position:'bottom',
    list: [
      {
        pagePath: "pages/home/index",
        text: "首页",
        iconPath: "assets/images/home.png",
        selectedIconPath: "assets/images/home-active.png",
      },
      {
        pagePath: "pages/menuList/index",
        text: "点单", 
      },
      {
        pagePath: "pages/orders/index",
        text: "订单",
        // iconPath: "images/tabbar/order.png",
        // selectedIconPath: "images/tabbar/order-active.png",
      },
      {
        pagePath: "pages/mine/index",
        text: "我的",
        // iconPath: "images/tabbar/user.png",
        // selectedIconPath: "images/tabbar/user-active.png",
      },
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
});
