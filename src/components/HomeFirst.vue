<template>
	<div class="home_first">
		<div class="home_first_left" :style="{height:home_first_height+'px'}">
			<a href="https://www.oberlin.edu/conservatory">
				<img alt="1" :src="'../static/school/加州艺术学院logo.png'" class="kaws"/>
			</a>
			<a href="https://sfcm.edu/">
				<img alt="2" :src="'../static/school/旧金山音乐学院logo.png'" class="kaws"/>
			</a>
			<a href="https://www.msmnyc.edu">
				<img alt="3" :src="'../static/school/曼哈顿音乐学院logo.jpg'" class="kaws"/>
			</a>
			<a href="https://www.oberlin.edu">
				<img alt="4" :src="'../static/school/欧柏林音乐学院logo.jpg'" class="kaws"/>
			</a>
			<a href="http://peabody.jhu.edu/">
				<img alt="5" :src="'../static/school/霍普金斯大学皮博蒂音乐学院logo.jpg'" class="kaws"/>
			</a>
		</div>
		<div class="container">
			<div class="wrapper" :style="{width:originalData.img_width+'px',height:originalData.img_height-20+'px',top:home_first_height_margin+'px'}" @mouseover="stop" @mouseout="play">
				<div class="wrapper-content" :class="{wrapper_trans:isTrans}" :style="{width:originalData.img_width*(originalData.num+2)+'px',height:originalData.img_height+20+'px',left:-originalData.img_width+'px'}" ref="wrapperContent">

					<router-link to="/news/1">
					<div class="wrapper-content_img">
						<div style="background-color:white;width:350px;height:24px;text-align:center;">
						<p style="margin-left:119px;position:absolute;z-index:1000;">欧柏林音乐学院</p>
						</div>
						<img alt="1" :src="'../static/school/欧柏林音乐学院.jpg'" :style="{width:originalData.img_width+'px',height:originalData.img_height+'px'}"/>
					</div>
					</router-link>

					<router-link to="/news/2">
					<div class="wrapper-content_img">
						<div style="background-color:white;width:350px;height:24px;text-align:center;">
						<p style="margin-left:119px;position:absolute;z-index:1000;">曼哈顿音乐学院</p>
						</div>
						<img alt="2" :src="'../static/school/曼哈顿音乐学院.jpg'" :style="{width:originalData.img_width+'px',height:originalData.img_height+'px'}"/>
					</div>
					</router-link>

					<router-link to="/news/3">
					<div class="wrapper-content_img">
						<div style="background-color:white;width:350px;height:24px;text-align:center;">
						<p style="margin-left:119px;position:absolute;z-index:1000;">旧金山音乐学院</p>
						</div>
						<img alt="3" :src="'../static/school/旧金山音乐学院.jpg'" :style="{width:originalData.img_width+'px',height:originalData.img_height+'px'}"/>
					</div>
					</router-link>

					<router-link to="/news/4">
					<div class="wrapper-content_img">
						<div style="background-color:white;width:350px;height:24px;text-align:center;">
						<p style="margin-left:127px;position:absolute;z-index:1000;">加州艺术学院</p>
						</div>
						<img alt="4" :src="'../static/school/加州艺术学院.png'" :style="{width:originalData.img_width+'px',height:originalData.img_height+'px'}"/>
					</div>
					</router-link>

					<router-link to="/news/5">
					<div class="wrapper-content_img">
						<div style="background-color:white;width:350px;height:24px;text-align:center;">
						<p style="margin-left:71px;position:absolute;z-index:1000;">霍普金斯大学皮博蒂音乐学院</p>
						</div>
						<img alt="5" :src="'../static/school/霍普金斯大学皮博蒂音乐学院.jpg'" :style="{width:originalData.img_width+'px',height:originalData.img_height+'px'}"/>
					</div>
					</router-link>
				</div>
				
				<div class="wrapper-buttons" :style="{left:(originalData.img_width-100)/2+'px'}">
					<span :class="['wrapper-button',{'wrapper_on':index==1}]"  @click="turnTo(1)"></span>
					<span :class="['wrapper-button',{'wrapper_on':index==2}]"  @click="turnTo(2)"></span>
					<span :class="['wrapper-button',{'wrapper_on':index==3}]"  @click="turnTo(3)"></span>
					<span :class="['wrapper-button',{'wrapper_on':index==4}]"  @click="turnTo(4)"></span>
					<span :class="['wrapper-button',{'wrapper_on':index==5}]"  @click="turnTo(5)"></span>
				</div>

				<a href="javascript:;" class="wrapper-arrow wrapper-prev" :style="{marginTop:-originalData.btn_width/2+'px'}" @click="prev"></a>
				<a href="javascript:;" class="wrapper-arrow wrapper-next" :style="{marginTop:-originalData.btn_width/2+'px'}" @click="next"></a>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import {mapGetters} from 'vuex'
	export default {
		data (){
			return {
				originalData:{
    				img_width:350,
    				img_height:350,
    				btn_width:40,
    				btn_height:40,
    				num:4,
    				delay:300
    			},
    			isTrans:true,//因为到最后一张图片，index为1时，需要立即跳到第二张index也为1的图片，这个用来是否给出transition
    			index:1,
    			timer:null,//setInterval
    			clickdelay:false//用来防止连续点击
			}
		},
		computed:{
			...mapGetters({
				hw:'getHW'
			}),
			 home_first_width:function(){
			 	return parseInt(this.hw.w)-400;			
			},
			home_first_height:function(){
				
				var a= parseInt(this.hw.h)-400
				return a<389?389:a
			},
			home_first_height_margin:function(){
				return parseInt(this.home_first_height-300)/2
			}
		},
		methods:{
    			next(){
    				if(this.clickdelay){
    					return 
    				}
    				this.clickdelay=true
    				if(this.index===this.originalData.num){
    					this.index=1
    				}else{
    					this.index+=1
    				}
    				this.animate(this.originalData.img_width)
    				
    			},
    			prev(){
    				if(this.clickdelay){
    					return 
    				}
    				this.clickdelay=true
    				if(this.index===1){
    					this.index=this.originalData.num
    				}else{
    					this.index-=1
    				}
    				this.animate(-this.originalData.img_width)	
    			},
    			animate(offset){
    				var node=this.$refs.wrapperContent
    				var self=this;
    				var left=parseInt(node.style.left)-offset
    				this.isTrans=true
    				node.style.left=left+'px'
    				setTimeout(function(){
    					if(left<-(self.originalData.num*self.originalData.img_width)){
    						self.isTrans=false
    						node.style.left=-self.originalData.img_width+'px'
    						self.clickdelay=false //当到达最后一张图片时 
    					}
    					if(left>-100){
    						self.isTrans=false
    						node.style.left=-self.originalData.num*self.originalData.img_width+'px'
    						self.clickdelay=false //当到达第一张图片时  
    					}
    				},this.originalData.delay)
    			},
    			play(){
    			
    				var self=this;
    				this.timer=setInterval(function(){
    					self.next()
    				},2000)
    			},
    			stop(){
    				this.clickdelay=false//用来防止连续点击
    				clearInterval(this.timer)
    				this.timer=null
    			},
    			turnTo(flag){
    				if(flag==this.index){
    					return
    				}else{
    					var offset=(flag-this.index)*this.originalData.img_width
    					this.index=flag
    					this.animate(offset)

    				}

    			}
    		},
    		
    		mounted(){
    			/*下面是判断过渡动画是否完成*/ 
                var node=this.$refs.wrapperContent
                var transitions = {
                     'transition':'transitionend',
                     'OTransition':'oTransitionEnd',
                     'MozTransition':'transitionend',
                     'WebkitTransition':'webkitTransitionEnd'
                    }
                    var self=this
 
               for(var t in transitions){

                   if( node.style[t] !== undefined ){
                       var transitionEvent=transitions[t];
                   }
               }
               transitionEvent && node.addEventListener(transitionEvent, function() {
                    self.clickdelay=false              
               });
               this.play()
    		},
		created(){
			this.$store.dispatch('changeShow','home')
		},
        destroyed(){
            clearInterval(this.timer)
        }
	}
