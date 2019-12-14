import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import  Register from "@/components/register"
import  Index from "@/components/index"
import  Foot from "@/components/foot"
import  Sort from "@/components/sort"
import  Shopping from "@/components/shopping"
import  Mine from "@/components/mine"
import  Details from "@/components/details"

Vue.use(Router)

export default new Router({
  mode:"history",
  scrollBehavior(to,from,savedPosition){
    // console.log(to,"to")
    // console.log(from,"from")
    // console.log(savedPosition,"savedPosition")
    // 判断savedPosition是否有值，有值返回该值，没有返回0
    if(savedPosition){
      return savedPosition;
    }else{
      return{
        x:0,
        y:0
      }
    }
  },
  routes: [
    {
      path:'/login',
      component: Login
    },
    {
      path:'/register',
      component: Register
    },
    {
      path:'/foot',
      component: Foot,
      children:[
        {
          path: '/index',
          component: Index,
        },
        {
          path: '/sort',
          component: Sort,
        },
        {
          path: '/shopping',
          component: Shopping,
        },
        {
          path: '/mine',
          component: Mine,
        },
      ]
    },
    {
      path: '/details',
      component: Details,
    },
    {
      path: '*',
      redirect:"/index"
    }
  ]
})
