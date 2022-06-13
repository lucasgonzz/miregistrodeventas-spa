<template>
	<b-col>
		<b-form-group
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

			<select-component
			v-show="article.bar_code == ''"
			full_width
			select_empty
			:id="id_name"
			@setSelected="setSelectedArticle"
			placeholder="Nombre del artículo"
			:model="article"
			:models="articles"></select-component>

			<!-- <autocomplete 
			data-position="below"
			ref="articleName"
			v-show="article.bar_code == ''"
			:search="search" 
			@change="change"
			:get-result-value="getResultValue"
			placeholder="Buscar un artículo"
			@submit="setSelectedArticle"></autocomplete> -->
		</b-form-group>
	</b-col>
</template>
<script>
import SelectComponent from '@/components/common/SelectComponent'
// import Autocomplete from '@trevoreyre/autocomplete-vue'
// import '@trevoreyre/autocomplete-vue/dist/style.css'
import edit_articles from '@/mixins/edit_articles'
export default {
	props: ['article'],
	components: {
		SelectComponent,
		// Autocomplete
	},
	mixins: [edit_articles],
	computed: {
		articles() {
			return this.$store.state.articles.articles
		},
		id_name() {
			return 'select-article-name'
		},
	},
	methods: {
		search(input) {
			if (input.length < 3) { return [] }
			return this.articles.filter(article => {
				return article.name && article.name.toLowerCase().includes(input.toLowerCase())
			})
		},
		getResultValue(article) {
			return article.name
		},
		changeToCost() {
			document.getElementById('article-cost').focus()
		},
		change() {
			this.setArticleName()
		},
		setSelectedArticle(result) {
			console.log(result)
			let product
			if (result.is_empty) {
				this.article.name = result.selected
				document.getElementById('article-cost').focus()
			} else {
				this.$store.commit('articles/setEdit', this.setArticle(result.selected))
				this.$bvModal.show('edit-article')
			}
			// if (article) {
			// 	let art = this.articles.find(art_ => {
			// 		return art_.id == article.id
			// 	})
			// 	this.$store.commit('articles/setEdit', this.setArticle(art))
			// 	this.$bvModal.show('edit-article')
			// } else {
			// 	this.setArticleName()
			// 	document.getElementById('article-cost').focus()
			// }
		},
		setArticleName() {
			let input = document.getElementsByClassName('autocomplete-input')[0]
			this.article.name = input.value
		},
		clearName() {
			this.$refs.articleName.setValue('')
		}
	},
}
</script>

