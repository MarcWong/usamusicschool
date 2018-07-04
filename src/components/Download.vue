<template>
	<div class="news flex">
		<ul>
			<li v-for="(title,id) in titles" :key="id">
				<a href="javascript:void(0)"><p class="news_p">{{title}}</p></a>
			</li>
		</ul>
		<div class="article_right">
			<div class="article_pic">
                <a href="../../static/file/1-1FFQGH7.doc">2018学年报名表</a>
			</div>
		</div>
		<!-- <ul>
			<li v-for="(content,id) in contents" class="news_li" :key="id">
				<router-link to="/newsarticle" tag="img" :src="content.src" class="news_img"></router-link>
				<router-link to="/newsarticle" class="news_title">{{content.title}}</router-link>
				<p class="news_p">{{content.time}}</p>
			</li>
		</ul> -->
	</div>	
</template>
<script type="text/javascript">
import '../assets/css/custom.css'
import {mapGetters} from 'vuex'
	export default {
		data (){
			return {
				titles:['报名表下载'],
				
			}
		},
		created(){
		},
		computed:{
		}

	}
</script>
<style scoped>
</style>