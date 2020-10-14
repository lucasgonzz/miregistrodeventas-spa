<template>
	<b-card
	no-body>
		<template
		v-slot:header>
			<div>
				Artículos mas vistos
				<b-form-select
				class="select-examine"
				v-model="weeks_ago"
				:options="options"></b-form-select>
			</div>
			<b-button
			@click="getArticles"
			size="sm">
				Actualizar
			</b-button>
		</template>
		<ul class="horizontal-menu" v-show="!loading">
			<li
			v-for="article in articles"
			:key="article.id">
				<article-card
				:article="article"></article-card>
			</li>
		</ul>
		<cargando
		size="sm"
		:is_loading="loading"></cargando>
	</b-card>
</template>
<script>
import Cargando from '@/components/common/Cargando'
import ArticleCard from '@/components/online/components/examine/ArticleCard' 
import online from '@/mixins/online'
import arrayShort from 'array-sort'
export default {
	components: {
		Cargando,
		ArticleCard,
	},
	mixins: [online],
	data() {
		return {
			loading: false,
			articles: [],
			weeks_ago: 1,
		}
	},
	watch: {
		weeks_ago() {
			this.getArticles()
		}
	},
	computed: {
		options() {
			let options = []
			options.push({text: 'De los ultimos 7 días', value:1})
			options.push({text: 'De los ultimos 14 días', value:2})
			options.push({text: 'Del ultimo mes', value:4})
			return options
		}
	},
	methods: {
		getArticles() {
			this.loading = true
			this.$api.get(`/online/articles/most-view/${this.weeks_ago}`)
			.then(res => {
				this.loading = false
				console.log(res)
				this.articles = res.data.articles
				this.orderByViews()
			})
			.catch(err => {
				this.loading = false
				console.log(err)
			})
		},
		orderByViews() {
			this.articles.forEach(article => {
				article.views_count = 0
				article.views.forEach(view => {
					article.views_count++
				})
			})
			arrayShort(this.articles, 'views_count', {reverse: true})
		}
	},
	created() {
		this.getArticles()
	}
}
</script>
<style scoped lang="sass">
.question
	cursor: pointer
	border: none
	-webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75)
	-moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75)
	box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75)	
	&:hover
		-webkit-box-shadow: 0px 0px 7px 0px rgba(0,0,0,1)
		-moz-box-shadow: 0px 0px 7px 0px rgba(0,0,0,1)
		box-shadow: 0px 0px 7px 0px rgba(0,0,0,1)	
	.question-body
		padding: 1em
		button 
			margin-top: .5em
		.buyer-name 
			text-align: center
			margin-bottom: .5em
		.total
			text-align: center
			margin-bottom: 0
			font-weight: bold
		.since 
			margin-top: .5em
			margin-bottom: 0
			font-size: .7em
			text-align: right
			color: rgba(0,0,0,.5)
.no-questions
	text-align: center
	font-size: 1.2em
	margin: 1em 0
	.icon 
		display: block
		font-size: 3em
</style>