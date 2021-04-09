<template>
<b-modal id="edit-category" title="Editar Categoria" hide-footer>
	<b-form-group
	label="Nombre">
		<b-form-input
		v-model="category.name"></b-form-input>
	</b-form-group>
	<b-form-group>
		<b-button
		block
		@click="update"
		variant="primary">
			<btn-loader
			text="Actualizar"
			:loader="loading"></btn-loader>
		</b-button>
	</b-form-group>
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
			loading: false
		}
	},
	computed: {
		category() {
			return this.$store.state.categories.edit
		}
	},
	methods: {
		update() {
			this.loading = true
			this.$api.put('/categories', this.category)
			.then(res => {
				this.loading = false
				this.$store.commit('categories/update', res.data.category)
				this.$toast.success('Categoria actualizada')
				this.$bvModal.hide('edit-category')
				this.$store.commit('categories/orderCategories')
			})
			.catch(err => {
				this.loading = false
				this.$toast.error('Error al actualizar categoria')
				console.log(err)
			})
		}
	}
}
</script>