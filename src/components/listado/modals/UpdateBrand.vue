<template>
<b-modal 
id="update-brand" 
title="Seleccionar Marca" 
hide-footer>
	<div>
		<b-form-group
		label="Categoria">
			<b-form-select
			v-model="form.brand_id"
			:options="brands_options"></b-form-select>
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
import brands from '@/mixins/brands'
export default {
	name: 'UpdateCategories',
	mixins: [brands],
	components: {
		BtnLoader,
	},
	data() {
		return {
			form: {
				brand_id: 0,
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
			this.$api.post('/articles/brand', {
				brand_id: this.form.brand_id,
				articles_ids: this.selected_articles_id
			})
			.then(res => {
				this.loading = false
				let articles = res.data.articles
				console.log(res)
				articles.forEach(article => {
					this.$store.commit('articles/update', article)
				})
				this.$bvModal.hide('update-brand')
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
			this.brand_id = 0
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