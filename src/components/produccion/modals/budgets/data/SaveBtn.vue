<template>
	<b-button
	block
	variant="primary"
	@click="save">
		<btn-loader
		text="Guaradar"
		:loader="loading_save"></btn-loader>
	</b-button>
</template> 
<script>
import budgets from '@/mixins/budgets'
import BtnLoader from '@/components/common/BtnLoader'
export default {
	mixins: [budgets],
	props: ['budget'],
	components: {
		BtnLoader,
	},
	data() {
		return {
			loading_save: false,
		}
	},
	methods: {
		save() {
			if (this.check()) {
				this.loading_save = true 
				this.$api.post('budgets', {
					...this.budget,
				})
				.then(res => {
					this.loading_save = false
					this.$toast.success('Presupuesto creado')
					this.$store.commit('produccion/budgets/add', res.data.budget)
					this.$bvModal.hide('create-budget')
					this.clear()
				})
				.catch(err => {
					this.loading_save = false
					this.$toast.error('Error al guardar presupuesto')
					console.log(err)
				})
			}
		},
		check() {
			if (!this.budget_model.client) {
				this.$toast.error('Seleccione un cliente')
				return false
			}
			if (!this.budget_model.products.length) {
				this.$toast.error('Agregue al menos un producto')
				return false
			}
			return true
		},
		clear() {
			this.$store.commit('produccion/budgets/setCreate')
		}
	}
}
</script>