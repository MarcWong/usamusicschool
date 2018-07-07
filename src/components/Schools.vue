<template>
	<div class="news flex">
		<ul>
			<li v-for="school in schools" :key="school.id" class="column_left">
				<a :class="{listItemSelected:school.id === ListId}" @click="getSchool(school.id)" class="news_p">{{school.name}}</a>
			</li>
		</ul>
		<div class="article_right">
			<h1 class="article_title">{{selectSchool.name}}</h1>
			<div v-html="selectSchool.content"></div>
		</div>
	</div>	
</template>
<script type="text/javascript">
import axios from 'axios'
import {mapGetters} from 'vuex'
import '../assets/css/custom.css'

export default {
	data (){
		return {
			ListId: 1,
			schools:[],
			selectSchool:{},
			selectSchoolId:'',
		}
	},
	computed:{
    ...mapGetters({
      basicUrl:'getBasicUrl',
    })
  },
	created(){
		let that = this;

		this.getSchool(that.$route.params.id);
		this.$store.dispatch('changeShow','school')

		// console.log(that.basicUrl);
		axios({
			method: 'get',
			url: that.basicUrl + '/school/list/'
		})
		.then(function (res) {
			 console.log(res.data)
			that.schools = res.data
		})
		.catch(function(error){
			console.log('Exptions:',error)
		})
	},
	methods:{
		getSchool(id){
			let that = this;
			if(id === this.ListId)
				return;
			this.ListId = id;
			axios({
				method: 'get',
				url: that.basicUrl + '/school/' + id + '/'
			})
			.then(function (res) {
				console.log(res.data)
				that.selectSchool = res.data
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