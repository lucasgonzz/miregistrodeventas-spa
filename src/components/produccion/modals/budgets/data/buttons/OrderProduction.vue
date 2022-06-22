<template>
	<div
	class="m-t-15"
	v-if="edit && edit.status == 'confirmed' && !show_btn_production">
		<hr>
		<b-form-group
		v-if="edit.client.email">
			<b-form-checkbox
			v-model="send_mail"
			:value="1"
			:uncheck-value="0">
				Enviar correo al cliente ({{ edit.client.email }}) al crear Orden de Produccion
			</b-form-checkbox>
		</b-form-group>
		<b-button
		block
		variant="primary"
		@click="confirmOrderProduction()">
			<btn-loader
			text="Crear orden de produccion"
			:loader="loading_order_production"></btn-loader>
		</b-button>
	</div>
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
			send_mail: true,
			loading_order_production: false,
		}
	},
	methods: {
		confirmOrderProduction() {
			this.loading_order_production = true 
			this.$api.post('order-productions', {
				...this.edit,
				send_mail: this.send_mail,
			})
			.then(res => {
				this.loading_order_production = false 
				this.$toast.success('Orden de produccion creada')
				this.$store.commit('produccion/order_productions/add', res.data.order_production)
				this.$bvModal.hide('budget-details')
				this.$router.push({name: 'Produccion', params: {view: 'ordenes-de-produccion'}})
			})
			.catch(err => {
				this.loading_order_production = false 
				this.$toast.error('Error al crear orden de produccion')
				console.log(err)
			})
		},
	}
}
</script>