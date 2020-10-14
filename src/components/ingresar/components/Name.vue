<template>
	<b-form-row>
		<b-col>
			<b-form-group
			v-intro-step="3"
			v-intro="'Ingresa el nombre para tu producto'"
			class="col-autocomplete"
			label="Nombre"
			label-for="article-name">
				<b-form-input
				v-show="article.bar_code != ''"
				type="text"
				id="article-name"
				@keydown.enter="changeToCost"
				placeholder="Ingresa el nombre del producto"
				autocomplete="off"
				v-model="article.name"></b-form-input>
				<autocomplete 
 			 	data-position="below"
				ref="articleName"
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
	computed: {
		articles() {
			return this.$store.state.articles.articles
		}
	},
	methods: {
		search(input) {
			if (input.length < 1) { return [] }
			return this.articles.filter(article => {
				return article.name.toLowerCase().includes(input.toLowerCase())
			})
		},
		getResultValue(article) {
			return article.name
		},
		changeToCost() {
			document.getElementById('article-cost').focus()
		},
		setArticle(article) {
			if (article) {
				let art = this.articles.find(art_ => {
					return art_.id == article.id
				})
				this.$emit('setArticle', art)
				this.$bvModal.show('edit-article')
			} else {
				let input = document.getElementsByClassName('autocomplete-input')[0]
				this.article.name = input.value
				document.getElementById('article-cost').focus()
			}
		},
		clearName() {
			this.$refs.articleName.setValue('')
		}
	},
}
</script>

