<template>
	<div
	class="container-messages">
		<div id="messages">
			<b-form-group>
				<b-form-input
				placeholder="Buscar un articulo"
				@keyup="searchArticles"
				v-model="query"></b-form-input>
			</b-form-group>
			<p
			class="text-with-icon m-t-50"
			v-if="query.length < 2 && !selected_article">
	            <i class="icon-upload"></i>
				{{ text }}
			</p>
			<div
			v-if="query.length < 2 && selected_article">
				<p>
					Articulo seleccionado (click para quitarlo)
				</p>
				<div class="cont-article-cards">
					<article-card
					:class="'shadow-4'"
					:article="selected_article"
					@articleSelected="articleSelected"></article-card>
				</div>
			</div>
			<div 
			v-else
			class="cont-article-cards">
				<article-card
				v-for="article in articles_to_show"
				:key="article.id"
				:article="article"
				@articleSelected="articleSelected"></article-card>
			</div>
		</div>
	</div>
</template>
<script>
import online from '@/mixins/online'
import ArticleCard from '@/components/common/ArticleCard'
export default {
	mixins: [online],
	props: ['selected_article', 'text'],
	components: {
		ArticleCard,
	},
	data() {
		return {
			query: '',
			articles_to_show: [],
		}
	},
	computed: {
		articles() {
			return this.$store.state.articles.articles
		},
	},
	methods: {
		searchArticles() {
			if (this.query.length >= 2) {
				let articles = this.articles.filter(article => {
					return article.name && article.name.toLowerCase().includes(this.query.toLowerCase())
				})
				this.articles_to_show = articles
			} else {
				this.articles_to_show = []
			}
		},
		articleSelected(article) {
			this.$emit('articleSelected', article)
			this.query = ''
			this.articles_to_show = []
		}
	},
}
</script>
<style lang="sass">
.container-messages
	height: 85%
#conversation-messages
	display: flex
	flex-direction: column
	overflow-y: scroll
	// padding: 1em
	max-height: 100%
.commerce-message
	align-self: flex-end
	color: #000 
	.since
		color: rgba(0,0,0,.7)
.buyer-message
	color: #FFF
	.since
		color: rgba(255,255,255,.7)
.message
	border-radius: .5em
	padding: .5em
	margin-bottom: 1em
	width: 300px
	.since
		font-size: .7em
		text-align: right
	p 
		margin: 0
</style>