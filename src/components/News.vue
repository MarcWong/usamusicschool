<template>
	<div class="news flex">
		<ul>
			<li v-for="oneList in listItems" :key="oneList.id" class="column_left">
				<a :class="{listItemSelected:oneList.id === ListId}" @click="getNews(oneList.id)" class="news_p">{{oneList.name}}</a>
			</li>
		</ul>
		<div class="article_right">
			<div v-if="isDetail" >
				<a @click="closeNewsDetail" class="article_title">点此返回</a>
				<p class="article_pic">
					{{detailedNews.title}} &nbsp; {{detailedNews.update_time}}
				</p>
				<p class="article_pic">
					{{detailedNews.content}}
				</p>
			</div>
			
			<div v-else v-for="news in NewsList" :key="news.id" class="article_pic">
				<a @click="getNewsDetail(news.id)">{{news.title}} &nbsp; {{news.update_time}}</a>

				<div>
					<a v-show="pageNumber>0" @click="lastPage">上一页</a>
					<a v-show="canTurnPage" @click="nextPage">下一页</a>
				</div>
			</div>

			<p v-show="NewsList.length===0">暂无相关信息</p>
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
				canTurnPage:false,
				pageNumber:0,
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
			this.getNews(0);
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
					url: that.basicUrl + '/news/' + id + '/list/' + that.pageNumber + '/'
				})
				.then(function (res) {
					console.log(res.data)
					that.NewsList = res.data
					if(res.data.length === 10)
						that.canTurnPage = true;
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
			},
			lastPage(){
				let that = this;
				this.pageNumber--;
				console.log(this.pageNumber);
				axios({
					method: 'get',
					url: that.basicUrl + '/news/' + that.ListId + '/list/' + that.pageNumber + '/'
				})
				.then(function (res) {
					console.log(res.data)
					that.NewsList = res.data
					if(res.data.length === 10)
						that.canTurnPage = true;
					else
						that.canTurnPage = false;
				})
				.catch(function(error){
					console.log('Exptions:',error)
				})
			},
			nextPage(){
				let that = this;
				this.pageNumber++;
				console.log(this.pageNumber);
				axios({
					method: 'get',
					url: that.basicUrl + '/news/' + that.ListId + '/list/' + that.pageNumber + '/'
				})
				.then(function (res) {
					console.log(res.data)
					that.NewsList = res.data
					if(res.data.length === 10)
						that.canTurnPage = true;
					else
						that.canTurnPage = false;
				})
				.catch(function(error){
					console.log('Exptions:',error)
				})
			}
		}
	}
</script>
<style scoped>
</style>