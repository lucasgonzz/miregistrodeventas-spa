<template>
<b-modal 
v-if="can('categories')"
id="update-category" 
title="Asignar categoria" 
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
import categories from '@/mixins/categories'
export default {
	name: 'UpdateCategories',
	mixins: [categories],
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
	computed: {
		selected_articles() {
			return this.$store.state.articles.selected_articles
		},
		selected_articles_id() {
			let ids = []
			this.selected_articles.forEach(art => {
				ids.push(art.id)
			})
			return ids
		}
	},
	methods: {
		update() {
			this.loading = true
			this.$api.post('/articles/category', {
				// category_id: this.category_id,
				sub_category_id: this.form.sub_category_id,
				articles_ids: this.selected_articles_id
			})
			.then(res => {
				this.loading = false
				let articles = res.data.articles
				console.log(res)
				articles.forEach(article => {
					this.$store.commit('articles/update', article)
				})
				this.$bvModal.hide('update-category')
				this.clear()
				this.$toast.success('Artículos ctualizados')
			})
			.catch(err => {
				this.$toast.error('Error al actualizar')
				this.loading = false
				console.log(err)
			})
		},
		clear() {
			this.category_id = 0
			this.sub_category_id = 0
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