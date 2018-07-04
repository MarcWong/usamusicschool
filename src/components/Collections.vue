<template>
	<div class="news flex">
		<ul>
			<li v-for="(title,id) in titles" :key="id">
				<a href="javascript:void(0)"><p class="news_p">{{title}}</p></a>
			</li>
		</ul>
		<div class="article_right">
			<h1 class="article_title">活动及动态</h1>
			<div class="article_pic">
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
				titles:['音乐比赛','考试招生','演出活动','最新动态'],
				
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