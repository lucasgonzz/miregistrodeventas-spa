<template>
<b-modal id="delete-category" hide-header hide-footer size="sm">
	<p
	class="text-center">{{ text }}</p>
	<b-button
	@click="deleteModel"
	block
	variant="danger">
		<btn-loader
		:loader="loading"
		text="Eliminar"></btn-loader>
	</b-button>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	components: {
		BtnLoader,
	},
	data() {
		return {
			loading: false,
		}
	},
	computed: {
		text() {
			let text = '¿Seguro que quiere eliminar la '
			if (this.view == 'categories') {
				text += 'categoria '+this.category.name
			} else if (this.view == 'subcategories') {
				text += 'subcategoria '+this.sub_category.name
			}
			text += '?'
			return text
		},
		view() {
			return this.$store.state.categories.view
		},
		category() {
			return this.$store.state.categories.category_to_delete
		},
		sub_category() {
			return this.$store.state.sub_categories.sub_category_to_delete
		},
	},
	methods: {
		deleteModel() {
			if (this.view == 'categories') {
				this.deleteCategory()
			} else if (this.view == 'subcategories') {
				this.deleteSubCategory()
			}
		},
		deleteCategory() {
			this.loading = true
			this.$api.delete('/categories/'+this.category.id)
			.then(() => {
				this.loading = false
				this.$store.commit('sub_categories/deleteFromCategory', this.category)
				this.$store.commit('categories/delete')
				this.$toast.success('Categoria eliminada')
				this.$bvModal.hide('delete-category')
			})
			.catch(err => {
				this.$toast.error('Error al elimnar categoria')
				this.loading = false
				console.log(err)
			})
		},
		deleteSubCategory() {
			this.loading = true
			this.$api.delete('/sub-categories/'+this.sub_category.id)
			.then(() => {
				this.loading = false
				this.$store.commit('sub_categories/delete')
				this.$toast.success('Subcategoria eliminada')
				this.$bvModal.hide('delete-category')
			})
			.catch(err => {
				this.loading = false
				this.$toast.error('Error al elimnar subcategoria')
				console.log(err)
			})
		},
	}
}
</script>