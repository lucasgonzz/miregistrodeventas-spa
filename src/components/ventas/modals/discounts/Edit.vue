<template>
<b-modal id="edit-discount" title="Editar descuento" hide-footer>
	<b-form-group
	label="Nombre del descuento">
		<b-form-input
		@keydown.enter="update"
		v-model="discount.name"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Porcentaje de descuento">
		<b-form-input
		type="number"
		@keydown.enter="update"
		v-model="discount.percentage"></b-form-input>
	</b-form-group>
	<b-form-group>
		<b-button
		variant="primary"
		block
		@click="update">
			<btn-loader
			:loader="loading"
			text="Actualizar"></btn-loader>
		</b-button>
	</b-form-group>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	name: 'EditDiscount',
	components: {
		BtnLoader,
	},
	computed: {
		discount() {
			return this.$store.state.discounts.edit
		}
	},
	data() {
		return {
			loading: false
		}
	},
	methods: {
		update() {
			this.loading = true
			this.$api.put('/discounts', this.discount)
			.then(res => {
				this.loading = false
				this.$toast.success('Descuento actualizado')
				this.$store.commit('discounts/update', res.data.discount)
				this.$bvModal.hide('edit-discount')
			})
			.catch(err => {
				console.log(err)
				this.loading = false
				this.$toast.error('Error al actualizar descuento')
			})
		}
	}
}
</script>