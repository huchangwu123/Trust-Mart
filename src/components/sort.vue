<template>
  <div>
    <div class="top">
      <div class="top-1">
        <van-search placeholder="Montagne jeunesse" v-model="search" />
      </div>
      <div class="top-banner"></div>
    </div>
    <div class="content">
      <div class="left">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item v-for="(con,i) in list" :key="i" :title="con.name" @click="rshow(i)"/>
        </van-sidebar>
      </div>
      <div class="rightLsist">
        <ul  v-if="list[num]">
          <li v-for="(item) in  list[num].list" :key="item.id" >
            <img :src="item.thumbnail" alt />
            <div class="title">
              <p>{{item.name}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: "",
      activeKey: "0",
      list:[],
      num:0
    };
  },
  methods:{
    rshow(i){
      this.num=i;
    },
  },
  mounted() {
    this.$http({
      url: "http://yd.msword.top/getClassify"
    })
      .then(res => {
        // console.log(res.data.data);
        this.list = res.data.data;
        // console.log(this.list)
      })
      .catch(err => {});
  }
};
</script>
<style lang="" scoped>
.van-search {
  background: none !important;
  padding: 0.25rem 1.2rem 0;
}
.van-search__content {
  background: rgba(255, 255, 255, 0.6);
  border-radius: 0.05rem;
}
.van-search .van-cell {
  display: flex;
  flex-direction: row-reverse;
}
.van-field__control {
  color: #888;
}
.top-1 {
  height: 1.2rem;
  width: 100%;
  background: #ff9900;
  background-size: 100% 0.95rem;
}
.van-field__left-icon {
  float: right;
}
.van-sidebar-item--select {
  border-left: 5px solid #1d84a7;
  color: #ff9900;
}
.van-sidebar-item,.van-sidebar{
  width: 2.2rem;
}
.content{
    display: flex;
}
.rightLsist ul li {
    float: left;
    width: 2.25rem;
    margin: 0.25rem 0 0.25rem 0.2rem;
    text-align: center;
    line-height: 0.5rem;
    padding-top: 0.12rem;
    border: 2px solid #1d84a7;
    border-radius: 0.05rem;
    color: #fff;
}
.rightLsist ul li img {
  width: 1.65rem;
  height: 1.75rem;
}
.title p {
    background: #1d84a7;
}
</style>