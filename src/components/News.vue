<template>
	<div class="news flex">
		<ul>
			<li v-for="school in schools" :key="school.id" class="column_left">
				<p @click="getSchool(school.id)" class="news_p">{{school.name}}</p>
			</li>
		</ul>
		<div class="article_right">
			<h1 class="article_title">{{selectSchool.name}}</h1>
			<div v-html="selectSchool.content"></div>
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
import axios from 'axios'
import {mapGetters} from 'vuex'
import '../assets/css/custom.css'

export default {
	data (){
		return {
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
		console.log(that.basicUrl);
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

		this.getSchool(that.$route.params.id);
		this.$store.dispatch('changeShow','news')
	},
	methods:{
		getSchool(id){
			let that = this;
			console.log(id)
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