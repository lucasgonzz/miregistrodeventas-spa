<template>
	<b-col 
	md="6"
	cols="12">
		<b-form-group
		:description="description"
		label="Precio">
			<b-input-group
			v-if="hasExtencion('articles.percentage_gain')"
			class="m-b-10"
			prepend="Margen de ganancia %">
				<b-form-input
				id="article-percentage-gain"
				type="number"
				min="0"
				@keydown.enter="changeToProvider"
				placeholder="Ingresa el procentaje de ganancia"
				v-model="article.percentage_gain"
				autocomplete="off"></b-form-input>
			</b-input-group>
			<b-input-group
			v-if="article.original_price"
			class="m-b-10"
			prepend="Precio original">
				<b-form-input
				id="article-price"
				type="number"
				min="0"
				@keydown.enter="saveArticle"
				placeholder="Ingresa el precio del producto"
				v-model="article.original_price"
				autocomplete="off"></b-form-input>
			</b-input-group>
			<b-input-group
			class="m-b-10"
			prepend="Precio final">
				<b-form-input
				id="article-price"
				type="number"
				min="0"
				@keydown.enter="saveArticle"
				placeholder="Ingresa el precio del producto"
				v-model="article.price"
				autocomplete="off"></b-form-input>
			</b-input-group>
		</b-form-group>
	</b-col>
</template>
<script>
export default {
	props: ['article'],
	computed: {
		disabled_percetange_gain() {
			if (this.article.created_at) {
				console.log('tiene created_at')
				return false
				// return !this.article.percentage_gain && this.article.price != ''
			} else {
				return this.article.price != ''
			}
		},
		disabled_price() {
			if (this.hasExtencion('articles.percentage_gain')) {
				if (this.article.created_at) {
					return this.article.percentage_gain == ''
				} else {
					return this.article.percentage_gain != ''
				}
			}
			return false
		},
		description() {
			if (this.hasExtencion('articles.percentage_gain')) {
				return 'Dejar MARGEN DE GANANCIA en blanco para utilizar el precio comun'
			}
			return null
		}
	},
	methods: {
		changeToProvider() {
			document.getElementById('article-provider').focus()
		},
		saveArticle() {
			this.$emit('saveArticle')
		}
	},
}
</script>
