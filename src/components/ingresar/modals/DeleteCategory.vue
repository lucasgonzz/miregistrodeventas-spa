<template>
<b-modal id="delete-category" hide-footer hide-header size="sm">
	<b-container>
		<b-row
		class="m-b-0">
			<b-col>
				<p
				class="text-center">¿Seguro que quiere eliminar la categoria {{ category.name }}?</p>
				<b-button
				block
				class="m-b-0"
				@click="deleteCategory"
				variant="danger">
					<btn-loader
					text="Eliminar"
					:loader="loading"></btn-loader>
				</b-button>
			</b-col>
		</b-row>
	</b-container>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	name: 'DeleteCategory',
	components: {
		BtnLoader
	},
	data() {
		return {
			loading: false
		}
	},
	computed: {
		category() {
			return this.$store.state.categories.category_to_delete
		}
	},
	methods: {
		deleteCategory() {
			this.loading = true
			this.$api.delete('categories/'+this.category.id)
			.then(() => {
				this.loading = false
				this.$store.commit('categories/delete')
				this.$bvModal.hide('delete-category')
				this.$toast.success('Categoria eliminada')
			})
			.catch((err) => {
				this.$toast.error('Error al eliminar categoria, intentelo mas tarde')
				this.loading = false
				console.log(err)
			})
		},
	}
}
</script>