<template>
	<b-row>
		<b-col lg="4" v-if="!isProvider()">
			<b-form-group
			label="Proveedor"
			label-for="article-provider">
				<b-form-select
				@change="changeToStock"
				id="article-provider"
				v-model="article.provider_id"
				:options="providers_options"></b-form-select>
			</b-form-group>
		</b-col>
		<b-col lg="4">
			<b-form-group
			v-intro-step="6"
			v-intro="'Ingresa la cantidad de tu producto, para tener un control del stock a medida que vayas vendiendo unidades del mismo'"
			label="Cantidad"
			label-for="article-stock">
				<b-form-input
				id="article-stock"
				type="number"
				@keydown.enter="saveArticle"
				placeholder="Ingresa la cantidad del producto"
				v-model="article.stock"
				autocomplete="off"></b-form-input>
			</b-form-group>
		</b-col>
		<b-col lg="4">
			<b-form-group
			label="Categoria"
			label-for="article-category">
				<b-form-select
				id="article-category"
				v-model="article.category_id"
				:options="categories_options"></b-form-select>
			</b-form-group>
		</b-col>
	</b-row>
</template>
<script>
import categories from '@/mixins/categories'
export default {
	name: 'StockProviderCategory',
	props: ['article'],
	mixins: [categories],
	data() {
		return {
		}
	},
	computed: {
	},
	methods: {
		saveArticle() {
			this.$emit('saveArticle')
		},
		changeToStock() {
			console.log('entrooo')
			document.getElementById('article-stock').focus()
		}
	},
}
</script>
<style scoped>
.input-uncontable-stock {
	width: 60%;
	display: inline-block;
}
	
</style>
