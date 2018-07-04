<template>
  <div id="app" >
    <header>
    <div class="login_top flex-justify_start">
      <img src="../static/images/logo.gif">
      <div style="padding-left:10px;color:white;">
        <h1>
        <router-link to="/home">美国音乐学院联盟</router-link>
        </h1>
      </div>
      <div style="padding-left:100px;color:white;">
        <p>联系方式</p>
        <p>{{basicInfo.phone}} &nbsp; {{basicInfo.contacts}}</p>
        <p>Email:</p>
        <p>{{basicInfo.email}} </p>
      </div>
    </div>
    <div class="nav">
      <ul class="left_nav">
        <!-- left_navs是通过mapgetters来的数据，在index.js中 -->
        <li :class="left_nav_value" v-for="(left_nav_value,id) in left_navs" :key="id">
            <router-link :to="'/'+left_nav_value.url" class="nav_a">{{left_nav_value.name}}</router-link>
        </li>
      </ul>
      
    </div>
    </header>
    <section>
      <transition name="display">
        <router-view></router-view>
      </transition>
    </section>
    <footer>
      <ul>
        <li class="flex-justify_start" style="margin-left:10vw;">
          <h2 style="width:5vw;margin-right:5vw">联系方式</h2>
          <ul>
            <li class="item">{{basicInfo.phone}} &nbsp; {{basicInfo.contacts}}</li>
          </ul>
        </li>
        <li class="flex-justify_start" style="margin-left:10vw;">
          <h2 style="width:5vw;margin-right:5vw">地址</h2>
          <ul>
            <li class="item">{{basicInfo.address}} {{basicInfo.zip_code}} {{basicInfo.other_info}}</li>
          </ul>
        </li>
        <li class="flex-justify_start" style="margin-left:10vw;">
          <h2 style="width:5vw;margin-right:5vw">Email</h2>
          <ul>
            <li class="item">{{basicInfo.email}}</li>
          </ul>
        </li>
      </ul>
      <p class="flex-justify_center" style="font-size:10px;">2011 © Usaschoolsofmusic | All Rights Reserved</p>
    </footer>
    <!-- <transition name="scroll">
      <p v-if="scroll" class="scroll" @click="scrolltoTop">
        <img :src="'../static/images/scroll.jpg'" alt="scroll"/>
      </p>
    </transition> -->
    
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import axios from 'axios'
export default {

  data () {
    return{
      timer:null,
      scroll:false,
      scrollTimer:null
    }
  },
  computed:{
    ...mapGetters({
      basicUrl:'getBasicUrl',
      left_navs:'getLeft_nav',
      basicInfo:'getBasicInfo'
    })
  },
  methods:{
    scrolltoTop:()=>{
      if(document.documentElement.scrollTop){
        var scrollTop=document.documentElement.scrollTop
        var step=scrollTop/30;
        var now=scrollTop-step;
        var i=0;
        var time=setInterval(function(){
          i++;
          if(i>32){
            clearInterval(time)
          }
          document.documentElement.scrollTop=now;
          scrollTop=document.documentElement.scrollTop
          now=scrollTop-step;
        },10)
      }else if(document.body.scrollTop){
        var scrollTop=document.body.scrollTop
        var step=scrollTop/30;
        var now=scrollTop-step;
        var i=0;
        var time=setInterval(function(){
          i++;
          if(i>32){
            clearInterval(time)
          }
          document.body.scrollTop=now;
          scrollTop=document.body.scrollTop
          now=scrollTop-step;
        },10)
      }
      
    },
  },
   created(){
      var self=this;

      axios({
          method: 'get',
          url: self.basicUrl + '/'
      })
      .then(function (res) {
          console.log(res.data)
          self.$store.dispatch('change_info',res.data)
      })
      .catch(function(error){
          console.log('Exptions:',error)
      })

      
      
      window.onload=()=>{
        self.$store.dispatch('change_hw',{
          h:document.documentElement.clientHeight||document.body.clientHeight,
          w:document.documentElement.clientWidth||document.body.clientWidth
        })
      }
      window.onresize=()=>{
        if(self.timer){
          clearTimeout(self.timer)//函数节流
        }
        self.timer=setTimeout(function(){
      
          self.$store.dispatch('change_hw',{
            h:document.documentElement.clientHeight||document.body.clientHeight,
            w:document.documentElement.clientWidth||document.body.clientWidth
          })
        },100)
      }
      window.onscroll=()=>{
         var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            if(scrollTop>10){
              this.scroll=true;
            }else{
              this.scroll=false;
            }
      }
   }
}
</script>

