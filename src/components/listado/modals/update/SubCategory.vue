<template>
<b-modal 
v-if="can('categories')"
id="update-sub-category" 
title="Actualizar Sub Categoria" 
hide-footer>
	<div>
		<b-form-group
		label="Categoria">
			<b-form-select
			v-model="form.category_id"
			:options="categories_options"></b-form-select>
		</b-form-group>
		<b-form-group
		label="Sub categoria">
			<b-form-select
			v-model="form.sub_category_id"
			:options="sub_categories_options(form)"></b-form-select>
		</b-form-group>
		<b-form-group>
			<b-button
			block
			@click="update"
			variant="primary">
				<btn-loader
				:loader="loading"
				text="Actualizar"></btn-loader>
			</b-button>
		</b-form-group>
	</div>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
import selected_articles from '@/mixins/selected_articles'
import categories from '@/mixins/categories'
export default {
	name: 'UpdateCategories',
	mixins: [selected_articles, categories],
	components: {
		BtnLoader,
	},
	data() {
		return {
			form: {
				category_id: 0,
				sub_category_id: 0,
			},
			loading: false,
		}
	},
	methods: {
		update() {
			this.loading = true
			this.$api.put('/articles/sub_category_id', {
				sub_category_id: this.form.sub_category_id,
				articles_ids: this.selected_articles_id
			})
			.then(res => {
				this.loading = false
				let articles = res.data.articles
				articles.forEach(article => {
					this.$store.commit('articles/update', article)
				})
				this.$bvModal.hide('update-sub-category')
				this.clear()
				this.$toast.success('Artículos actualizados')
			})
			.catch(err => {
				this.$toast.error('Error al actualizar')
				this.loading = false
				console.log(err)
			})
		},
		clear() {
			this.form.category_id = 0
			this.form.sub_category_id = 0
		},
	}
}
</script>
<style scoped>
.inline {
	display: inline-block;
	width: 30%;
}
</style>