<template>
	<b-form-row
	class="m-b-15">
		<b-col lg="6">
			<b-form-group
			label="Categoria"
			label-for="article-category">
				<b-form-select
				id="article-category"
				v-model="article.category_id"
				:options="categories_options"></b-form-select>
			</b-form-group>
		</b-col>
		<b-col lg="6">
			<b-form-group
			label="Subcategoria"
			label-for="article-sub-category">
				<b-form-select
				id="article-sub-category"
				v-model="article.sub_category_id"
				:options="sub_categories_options(article)"></b-form-select>
			</b-form-group>
		</b-col>
	</b-form-row>
</template>
<script>
import categories from '@/mixins/categories'
export default {
	name: 'Categories',
	props: ['article'],
	mixins: [categories],
	data() {
		return {
		}
	},
}
</script>
<style scoped lang="sass">
[class^='col']
	@media screen and (max-width: 992px)
		margin-bottom: 1em
</style>
