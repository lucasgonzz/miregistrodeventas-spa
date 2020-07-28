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
				@keydown.enter="changeToCost"
				placeholder="Ingresa el nombre del producto"
				autocomplete="off"
				v-model="article.name"></b-form-input>
				<autocomplete 
				ref="articleName"
				v-show="article.bar_code == ''"
				:search="search" 
				auto-select
				:get-result-value="getResultValue"
				placeholder="Buscar un artículo"
				@submit="setArticle"></autocomplete>
				<small>Precionar Enter para cambiar a Costo</small>
			</b-form-group>
		</b-col>
	</b-form-row>
</template>
<script>
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'
export default {
	props: ['article', 'articles_names'],
	components: {
		Autocomplete
	},
	methods: {
		search(input) {
			if (input.length < 1) { return [] }
			return this.articles_names.filter(article => {
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
				this.$api.get(`articles/${article.id}`)
				.then(res => {
					this.$emit('setArticle', res.data)
					this.$bvModal.show('edit-article')
				})
				.catch(err => {
					console.log(err)
				})
			} else {
				console.log('entro')
				let input = document.getElementsByClassName('autocomplete-input')[0]
				this.article.name = input.value
				document.getElementById('article-cost').focus()
			}
		},
		clearName() {
			console.log('se limpio el nombre')
			this.$refs.articleName.setValue('')
		}
	},
}
</script>

