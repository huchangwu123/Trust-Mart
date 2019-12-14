<template>
  <div>
    <div class="shopping_all"></div>
    <!-- 轮播 -->
    <div class="lb">
      <div class="swiper-container" v-if="lbisshow">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(con,i) in json.swiperImgArr" :key="i">
            <img :src="con" alt />
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <div class="shopping2-top">
        <div class="goback" @click="goback()"></div>
        <div class="car"></div>
        <div class="more"></div>
      </div>
    </div>
    <!-- 信息 -->
    <div class="inform">
      <div class="inform_top">
        <div class="zi">{{json.name}}</div>
        <div class="tu">收藏</div>
      </div>
      <div></div>
      <div class="inform_bottom clearfix">
        <div class="price_left">
          <p class="newprice">￥{{json.reduct_price}}.00</p>
          <p class="oldprice">￥{{json.original_price}}.00</p>
        </div>
        <div class="right">
          <p class="discount">
            <span>{{(json.allowance*10).toFixed(2)}}折</span>
            <span>{{json.isFreeShip?'包邮':'自付'}}</span>
          </p>
          <p class="advantage">
            <span v-for="(con,i) in json.describe" :key="i">{{con}}</span>
          </p>
        </div>
      </div>
    </div>
    <!-- 详情 -->
    <div class="details clearfix">
      <div class="tab clearfix">
        <span class="details_goods" :class="tag=='one'?'tabActive':''" @click="tag='one'">商品详情</span>
        <span class="buyer" :class="tag=='two'?'tabActive':''" @click="tag='two'">买家口碑</span>
      </div>
      <!-- 判断   引入组件 -->
      <div :is="tag" :json="json"></div>
    </div>

    <div class="foot_shopping">
      <div class="allPrice">
        <span>总价</span>:￥{{aPrice}}.00
      </div>
      <div class="addCar" @click="addcar">加入购物车</div>
      <div class="buy" @click="goCar">确定</div>
    </div>

    <!-- 立即购买 -->
    <!-- 遮罩 -->
    <div class="shade" v-show="isShow"></div>
    <div class="buyWwindow" v-show="isShow">
      <div class="goodsImage" v-if="json.swiperImgArr"><img :src="json.swiperImgArr[0]" alt=""></div>
      <div class="by_Top">
        <p class="price">￥{{json.reduct_price}}.00</p>
        <p>库存{{json.total}}件</p>
        <p>请选择商品属性</p>
        <div class="close" @click="close"></div>
      </div>
      <div class="by_Top_con"  v-if="json.buySelect">
        <div class="num">
          <p>购买数量</p>
          <div>
            <van-stepper v-model="goodsNum"/>
          </div>
          
        </div>
        <div >
             <h2>{{json.buySelect[0].name}}</h2>
          <div>
            <span class="dx" v-for="(size,index) in json.buySelect[0].list" :key="size" @click="sizeNum=index" :class="sizeNum==index? 'dxActive':''">{{size}}</span>
          </div>
        </div>
        <div >
             <h2>{{json.buySelect[1].name}}</h2>
          <div>
            <span class="dx" v-for="(age,index) in json.buySelect[1].list" :key="age" @click="ageNum=index" :class="ageNum==index? 'dxActive':''">{{age}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "../../node_modules/swiper/js/swiper.min.js";
import Swiper from "swiper";
import two from "./buyersM.vue";
import one from "./detailsImg.vue";

export default {
  data() {
    return {
      tag: "one",
      isShow: false,
      json: [],
      sizeNum:0,
      ageNum:0,
      allPrice:0,
      goodsNum:1,
      lbisshow:false
    };
  }, 
  computed:{
    aPrice(){
      return this.goodsNum*this.json.reduct_price
    },
    gogack(){
      this.$router.go("-1")
    }
  },
  methods: {
    addcar() {
      this.isShow = true;
    },
    close() {
      this.isShow = false;
    },
    mySwiper() {
      let swiper = new Swiper(".swiper-container", {
        pagination: {
          el: ".swiper-pagination"
        }
      });
    },
    goback(){
      this.$router.go("-1");
    },
    goCar(){
      let arr = []
      let obj={
        goodsname:this.json.name,
        size:this.json.buySelect[0].list[this.sizeNum],
        age:this.json.buySelect[1].list[this.ageNum],
        price:this.json.reduct_price,
        imgUrl:this.json.swiperImgArr[0],
        ischeck:false,
        goodsNum:this.goodsNum
      }
      if(localStorage.getItem("arrCar")){
        // console.log("有值")
        arr=JSON.parse(localStorage.getItem("arrCar"))
        arr.push(obj)
        localStorage.setItem('arrCar',JSON.stringify(arr))
        this.$router.push("/shopping")
      }else{
        // console.log("没值")
        arr.push(obj)
        localStorage.setItem('arrCar',JSON.stringify(arr))
        this.$router.push("/shopping")
      }
      // console.log(obj)
      
    },
    init(){
      this.$http({
        url: "http://yd.msword.top/getDetails",
        params: {
          pid: this.$route.query.pid
        }
      })
      .then(res => {
        this.json = res.data.data;
        // console.log(this.json, "resssss");
        this.$nextTick(() => {
          this.mySwiper();
        });
      })
      .catch(err => {});
    }
  },
  mounted() {
    this.init()
    
  },
  activated(){
    this.tag="one",
    this.isShow= false,
    this.json= [],
    this.sizeNum=0,
    this.ageNum=0,
    this.allPrice=0,
    this.goodsNum=1
    this.lbisshow=false
    this.init()
    this.$http({
        url: "http://yd.msword.top/getDetails",
        params: {
          pid: this.$route.query.pid
        }
      })
      .then(res => {
        this.json = res.data.data;
        // console.log(this.json, "resssss");
        this.lbisshow=true
        this.$nextTick(() => {
          this.mySwiper();
        });
      })
      .catch(err => {});
  },
  components: {
    one,
    two
  }
};
</script>
<style >
@import "../../node_modules/swiper/css/swiper.min.css";
.shopping_all {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #eee;
  z-index: -1;
}
.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  text-align: center;
  font-size: 0.18rem;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.swiper-container-horizontal > .swiper-pagination-bullets,
.swiper-pagination-custom,
.swiper-pagination-fraction {
  bottom: 0.3rem;
}
.lb {
  position: relative;
  border-bottom: 1px solid #eeeeee;
}
.lb img {
  height: 4.85rem;
  padding: 0.3rem 0;
}
.shopping2-top {
  position: fixed;
  left: 0.2rem;
  top: 0.2rem;
  z-index: 999;
  display: flex;
  justify-content: space-between;
}
.lb .goback,
.car,
.more {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 100%;
}
.lb .goback {
  background: #b2b2b2 url(../assets/img/goback.png) no-repeat 0.15rem 0.08rem;
  background-size: 0.25rem auto;
}
.lb .car {
  background: #b2b2b2 url(../assets/img/car.png) no-repeat 0.1rem 0.1rem;
  background-size: 0.4rem auto;
  margin: 0 0.4rem 0 4.9rem;
}
.lb .more {
  background: #b2b2b2 url(../assets/img/more.png) no-repeat 0.15rem 0.25rem;
  background-size: 0.3rem auto;
}
.inform {
  background: #fff;
  padding-left: 0.25rem;
  padding-bottom: 0.2rem;
  margin-bottom: 0.3rem;
}
.inform_top {
  display: flex;
  justify-content: space-between;
  font-size: 0.3rem;
}
.inform_top .zi {
  padding-right: 0.5rem;
  line-height: 0.5rem;
  font-size: 0.3rem;
  color: #333333;
  font-weight: bold;
}
.inform_top .tu {
  width: 0.65rem;
  padding: 0 0.28rem;
  font-size: 0.12rem;
  color: red;
  padding-top: 0.5rem;
  background: url(../assets/img/sc.png) no-repeat 0.3rem 0;
  background-size: 0.4rem 0.4rem;
  border-left: 1px solid #dddddd;
  margin: 0.08rem 0;
}
.inform_bottom {
  padding-right: 0.25rem;
}
.price_left {
  float: left;
}
.inform_bottom .right {
  margin-left: 0.2rem;
  float: left;
}
.inform_bottom .newprice {
  color: #eb2222;
  font-size: 0.34rem;
  margin-top: 0.1rem;
}
.inform_bottom .oldprice {
  color: #999;
  font-size: 0.24rem;
  text-decoration: line-through;
  line-height: 0.4rem;
}
.discount span,
.advantage span {
  display: inline-block;
  padding: 0 0.1rem;
  line-height: 0.3rem;
  margin-left: 0.1rem;
}
.discount span {
  background: #ff9900;
  color: #fff;
  margin-bottom: 0.2rem;
}
.advantage span {
  border: 1px solid #ff9900;
  color: #ff9900;
}
.details {
  background: #fff;
  padding: 0 0.45rem;
  padding-top: 0.12rem;
  margin-bottom: 1rem;
}
.details .tab .details_goods,
.buyer {
  color: #999;
  font-size: 0.26rem;
  line-height: 0.46rem;
  padding: 0 0.22rem;
  margin-bottom: 0.26rem;
}
.details .tab .details_goods {
  float: left;
  margin-left: 0.65rem;
}
.details .tab .buyer {
  float: right;
  margin-right: 0.65rem;
}
.tabActive {
  border-bottom: 2px solid #ff9900;
  color: #ff9900 !important;
}

.foot_shopping {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 1rem;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: space-between;
  line-height: 1rem;
  z-index: 99999;
}
.allPrice {
  width: 3.5rem;
  padding-left: 0.3rem;
  font-size: 0.3rem;
  color: #eb2222;
}
.allPrice span {
  color: #666;
}
.addCar {
  background: #ff9900;
}
.buy {
  background: #eb2222;
}
.addCar,
.buy {
  text-align: center;
  width: 2rem;
  font-size: 0.3rem;
  color: #fff;
}
.color {
  background: #ff9900 !important;
}

.shade {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background: rgba(0, 0, 0, 0.3);
}
.buyWwindow {
  z-index: 999;
  position: fixed;
  bottom: 1rem;
  left: 0;
  background: #fff;
  padding-bottom: 0.4rem
}
.goodsImage {
  background: none;
  border: 3px solid #999;
  border-radius: 5px;
  position: absolute;
  left: 0.42rem;
  top: -0.25rem;
}
.goodsImage img{
  width: 1.95rem;
  height: 1.95rem;
  }
.by_Top {
  padding: 0.6rem 2.9rem 0.5rem 2.82rem;
}
.by_Top .price {
  color: #eb2222;
  font-size: 0.3rem;
  line-height: 0.3rem;
}
.by_Top p {
  color: #333;
  font-size: 0.25rem;
  line-height: 0.3rem;
}
.close {
  width: 0.56rem;
  height: 0.56rem;
  background: url(../assets/img/close.png) no-repeat;
  background-size: 0.56rem 0.56rem;
  position: absolute;
  right: 0.28rem;
  top: 0.46rem;
}
.by_Top_con {
  padding: 0 0.45rem;
  color: #333;
  font-size: 0.3rem;
}
.nl {
  margin-bottom: 0.44rem;
}
.num {
  display: flex;
  justify-content: space-between;
}
.num p {
  line-height: 0.55rem;
}
.by_Top_con h2 {
  line-height: 0.8rem;
}
.by_Top_con span {
  display: inline-block;
  padding: 0 0.4rem;
  line-height: 0.45rem;
  background: #dddddd;
  border-radius: 0.1rem;
  margin-left: 0.2rem
}
.dxActive{
  background: #ff9900 !important;
  color: #fff !important;
}
</style>