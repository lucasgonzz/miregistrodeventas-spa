<template>
	<div>
		<b-form-group
		v-if="budget.client && budget.client.email">
			<b-form-checkbox
			v-model="send_mail"
			:value="1"
			:uncheck-value="0">
				Enviar correo al cliente ({{ budget.client.email }})
			</b-form-checkbox>
		</b-form-group>
		<b-button
		block
		variant="primary"
		@click="save">
			<btn-loader
			text="Guaradar"
			:loader="loading_save"></btn-loader>
		</b-button>
	</div>
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
			send_mail: true,
		}
	},
	methods: {
		save() {
			if (this.check()) {
				this.loading_save = true 
				this.$api.post('budgets', {
					...this.budget,
					send_mail: this.send_mail,
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