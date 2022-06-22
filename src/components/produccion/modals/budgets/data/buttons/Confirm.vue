<template>
	<b-button
	v-if="edit && edit.status == 'unconfirmed'"
	block
	class="m-t-15"
	variant="primary"
	@click="confirm()">
		<btn-loader
		text="Confirmar presupuesto"
		:loader="loading_confirm"></btn-loader>
	</b-button>
</template> 
<script>
import budgets from '@/mixins/budgets'
import BtnLoader from '@/components/common/BtnLoader'
export default {
	mixins: [budgets],
	components: {
		BtnLoader,
	},
	data() {
		return {
			loading_confirm: false,
		}
	},
	methods: {
		confirm() {
			this.loading_confirm = true 
			this.$api.put('budgets/confirm', this.edit)
			.then(res => {
				this.loading_confirm = false 
				this.$toast.success('Presupuesto confirmado')
				this.$store.commit('produccion/budgets/update', res.data.budget)
				this.$store.commit('clients/update', res.data.client)
				this.$bvModal.hide('create-budget')
			})
			.catch(err => {
				this.loading_confirm = false 
				this.$toast.error('Error al confirmar presupuesto')
				console.log(err)
			})
		},
	}
}
</script>