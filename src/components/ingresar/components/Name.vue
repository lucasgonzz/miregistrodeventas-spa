<template>
	<b-form-row>
		<b-col>
			<b-form-group
			class="col-autocomplete"
			label="Nombre"
			label-for="article-name">
				<b-form-input
				v-show="article.bar_code != ''"
				type="text"
				id="article-name"
				placeholder="Ingresa el nombre del producto"
				autocomplete="off"
				v-model="article.name"></b-form-input>
				<autocomplete 
				v-show="article.bar_code == ''"
				:search="search" 
				auto-select
				:get-result-value="getResultValue"
				placeholder="Buscar un artículo"
				@submit="setArticle"></autocomplete>
			</b-form-group>
		</b-col>
	</b-form-row>
</template>
<script>
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'
export default {
	props: ['article'],
	components: {
		Autocomplete
	},
	data() {
		return {
			possible_articles: [],
			possible_artice_focus_id: -1,
			searching_possibles_names: false,
			articles: [],
		}
	},
	created() {
		this.getArticles()
	},
	methods: {
		getArticles() {
			this.$api.get('articles/names')
			.then(res => {
				this.articles = res.data
			})
			.catch(err => {
				console.log(err)
			})
		},
		changeToCost() {
			// $('#cost').focus()
		},
		search(input) {
			if (input.length < 1) { return [] }
			return this.articles.filter(article => {
				return article.name.toLowerCase().startsWith(input.toLowerCase())
			})
		},
		getResultValue(article) {
			return article.name
		},
		setArticle(article) {
			this.$api.get(`articles/${article.id}`)
			.then(res => {
				this.$emit('setArticle', res.data)
				this.$bvModal.show('edit-article')
			})
			.catch(err => {
				console.log(err)
			})
		},
	},
}
</script>

