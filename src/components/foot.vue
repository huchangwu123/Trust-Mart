<template>
  <div>
    <router-view></router-view>
    <!-- <van-tabbar v-model="active" active-color="#ff9900" inactive-color="#666">
            <van-tabbar-item to="/index" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item to="/sort" icon="search">分类</van-tabbar-item>
            <van-tabbar-item to="/shopping" icon="friends-o">购物车</van-tabbar-item>
            <van-tabbar-item to="/mine" icon="setting-o">个人中心</van-tabbar-item>
    </van-tabbar>-->

    <van-tabbar v-model="active" route active-color="#ff9900" inactive-color="#666">
      <van-tabbar-item info="" to="/index">
        <span>首页</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.active : icon.inactive" />
      </van-tabbar-item>
      <van-tabbar-item info=""  to="/sort">
        <span>分类</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.active1 : icon.inactive1" />
      </van-tabbar-item>
      <van-tabbar-item info="" to="/shopping">
        <span>购物车</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.active2 : icon.inactive2" />
      </van-tabbar-item>
      <van-tabbar-item info="" to="/mine">
        <span>我的</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.active3 : icon.inactive3" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      icon: {
        active: require("../assets/img/tab_home_hig.png"),
        inactive:require("../assets/img/tab_home_nor.png"),
        active1: require("../assets/img/tab_menu_hig.png"),
        inactive1:require("../assets/img/tab_menu_nor.png"),
        active2: require("../assets/img/tab_shopping_hig.png"),
        inactive2:require("../assets/img/tab_shopping_nor.png"),
        active3: require("../assets/img/tab_me_hig.png"),
        inactive3:require("../assets/img/tab_me_nor.png"),
      }
    };
  }
};
</script>
<style lang="">
</style>