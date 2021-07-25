<template>
	<b-form-row>
		<b-col lg="3" v-if="!isProvider()">
			<b-form-group
			label="Proveedor"
			label-for="article-provider">
				<b-form-select
				@keyup.enter="changeToCategory"
				id="article-provider"
				v-model="article.provider_id"
				:options="providers_options"></b-form-select>
			</b-form-group>
		</b-col>
		<b-col lg="3">
			<b-form-group
			label="Categoria"
			label-for="article-category">
				<b-form-select
				@keyup.enter="changeToSubCategory"
				id="article-category"
				v-model="article.category_id"
				:options="categories_options"></b-form-select>
			</b-form-group>
		</b-col>
		<b-col lg="3">
			<b-form-group
			label="Subcategoria"
			label-for="article-sub-category">
				<b-form-select
				@keyup.enter="changeToStock"
				id="article-sub-category"
				v-model="article.sub_category_id"
				:options="sub_categories_options(article)"></b-form-select>
			</b-form-group>
		</b-col>
		<b-col lg="3">
			<b-form-group
			v-intro-step="6"
			v-intro="'Ingresa la cantidad de tu producto, para tener un control del stock a medida que vayas vendiendo unidades del mismo'"
			label="Cantidad"
			label-for="article-stock">
				<b-form-input
				id="article-stock"
				type="number"
				@keydown.enter="changeToTags"
				placeholder="Ingresa la cantidad del producto"
				v-model="article.stock"
				autocomplete="off"></b-form-input>
			</b-form-group>
		</b-col>
	</b-form-row>
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
		changeToTags() {
			document.getElementById('tag-name').focus()
			// this.$emit('saveArticle')
		},
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
