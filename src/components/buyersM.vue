<!-- 买家口碑 -->
<template>
  <div id="one">
    <div class="buyersM">
      <div class="bTop">
        <span
          :class="[num==i?'color':'']"
          v-for="(con,i) in discuss"
          :key="i"
          @click="num=i"
        >{{con}}</span>
      </div>
      <div >
        <ul v-if="num==index" v-for="(value,key,index) in json.buyerReviews" :key="key">
          <li class="bCon" v-for="(con,i) in value" :key="i">
            <!-- 评论 -->
            <div class="discuss">
              <h2 class="name">{{con.buyerName}}</h2>
              <p class="date"></p>
            </div>
            <!-- 晒图 -->
            <div class="print" >
              <img v-for="(item,tuId) in con.postImg" :key="tuId" :src="item" alt />
            </div>
            <p class="pl">{{con.postDescribe}}</p>
            <div class="revert">管理员：{{con.adminReviews}}</div>
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
      num: 0,
      discuss: ["全部评价", "好评", "差评", "晒单"]
    };
  },
  props: ["json"]
};
</script>
<style lang="" scoped>
.buyersM .bTop {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  padding: 0.2rem 0;
}
.buyersM span {
  display: block;
  width: 1.36rem;
  line-height: 0.5rem;
  border-radius: 1rem;
  text-align: center;
  background: #999;
  color: #fff;
}
.color {
  background: #ff9900 !important;
}
.bCon {
  padding: 0.2rem 0;
  border-bottom: 1px solid #dddddd;
}
.discuss {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.2rem;
}
.discuss .name {
  color: #ff9900;
  font-size: 0.24rem;
}
.discuss .date {
  color: #999999;
}
.print img {
  width: 1.52rem;
  margin-bottom: 0.1rem;
}
.pl {
  color: #999;
  font-size: 0.2rem;
  margin-bottom: 0.2rem;
}
.revert {
  padding: 0.1rem 0.2rem;
  background: #dddddd;
  border-radius: 0.2rem;
  line-height: 0.3rem;
}
</style>