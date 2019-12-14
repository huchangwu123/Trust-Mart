<template>
  <div>
    <van-nav-bar
      title="注册"
      left-text="返回"
      right-text="登录"
      left-arrow
      @click-left="goback"
      @click-right="Login"
    />
    <div class="form">
      <van-cell-group>
        <van-field v-model="userName" required clearable label="昵称" placeholder="请输入昵称" @blur="nicheng"/>
        <van-field v-model="phoneNum" required clearable label="手机号" placeholder="请输入手机号码" @blur="sjh"/>
        <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required @blur="mm"/>
        <van-field v-model="yzm" center clearable label="短信验证码" placeholder="请输入短信验证码" >
          <van-button slot="button" size="small" type="primary" @click="hqyzm">点击获取</van-button>
        </van-field>
      </van-cell-group>
      <van-button type="default" @click="register">下一步</van-button>
      <div class="check">
        <van-checkbox v-model="checked" shape="square">
          我已阅读并同意使用<a class="clause">《好又多商城条款》</a>
        </van-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      phoneNum: "",
      password: "",
      yzm: "",
      checked: ""
    };
  },
  methods: {
    goback() {
      this.$router.go("-1");
    },
    Login() {
      this.$router.push("/login");
    },
    nicheng(){
      if(this.userName){

      }else{
        this.$swal("请输入昵称");
      }
    },
    sjh(){
      if(this.phoneNum){
        this.$http({
          url: "http://localhost:3000/cellphone/existence/check?phone="+this.phoneNum
        })
        .then(res => {
          // console.log(res,"eeeeeee")
          let regNum = /^1[3456789]\d{9}$/;
          let result = regNum.test(this.phoneNum)
          console.log(result,"rrrrrrrrrrr")
          if(result){
            if(res.data.exist==1){
              this.$swal("该手机号已注册");
            }else{
              
            }
          }else{
            this.$swal("请输入合法手机号");
          }
        })
        .catch(err => {});
      }else{
        this.$swal("请输入手机号");
      }
    },
    mm(){
       let regPassword = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,16}$/;
        let result1 = regPassword.test(this.password)
        if(result1){

        }else{
          this.$swal("请输入6-16位数字字母或特殊字符组成");
        }
    },
    hqyzm(){
      if (this.userName && this.phoneNum) {
        this.$http({
          url: "http://localhost:3000/captcha/sent?phone="+this.phoneNum
        })
        .then(res => {
          if(res.data.code==200){
            this.$swal("验证码发送成功");
          }
        })
        .catch(err => {});
      } else {
        this.$swal("请输入必填项");
      }
    },
    register() {
      // console.log("我被触发了");
      // console.log(this.checked, "asdasdasd");
      if (this.checked) {
        if (this.userName && this.phoneNum && this.password &&this.yzm) {
          this.$http({
            url: "http://localhost:3000/captcha/verify?phone="+this.phoneNum+"&captcha="+this.yzm
          })
          .then(res => {
            // console.log(res,"eeeeeee")
            if(res.data.code==200){
              this.$http({
                url: "http://localhost:3000/register/cellphone?phone="+this.phoneNum+"&password="+this.password+"&captcha="+this.yzm+"&nickname="+this.userName
              })
              .then(res => {
                console.log(res)
                if(res.data.code==200){
                  this.$swal("注册成功");
                }else{
                  this.$swal("昵称被占用或不合法");
                }
              })
              .catch(err => {});
            }else{
              this.$swal("验证码错误");
            }
          })
          .catch(err => {});
        } else {
          this.$swal("请输入必填项");
        }
      } else {
        this.$swal("请阅读并同意相关条款");
      }
    }

  }
};
</script>
<style lang="">

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
.form {
  padding: 1.9rem 0.73rem;
}
.van-button--normal {
  width: 100%;
  background: #ff9900;
  border-radius: 0.08rem;
  color: #fff;
  margin-top: 0.6rem;
}
.van-button--small {
  padding: 0;
}
.check {
  color: #666;
  font-size: 0.3rem;
  margin-top: 0.2rem
}
.clause {
  color: #0000ff;
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