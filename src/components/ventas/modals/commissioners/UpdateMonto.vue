<template>
<b-modal id="update-monto" title="Actualizar Monto" hide-footer>
	<b-form-group>
		<b-form-input
		type="number"
		min="0"
		@keyup.enter="updateMonto"
		v-model="commission.monto"></b-form-input>
	</b-form-group>
	<b-form-group>
		<b-button
		block
		@click="updateMonto"
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
	computed: {
		commission() {
			return this.$store.state.commissioners.commission_to_update_monto
		}
	},
	data() {
		return {
			loading: false,
		}
	},
	methods: {
		updateMonto() {
			this.loading = true
			this.$api.post('/commissions/update-percentage', this.commission)
			.then(res => {
				this.loading = false
				this.$toast.success('Comision actualizada')
				this.$bvModal.hide('update-monto')
				// this.$store.dispatch('commissioners/getSelectedCommissioners')
			})
			.catch(err => {
				this.$toast.error('Error al actualizar comision')
				this.loading = false
				console.log(err)
			})
		}
	}
}
</script>