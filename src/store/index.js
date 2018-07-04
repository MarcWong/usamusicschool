/*
* @Author: Administrator
* @Date:   2017-01-23 12:30:55
* @Last Modified by:   Administrator
* @Last Modified time: 2017-03-02 20:00:52
*/

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state={
	show:'home',
	basicUrl:'http://47.104.111.200:8080/website',
	clientheight:0,
	clientwidth:0,
	info:{
	},
	left_nav:{
		home:{url:'home',name:'网站主页'},
		news:{url:'news/1',name:'学校简介'},
		collections:{url:'collections',name:'活动与动态'},
		signup:{url:'download',name:'报名表下载'},
		aboutus:{url:'aboutus',name:'关于我们'},
	},
}
const mutations={
	CHANGE_HW(state,obj){
		state.clientwidth=obj.w;
		state.clientheight=obj.h;
	},
	CHANGE_INFO(state,obj){
		state.info.contacts=obj.contacts;
		state.info.phone=obj.phone;
		state.info.email=obj.email;
		state.info.address=obj.address;
		state.info.other_info=obj.other_info;
		state.info.zip_code=obj.zip_code;
	},
	//js复制对象
	clone(myObj){
	  if(typeof(myObj) != 'object') return myObj;
	  if(myObj == null) return myObj;
  
	  var myNewObj = new Object();
	  
	  for(var i in myObj)
	    myNewObj[i] = mutations.clone(myObj[i]);
	  
	  return myNewObj;
	},
}
const actions={
	change_hw({commit},obj){
		commit('CHANGE_HW',obj)
	},
	change_info({commit},obj){
		commit('CHANGE_INFO',obj)
	},
}
const getters={
	getHW:function(state){
		return {
			h:state.clientheight,
			w:state.clientwidth
		}
	},
	getLeft_nav:function(state){
		return state.left_nav
	},
	getBasicUrl:function(state){
		return state.basicUrl
	},
	getBasicInfo:function(state){
		return state.info
	},
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})