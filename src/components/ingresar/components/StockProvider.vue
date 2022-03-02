<template>
	<b-form-row
	class="m-b-15">
		<b-col 
		v-if="can('providers')"
		lg="6">
			<b-form-group
			label="Proveedor"
			label-for="article-provider">
				<b-form-select
				id="article-provider"
				v-model="article.provider_id"
				:options="providers_options"></b-form-select>
			</b-form-group>
		</b-col>
		<b-col 
		v-if="can('articles.stock')"
		lg="6">
			<b-form-group
			v-intro-step="6"
			v-intro="'Ingresa la cantidad de tu producto, para tener un control del stock a medida que vayas vendiendo unidades del mismo'"
			label="Cantidad"
			label-for="article-stock">
				<b-form-input
				id="article-stock"
				type="number"
				min="0"
				@keydown.enter="changeToCategory"
				placeholder="Ingresa la cantidad del producto"
				v-model="article.stock"
				autocomplete="off"></b-form-input>
			</b-form-group>
		</b-col>
	</b-form-row>
</template>
<script>
// import categories from '@/mixins/categories'
export default {
	name: 'StockProviderCategory',
	props: ['article'],
	// mixins: [categories],
	data() {
		return {
		}
	},
	computed: {
	},
	methods: {
		changeToCategory(e) {
			console.log(e.key)
			document.getElementById('article-category').focus()
		},
		changeToSubCategory() {
			document.getElementById('article-sub-category').focus()
		},
		changeToStock() {
			document.getElementById('article-stock').focus()
		},
	},
}
</script>
<style scoped lang="sass">
[class^='col']
	@media screen and (max-width: 992px)
		margin-bottom: 1em
</style>
