<template>
	<div class="news flex">
		<ul>
			<li v-for="(title,id) in titles" :key="id" class="column_left">
				<a href="javascript:void(0)"><p class="news_p">{{title}}</p></a>
			</li>
		</ul>
		<div class="article_right">
			<h1 class="article_title">关于我们</h1>
			<div v-html="aboutUs">
			</div>
		</div>
	</div>	
</template>
<script type="text/javascript">
import '../assets/css/custom.css'
import {mapGetters} from 'vuex'
	export default {
		data (){
			return {
				titles:['关于我们'],
				aboutUs:''
			}
		},
		created(){
			let that = this;
			this.$http.get('../../static/index/关于我们.html').then(res => {  
				console.log("文件数据为:" + res.body)
				that.aboutUs = res.body;
			})
			this.$store.dispatch('changeShow','aboutus')
		},
		computed:{
			...mapGetters({
				contents:'getNews'
			})
		}

	}
</script>
<style scoped>
</style>