<style>
      body,form,div,span,ul,ol,li,p,pre,dl,dt,dd,h1,h2,h3,h4,h5,h6,em,a,fieldset,legend,address,label,textarea,select,input,figure,table,th,td,b,i{margin:0;padding:0;}
      fieldset,img{border:0;}
      ul,li{list-style:none;}
      em,i{font-style:normal;}
      table{border-collapse:separate;border-spacing:0;}
      a{text-decoration:none;color: black}
      a:focus,input,button,select,textarea{outline:none;}
      h1,h2,h3,h4,h5,h6{ font-size:100%; font-variant: normal;font-weight: 400}
      body{margin:0px;width: 100% ;font-family: "Segoe UI","Lucida Grande",Helvetica,Arial,"Microsoft YaHei",FreeSans,Arimo,"Droid Sans","wenquanyi micro hei","Hiragino Sans GB","Hiragino Sans GB W3",FontAwesome,sans-serif;font-size:16px;}
      input{text-shadow: none}
      #app{width:100%;}
      header{height: 10vh;min-width: 1150px;width:100%}
      .login_top{background: #000;}
      .left_nav{float:left;margin-left: 15px}
      .left_nav li,.right_nav li{display: inline-block;text-align: center;height: 60px;line-height: 60px;font-size: 20px;font-family: verdana;transition: all .3s ease-in-out;cursor: pointer}
      .left_nav li:hover{background: #00BC9B}
      .right_nav{float:right;margin-right: 15px}
      .right_nav li:hover{background: #00BC9B}
      .nav_a{display: inline-block;height: 60px;padding: 0 15px;}
      .nav{width: 100%;overflow: hidden;}
      header h1{width: 200px;text-align: center;line-height: 60px;font-size: 24px;font-family: verdana; margin: 0 auto}
      section{min-height: 77vh;width:100%;}
      footer{min-height: 13vh;background: #3d444c;width: 100%;min-width: 1150px;padding-top: 8px;position: relative;color:#a9b8ca;}
      .bg{background: #00BC9B;}
      footer .items{display: inline-block;padding: 0 2px;}
      footer strong {position: absolute;left: 0;top:27.5px;}
      footer strong a{text-decoration: underline;color:#a9b8ca;}
      footer ul{text-align: center;}
      footer h1{text-decoration: underline;}
      footer h1 a{color:#fff}
      .item{font-size: 12px;}
      footer .item:hover>a{text-decoration: underline;color:#08c;}  
      footer .payment{position: absolute;right:0;top: 27.5px}
      footer .payment span{display: inline-block;vertical-align: top;height: 22px;line-height: 22px}
      .scroll{width: 60px;position: fixed;bottom: 90px;right: 0}
      .scroll-enter,.scroll-leave-active{
        opacity: 0
      }
      .scroll-enter-active,.scroll-leave{
        transition: all 1s ease;
        -moz-transition: all 1s ease;/* Firefox 4 */
        -webkit-transition: all 1s ease; /* Safari 和 Chrome */
        -o-transition: all 1s ease;  /* Opera */ 
      }
      .display-enter,.display-leave-active{
        opacity: 0
      }
      .display-enter-active,.display-leave{
        transition: all .5s ease;
        -moz-transition: all .5s ease;/* Firefox 4 */
        -webkit-transition: all .5s ease; /* Safari 和 Chrome */
        -o-transition: all .5s ease;  /* Opera */ 
      }
      
</style>
