<template>
  <div id="two">
    <div class="detailsImg" v-for="(con,i) in json.shopDes" :key="i">
      <img :src="con" alt />
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  props:['json']
};
</script>
<style lang="" scoped>
.detailsImg img {
  width: 6.55rem;
}
</style>