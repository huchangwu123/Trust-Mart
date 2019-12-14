<template>
  <div>
    <div class="top">
      <div class="top-1">
        <van-search placeholder="Montagne jeunesse" v-model="search" />
      </div>
      <div class="top-banner"></div>
    </div>
    <div class="body">
      <div class="content" v-if="i<1" v-for="(con,i) in list" :key="i">
        <span class="logo"></span>
        <h2>{{con.name}}</h2>
        <ul class="clearfix">
          <li v-for="(item,i) in con.list" :key="i" @click="godetails(item.id)">
            <img :src="item.thumbnail" alt />
            <div class="price">
              <span class="newP">{{item.reduct_price}}.00</span>
              <span class="oldP">{{item.original_price}}.00</span>
            </div>
            <p>{{item.name}}</p>
          </li>
        </ul>
      </div>
      <div class="content" v-if="i>=1" v-for="(con,i) in list" :key="i">
        <span class="logo"></span>
        <h2>{{con.name}}</h2>
        <ul class="clearfix">
          <li v-for="(item,i) in con.list" :key="i" @click="godetails(item.id)">
            <img :src="item.thumbnail" alt />
            <p>{{item.name}}</p>
            <div class="price">
              <span class="newP">{{item.reduct_price}}.00</span>
              <span class="oldP">{{item.original_price}}.00</span>
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
      name: "",
      list: []
    };
  },
  methods: {
    godetails(id) {
      // console.log(id);
      this.$router.push("/details?pid=" + id);
    },
  },
  mounted() {
    console.log(JSON.parse(sessionStorage.getItem("info")),"index........")
    this.$http({
        url: "http://yd.msword.top/getIndexData"
      })
      .then(res => {
        // console.log(res);
        this.list = res.data.data;
      })
      .catch(err => {});
  }

};
</script>
<style lang="" scoped>
#app {
  background: #fafafa;
  font-family: "微软雅黑";
}
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
  height: 1rem;
  width: 100%;
  background: url(../assets/img/i-top-1.png);
  background-size: 100% 1rem;
}
.van-field__left-icon {
  float: right;
}
.top-banner {
  height: 4.75rem;
  width: 100%;
  background: url(../assets/img/i-top-2.png);
  background-size: 100% 4.75rem;
}
.content {
  position: relative;
  padding-left: 0.26rem;
}
.content h2 {
  padding-left: 0.5rem;
  height: 0.95rem;
  line-height: 0.95rem;
  font-size: 0.28rem;
  color: #686868;
}
.content .logo {
  position: absolute;
  left: 0.24rem;
  top: 0.24rem;
  display: block;
  width: 0.32rem;
  height: 0.42rem;
  background: url(../assets/img/hot.png);
  background-size: cover;
}
.content ul li {
  width: 2.8rem;
  text-align: center;
  background: #fff;
  padding: 0.4rem 0.25rem 0.2rem;
  float: left;
  margin-right: 0.26rem;
  border: 1px solid #efefef;
}
.content ul li img {
  height: 2.63rem;
  margin-bottom: 0.3rem;
}
.content ul li .price {
  display: flex;
  justify-content: space-between;
}
.content ul li .newP {
  font-size: 0.28rem;
  color: #e60012;
}
.content ul li .oldP {
  font-size: 0.24rem;
  text-decoration: line-through;
  color: #666;
}
.content ul li p {
  height: 1.04rem;
  font-size: 0.28rem;
  line-height: 0.52rem;
  text-align: left;
  color: #666;
  overflow: hidden;
}
.body {
  padding-bottom: 1.2rem;
}
</style>