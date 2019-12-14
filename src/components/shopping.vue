<template>
  <div>
    <van-nav-bar
      title="购物车"
      left-text="返回"
      left-arrow
      @click-left="goback"
      @click-right="Register"
    />
    <div v-show="showCar" ref="sx">
      <div class="all"></div>
      <div class="shoppingCar">
        <ul v-if="json">
          <li v-for="(con,i) in json" :key="i">
            <p class="address">杭州保税区仓</p>
            <div class="main" ref="delMove" @touchstart="start($event,i)"  @touchmove="move($event,i)">
              <van-checkbox @click="istrue(i)">
                <img
                  slot="icon"
                  :src="!json[i].ischeck ? activeIcon : inactiveIcon"
                />
              </van-checkbox>
              <div class="mainImg">
                <img :src="json[i].imgUrl" alt />
              </div>
              <div class="name">
                <p class="van-ellipsis">{{json[i].goodsname}}</p>
                <p>
                  <span>型号:{{json[i].age}}</span>&nbsp;&nbsp;&nbsp;
                  <span>{{json[i].size}}</span>
                </p>
                <van-stepper  v-model="json[i].goodsNum"/>
              </div>
              <p class="main_price">￥{{json[i].price}}.00</p>
              <div class="del" @click="delFromCar(i)">删除</div>
            </div>
          </li>
        </ul>
        <div class="shoppingCar_foot">
          <div class="allChacked">
            <div class="center">
              <van-checkbox v-model="checked" @click="isAc()">
                <img
                  slot="icon"
                  :src="!isAllCheck ? activeIcon1 : inactiveIcon1"
                />
              </van-checkbox>
              <p>全选</p>
            </div>
          </div>
          <div class="editor">
            <div class="center">
              <van-checkbox v-model="checked" @click="isE">
                <img
                  slot="icon"
                  :src="!iseditor ? activeIcon2 : inactiveIcon2"
                />
              </van-checkbox>
              <p>编辑</p>
            </div>
          </div>
          <div class="allPrice">
            <p>合计:￥{{allP}}:00</p>
            <p>(不含运费)</p>
          </div>
          <div class="account">去结算</div>
        </div>
      </div>
    </div>

    <div v-show="!showCar">
      <div class="con">
        <div class="conMain">
          <img src="../assets/img/shopping_wu.png" alt />
          <p>购物车还是空的 快去逛逛吧~</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checked: true,
      activeIcon: require("../assets/img/radio_nor.png"),
      inactiveIcon: require("../assets/img/radio_hig.png"),
      checked1: false,
      activeIcon1: require("../assets/img/noChacked.png"),
      inactiveIcon1: require("../assets/img/allChacked.png"),
      checked2: false,
      activeIcon2: require("../assets/img/editor_nor.png"),
      inactiveIcon2: require("../assets/img/editor_hig.png"),
      showCar: false,
      json: [],
      ischeck:false,
      isAllCheck:false,
      iseditor:false,
      startX:"",
      moveX:""
    };
  },
  mounted() {
    if (JSON.parse(localStorage.getItem("arrCar"))!="") {
      this.showCar = true;
      this.json = JSON.parse(localStorage.getItem("arrCar"));
      // console.log(this.json, "json");
    } else {
      
    }
  },
  methods: {
    goback() {
      this.$router.go("-1");
    },
    Register() {
      this.$router.push("/register");
    },
    istrue(index){
      this.json[index].ischeck=!this.json[index].ischeck
      // console.log(this.json[0].ischeck,"ttttt")
      let result = this.json.map((item,i)=>{
        return item.ischeck
      })
      let ischeackResult = result.every((item,i)=>{
        return item == true
      })
      // console.log(ischeackResult,"iiiiii")
      if(ischeackResult){
        this.isAllCheck=true
      }else{
        this.isAllCheck=false
      }
    },
    isAc(){
      this.isAllCheck=!this.isAllCheck
    },
    isAc(){
      this.isAllCheck=!this.isAllCheck
      if(this.isAllCheck){
        this.json.map((item,i)=>{
          item.ischeck= true;
        })
      }else{
        this.json.map((item,i)=>{
          item.ischeck= !this.json[i].ischeck;
        })
      }
    },
    isE(){
      this.iseditor=!this.iseditor
    },
    start(a,i){
      // console.log(a,"开始")
      // console.log(i,"iiiiiiiii")
      // console.log(a.changedTouches)
      this.startX = a.changedTouches[0].clientX
    },
    move(a,i){
      // console.log(a,"移动")
      this.moveX = a.changedTouches[0].clientX
      // console.log(this.startX,this.moveX)
      // console.log(this.startX-this.moveX,"差")
      // console.log(i,"iiiiiiiii")
      if(this.startX-this.moveX>20){
        // console.log(this.$refs.delMove,"开始移动了")
        this.$refs.delMove[i].style.marginLeft="-1.02rem";
        this.$refs.delMove[i].style.transition="1s";
      }else{
        this.$refs.delMove[i].style.marginLeft="0rem";
        this.$refs.delMove[i].style.transition="1s";
      }
    },
    delFromCar(i){
      let arr=[]
      arr=JSON.parse(localStorage.getItem("arrCar"))
      arr.splice(i,1)
      this.$refs.delMove[i].style.transition="0s";
      this.$refs.delMove[i].style.marginLeft="0";
      // console.log(arr)
      this.json=arr// 在删除localstorage中删除数据的同时将deta中的数据也删掉,这样就能实现数据和页面同步(不用刷新页面)
      // console.log(this.json)
      localStorage.setItem('arrCar',JSON.stringify(arr))
      // console.log(localStorage.getItem("arrCar"))
      if(JSON.parse(localStorage.getItem("arrCar"))==""){
        this.showCar = false;
        // this.$router.go("0");
      }else{
        // this.$router.go("0");
        // console.log(this.$refs.sx,"this.$refs.sx")
        // this.$refs.sx.load("/shopping")
      }
    }
  },
  computed:{
    allP(){
      let sum=0
      this.json.map((item,i)=>{
        if(item.ischeck){
          // console.log(item.price,this.goodsNum)
          sum += item.price*item.goodsNum
        }
      })
      return sum;
    }
  }
};
</script>
<style lang="" scoped>
.van-nav-bar {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: #ff9900;
  color: #fff;
  height: 0.95rem;
}
.van-nav-bar__text,
.van-nav-bar__title,
.van-nav-bar .van-icon {
  color: #fff;
}

