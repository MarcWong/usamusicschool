<template>
	<div class="news flex">
		<ul>
			<li v-for="(title,id) in titles" :key="id">
				<p @click="changeContent" class="news_p">{{title}}</p>
			</li>
		</ul>
		<div class="article_right">
			<h1 class="article_title">{{selectTitle}}</h1>
			<div v-html="selectContent"></div>
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
export default {
	data (){
		return {
			titles:['欧柏林音乐学院','加州艺术学院','曼哈顿音乐学院','霍普金斯大学皮博蒂音乐学院','旧金山音乐学院'],
			selectTitle:'欧柏林学院',
			selectContent:''
		}
	},
	created(){
		let that = this;
		that.selectTitle = '欧柏林音乐学院';
		this.$http.get('../../static/school/欧柏林音乐学院.html').then(res => {  
			console.log("文件数据为:" + res.body)
			that.selectContent = res.body;
		})
	},
	methods:{
		changeContent(e){
			console.log(e.target.innerHTML)
			let that = this;
			that.selectTitle = e.target.innerHTML;
			this.$http.get('../../static/school/' + e.target.innerHTML +'.html').then(res => {  
				console.log("文件数据为:" + res.body)
				that.selectContent = res.body	
			})
		}
	}
}
</script>
<style scoped>
</style>