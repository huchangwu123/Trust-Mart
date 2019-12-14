<template>
  <div>
    <van-nav-bar
      title="登录"
      left-text="返回"
      right-text="注册"
      left-arrow
      @click-left="goback"
      @click-right="Register"
    />
    <div class="form">
      <van-cell-group>
        <van-field
          v-model="username"
          required
          clearable
          label="用户名"
          placeholder="请输入用户名"
        />
        <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required />
      </van-cell-group>
      <span class="forgetPassword">忘记密码</span>
      <van-button type="default" @click="login">登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      username:"",
      password:""
    }
  },
  methods: {
    goback(){
       this.$router.go("-1");
    },
    Register(){
      this.$router.push("/register")
    },
    login(){
      // console.log(this.username,this.password)
      this.$http({
          url: "http://localhost:3000/login/cellphone?phone="+this.username+"&password="+this.password
      })
      .then(res => {
        // console.log(res)
        if(res.data.code==200&&res.data){
          this.$router.push("/index")
          let arr=[]
          let obj={
            img:res.data.profile.avatarUrl,
            name:res.data.profile.nickname
          }
          arr.push(obj)
          console.log(arr,"arrrr")
          sessionStorage.setItem('info',JSON.stringify(arr))
          console.log(JSON.parse(sessionStorage.getItem("info")),"111111111")
        }else{
          
        }
      })
      .catch(err => {
        this.$swal("账号或密码错误");
      });
    }
  }
};
</script>


<style lang="" scoped>
.van-nav-bar {
  background: #ff9900;
  color: #fff;
  height: 0.95rem;
}
.van-nav-bar__text,
.van-nav-bar__title,
.van-nav-bar .van-icon {
  color: #fff;
}
.form{
  padding: 1.9rem 0.72rem
}
.forgetPassword{
  display: block;
  height: 0.8rem;
  line-height: 0.8rem;
  color: #666666;
  float: right;
  margin-right: 0.2rem;
}
.van-button--normal{
  width: 100%;
  background:#ff9900;
  border-radius: 0.08rem;
  color: #fff;
  margin-top: 0.2rem
}
/* 弹窗 */
.swal2-popup{
  width: 80%;
  height: 3rem;
}
.swal2-title{
  position: relative;
  top:0.4rem;
  margin: 0 auto;
  line-height: 0.6rem;
  font-size: 0.4rem;
  color:red;
}
.swal2-popup{
  position: fixed;
  top: 1rem;
  left: 10%;
  padding: 0;
}
.swal2-actions{
  margin: 0.8rem auto 0;
}
.swal2-styled{
  padding: 0px
}
.swal2-styled.swal2-confirm {
  font-size: 0.6rem
}
</style> 
