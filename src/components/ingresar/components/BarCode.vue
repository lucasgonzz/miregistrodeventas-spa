<template>
	<b-form-row>
		<b-col>
			<b-form-group
			v-intro-step="2"
			v-intro="'Ingresa el codigo de tu producto para agregarlo rapidamente a una nueva venta'"
			label="Codigo de barras"
			label-for="article-bar-code">
				<b-form-input
				type="text"
				id="article-bar-code"
				autocomplete="off"
				@keydown.enter="isRegister"
				v-model="article.bar_code"
				placeholder="Ingresa el codigo de barras del producto"></b-form-input>
			</b-form-group>
			<p
			class="m-b-0"
			v-show="loading_is_register">
				<span class="text-primary spinner-border spinner-border-sm"></span>
				Verificando codigo
			</p>
		</b-col>
	</b-form-row>
</template>
<script>
import edit_articles from '@/mixins/edit_articles'
export default {
	name: 'BarCode',
	mixins: [edit_articles],
	props: ['article'],
	computed: {
		bar_codes() {
			return this.$store.state.articles.bar_codes
		},
		articles() {
			return this.$store.state.articles.articles
		},
	},
	data() {
		return {
			loading_is_register: false,
		}
	},
	methods: {
		isRegister() {
			// this.loading_is_register = true
			// Controla que el codigo no este registrado con otro articulo
			if (this.bar_codes.includes(this.article.bar_code)) {
				let article = this.articles.find(art => {
					return art.bar_code == this.article.bar_code
				})
				this.$store.commit('articles/setEdit', this.setArticle(article))
				this.$bvModal.show('edit-article')
			} else {
				document.getElementById('article-name').focus()
			}
		},
		onFileChange(e) {
			this.$emit('setFile', e.target.files[0])
		},
	},
}
</script>
<style scoped>
</style>
