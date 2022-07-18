<template>
	<b-col
	md="6"
	cols="12">
		<b-form-group
		label="Codigos">
			<b-input-group
			class="m-b-10"
			prepend="Codigo de barras">
				<b-form-input
				id="article-bar-code"
				type="text"
				autocomplete="off"
				@keydown.enter="isRegister"
				v-model="article.bar_code"
				placeholder="Ingresa el codigo de barras del producto"></b-form-input>
			</b-input-group>
			<b-input-group
			v-if="hasExtencion('providers', false)"
			prepend="Codigo de proveedor">
				<b-form-input
				id="article-provider-code"
				type="text"
				autocomplete="off"
				@keydown.enter="toName"
				v-model="article.provider_code"
				placeholder="Ingresa el codigo del proveedor"></b-form-input>
			</b-input-group>
		</b-form-group>
	</b-col>
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
	methods: {
		isRegister() {
			// Controla que el codigo no este registrado con otro articulo
			let bar_code = this.getBarCode(this.article.bar_code)
			if (this.bar_codes.includes(bar_code)) {
				let article = this.articles.find(art => {
					return art.bar_code == bar_code
				})
				this.$store.commit('articles/setEdit', this.setArticle(article))
				this.$bvModal.show('edit-article')
			} else {
				if (this.hasExtencion('providers')) {
					document.getElementById('article-provider-code').focus()
				} else {
					document.getElementById('article-name').focus()
				}
			}
		},
		toName() {
			document.getElementById('article-name').focus()
		}
	},
}
</script>
