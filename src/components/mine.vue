<template>
  <div>
    <div class="all">
      <div class="top">
        <div class="top_left" @click="tc"></div>
        <div class="top_con">个人中心</div>
        <div class="top_right">
        </div>
      </div>
      <div class="topMain">
        <div class="tx">
          <div class="circle">
            <img :src="this.info[0].img" alt="">  
          </div><a @click="gologin">{{this.info[0].name}}</a> 
        </div>
      </div>
      <div class="collect">
        <p>我的收藏</p>
      </div>
      <div class="myOrder"> 
        <p>我的订单</p>
        <p class="allOrder">查看全部订单</p>
      </div>
      <div class="orderList">
        <div class="obligation">
          <p>待付款</p>
        </div>
        <div class="prepare">
          <p>待发货</p>
        </div>
        <div class="icon_consignee">
          <p>待收货</p>
        </div>
        <div class="icon_evaluate">
          <p>待评价</p>
        </div>
        <div class="icon_refund">
          <p>退款/售后</p>
        </div>
      </div>
      <div class="address">
        <p>收货地址管理</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      info:[
        {
          img:"",
          name:"点击登录"
        }
      ]
    }
  },
  mounted(){
    let arr =[]
    if(sessionStorage.getItem("info")){
      arr=JSON.parse(sessionStorage.getItem("info"))
      this.info=arr
      console.log(this.info)
    }else{

    }
  },
  methods:{
    tc(){
      sessionStorage.removeItem("info")
      this.info=[
        {
          img:"",
          name:"点击登录"
        }
      ]
    },
    gologin(){
      this.$router.push("/login")
    }
  }
};
</script>
<style lang="" scoped>
.all {
  background: #f3f3f3;
  position: fixed;
  height: 100%;
}
.top {
  background: #ff9900;
  color: #fff;
  height: 0.55rem;
  padding: 0.24rem 0 0.16rem;
  display: flex;
  justify-content: space-between;
}
.top_left {
  width: 1.5rem;
  height: 0.55rem;
  background: url(../assets/img/set.png) no-repeat 0.28rem 0;
  background-size: auto 0.55rem;
}
.top_con {
  width: 4.5rem;
  text-align: center;
  font-size: 0.4rem;
  line-height: 0.55rem;
}
.top_right {
  width: 1.5rem;
  height: 0.55rem;
  background: url(../assets/img/news.png) no-repeat 0.4rem 0;
  background-size: auto 0.55rem;
}
.topMain {
  height: 2.3rem;
  background: #ff9900;
  position: relative;
}
.tx {
  text-align: center;
  position: absolute;
  top: 1.05rem;
  left: 2.6rem;
  color: #333;
}
.circle {
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 100%;
  background: #e6dfdf;
  border: 0.1rem solid #fff;
}
.circle  img{
    width: 2.1rem;
    height: 2.1rem;
    border-radius: 100%;
}
.tx {
  line-height: 0.64rem;
  font-size: 0.32rem;
}
.collect{
  padding-top:1.6rem;
  height: 1.15rem;
  background: #fafafa;
  margin-bottom: 0.1rem;
}
.collect p{
  padding-left: 0.9rem;
  font-size: 0.34rem;
  height: 1.15rem;
  line-height: 1.15rem;
  background: url(../assets/img/collect.png)no-repeat 0.2rem 0.38rem;
  background-size: auto 0.46rem;
  font-weight: bolder
}
.myOrder{
  background: #fafafa;
  height: 1.24rem;
  display: flex;
  border-bottom: 1px solid #b3b3b3;
}
.myOrder p {
  line-height: 1.24rem;
  font-size: 0.34rem;
  padding-left: 0.5rem;
  color:#333333;
  font-weight: bolder;
}
.myOrder .allOrder{
  margin-left: 1.24rem;
  color:#999;
  font-weight:normal;
}
.orderList{
  display: flex;
  background: #fafafa;
  padding: 0 0.3rem;
  justify-content: space-between;
  margin-bottom: 0.16rem;
}
/* .orderList .obligation,.prepare,.icon_consignee,.icon_evaluate,.icon_refund p{ */
.orderList  p{
  padding: 1.2rem 0 0.45rem;
  font-size: 0.24rem;
  color: #bababa;
}
.orderList .obligation p{
  background: url(../assets/img/icon_boligation.png)no-repeat 0.08rem 0.4rem;
  background-size: 0.55rem 0.48rem
}
.orderList .prepare p{
  background: url(../assets/img/prepare.png)no-repeat 0.08rem 0.4rem;
  background-size: 0.59rem 0.47rem
}
.orderList .icon_consignee p{
  background: url(../assets/img/icon_consignee.png)no-repeat 0.08rem 0.4rem;
  background-size: 0.52rem 0.47rem
}
.orderList .icon_evaluate p{
  background: url(../assets/img/icon_evaluate.png)no-repeat 0.08rem 0.4rem;
  background-size: 0.59rem 0.47rem
}
.orderList .icon_refund p{
  background: url(../assets/img/icon_refund.png)no-repeat 0.2rem 0.4rem;
  background-size: 0.54rem 0.48rem
}
.address{
  height: 1.28rem;
  background: #fafafa;
  line-height: 1.28rem;
  font-size: 0.33rem;
  padding-left: 0.4rem;
  color: #999;
}
</style>