.all {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #f7f7f7;
  z-index: -1;
}
.shoppingCar {
  padding-left: 0.32rem;
  overflow: hidden;
  padding-top: 0.95rem;
}
.shoppingCar ul li {
  padding-top: 0.25rem;
  color: #999;
}
.shoppingCar .address {
  padding-left: 0.62rem;
  font-size: 0.28rem;
  line-height: 0.42rem;
  background: url(../assets/img/store.png) no-repeat;
  background-size: auto 0.42rem;
  margin-bottom: 0.48rem;
}
.main {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  /* margin-left: -1.02rem; */
  color: #fff;
  font-size: 0.32rem
}
.main .mainImg img {
  width: 1.62rem;
  height: 1.62rem;
}
.main .name {
  width: 2.81rem;
  padding-left: 0rem;
  font-size: 0.32rem;
  color: #333;
  line-height: 0.5rem;
  padding-left: 0.1rem
}
.main .name span {
  font-size: 0.28rem;
  color: #999;
}
.shoppingCar ul li .main{
  width: 8.2rem;
}
.shoppingCar ul li .main .main_price {
  text-align: center;
  width:1.6rem;
  font-size: 0.32rem;
  line-height: 1.62rem;
  color: #000;
}
.main .del {
  width: 1.02rem;
  text-align: center;
  line-height: 1.6rem;
  background: #ff9900;
}
.van-stepper__minus,
.van-stepper__plus {
  border: 1px solid #000 !important;
}
.van-checkbox{
  width: 0.68rem;
}
.van-checkbox__icon img {
  width: 0.44rem;
  height: 0.44rem;
}
.shoppingCar_foot {
  text-align: center;
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 1rem;
  left: 0;
  background: #fff;
  height: 1.13rem;
  width: 100%;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.allChacked,
.editor {
  width: 1.3rem;
  margin-top: 0.1rem;
}
.shoppingCar_foot .van-checkbox {
  height: 0.6rem;
  width: 0.6rem;
  margin-left: 0.44rem;
}
.allPrice {
  width: 2.6rem;
  padding: 0.2rem 0;
  font-size: 0.23rem;
  color: #999;
  line-height: 0.35rem;
}
.account {
  width: 2.3rem;
  background: #ff5500;
  line-height: 1.15rem;
  color: #fff;
  font-size: 0.38rem;
}

.con {
  position: relative;
}
.conMain {
  text-align: center;
  position: absolute;
  left: 2.6rem;
  top: 3.5rem;
  margin: auto;
}
.conMain img {
  width: 1rem;
  height: 1rem;
  margin-bottom: 0.2rem;
}
.conMain p {
  font-size: 0.32rem;
  width: 2.4rem;
  line-height: 0.5rem;
  color: #333;
}
</style>