</script>
<style scoped>
	.home_first{overflow: hidden;margin-right:400px;}
	.home_first:after{display: block;content:"";width: 0;height: 0;clear:both;}
	.home_first_left{float:left;margin-top:100px;width: 400px;text-align: center;}
	.home_first_left h1{text-align: center;font-family: TrashHand;font-size: 22px;
color:darkslateblue;}
	.kaws{border: none;height: 80px}
	.container{margin-left: 400px;margin-top:100px}
	
	 .wrapper{position: relative;overflow: hidden;margin: auto}
    .wrapper-content{position: absolute;left: 0;z-index: 1;}
    .wrapper-content_img{border: none;outline:none;float: left}
    .wrapper-buttons{position: absolute;width: 150px;height: 20px;text-align: center;bottom: 3px;z-index: 2;}
    .wrapper-button{float: left;width: 20px;height: 20px;border-radius: 10px;background: lightblue;margin: 0 2.5px;cursor: pointer;}
   .wrapper-arrow{position: absolute;width: 40px;height:40px;cursor: pointer;display: none;top:50%;z-index: 2; }
  
    .wrapper:hover .wrapper-arrow{display: block;opacity:1}
    .wrapper-prev{left:10px;}
    .wrapper-next{right:10px;}
    .wrapper_on{background-color: #00BC9B}
    .wrapper_trans{transition: left .3s ease}
</style>