<template>
	<div class="news flex">
		<ul>
			<li v-for="oneList in listItems" :key="oneList.id" class="column_left">
				<a :class="{listItemSelected:oneList.id === ListId}" @click="getNews(oneList.id)" class="news_p">{{oneList.name}}</a>
			</li>
		</ul>
		<div class="article_right">
			<a v-if="isDetail" @click="closeNewsDetail" class="article_title">点此返回</a>
			<p v-if="isDetail" class="article_pic">
				{{detailedNews.title}} &nbsp; {{detailedNews.update_time}}
			</p>
			<p v-if="isDetail" class="article_pic">
				{{detailedNews.content}}
			</p>
			<a v-else @click="getNewsDetail(news.id)" v-for="news in NewsList" :key="news.id" class="article_pic">
				{{news.title}} &nbsp; {{news.update_time}}
			</a>

		</div>
	</div>	
</template>
<script type="text/javascript">
import axios from 'axios'
import '../assets/css/custom.css'
import {mapGetters} from 'vuex'
	export default {
		data (){
			return {
				isDetail:false,
				ListId: -1,
				NewsList:[],
				detailedNewsId: -1,
				detailedNews:{},
				listItems:[
					{id:0,
					name:'音乐比赛'},
					{id:1,
					name:'考试招生'},
					{id:2,
					name:'演出活动'},
					{id:3,
					name:'最新动态'},
					],
			}
		},
		created(){
			this.getNews(2);
			this.$store.dispatch('changeShow','news')
		},
		computed:{
			...mapGetters({
				basicUrl:'getBasicUrl',
			})
		},
		methods:{
			getNews(id){
				let that = this
				that.ListId = id;
				console.log(that.ListId);
				axios({
					method: 'get',
					url: that.basicUrl + '/news/' + id + '/list/'
				})
				.then(function (res) {
					console.log(res.data)
					that.NewsList = res.data
				})
				.catch(function(error){
					console.log('Exptions:',error)
				})
			},
			getNewsDetail(id){
				let that = this
				this.isDetail = true;
				if(id === this.detailedNewsId)
					return;
				this.detailedNewsId = id
				console.log(this.ListId,id);
				axios({
					method: 'get',
					url: that.basicUrl + '/news/' + id + '/'
				})
				.then(function (res) {
					console.log(res.data);
					that.detailedNews = res.data;
				})
				.catch(function(error){
					console.log('Exptions:',error)
					that.detailedNewsId = -1
				})
			},
			closeNewsDetail(){
				this.isDetail = false;
			}
		}
	}
</script>
<style scoped>
</style>