<template>
<b-modal id="update-debe" title="Actualizar debe" hide-footer>
	<b-form-group>
		<b-form-input
		type="number"
		min="0"
		@keyup.enter="updateDebe"
		v-model="current_acount.debe"></b-form-input>
	</b-form-group>
	<b-form-group>
		<b-button
		block
		@click="updateDebe"
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
		current_acount() {
			return this.$store.state.clients.current_acounts.update_debe
		}
	},
	data() {
		return {
			loading: false,
		}
	},
	methods: {
		updateDebe() {
			this.loading = true
			this.$api.post('/current-acounts/update-debe', this.current_acount)
			.then(res => {
				this.loading = false
				this.$toast.success('Cuenta corriente actualizada')
				this.$bvModal.hide('update-debe')
				this.$store.dispatch('clients/current_acounts/getCurrentAcounts')
			})
			.catch(err => {
				this.$toast.error('Error al actualizar cuenta corriente')
				this.loading = false
				console.log(err)
			})
		}
	}
}
</script>