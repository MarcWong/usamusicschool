// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource' 
import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import News from './components/News.vue'
import Collection from './components/Collections.vue'
import HomeFirst from './components/HomeFirst.vue'
import store from './store/index'
import Aboutus from './components/Aboutus.vue'
import Download from './components/Download.vue'

Vue.use(VueResource)
Vue.use(VueRouter)
const router=new VueRouter({
	routes:[{
		path:'/home',
		component:Home,
		children:[
			{path:'',component:HomeFirst}
		]	
	},
	{
		path:'/news/:id',component:News
	},
	{
		path:'/collections',component:Collection
	},
	{
		path:'/aboutus',component:Aboutus
	},
	{
		path:'/download',component:Download
	},
	{
		path:'/',redirect:'/home'
	},
	{
		path:'/*',redirect:'/home'
	}]
})

/* eslint-disable no-new */


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})