<template>
<b-modal id="edit-brand" title="Editar Marca" hide-footer>
	<b-form-group
	label="Nombre">
		<b-form-input
		v-model="brand.name"></b-form-input>
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
		brand() {
			return this.$store.state.brands.edit
		}
	},
	methods: {
		update() {
			this.loading = true
			this.$api.put('/brands', this.brand)
			.then(res => {
				this.loading = false
				this.$store.commit('brands/update', res.data.brand)
				this.$toast.success('Marca actualizada')
				this.$bvModal.hide('edit-brand')
			})
			.catch(err => {
				this.loading = false
				this.$toast.error('Error al actualizar marca')
				console.log(err)
			})
		}
	}
}
</script>