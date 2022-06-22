<template>
	<div>
		<b-form-group
		v-if="client && client.email">
			<b-form-checkbox
			v-model="send_mail"
			:value="1"
			:uncheck-value="0">
				Enviar correo al cliente ({{ client.email }})
			</b-form-checkbox>
		</b-form-group>
		<b-button
		block
		variant="primary"
		@click="save">
			<btn-loader
			:text="btn_text"
			:loader="loading_save"></btn-loader>
		</b-button>
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
		<div
		class="m-t-15"
		v-if="edit && edit.status == 'confirmed'">
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
	computed: {
		btn_text() {
			if (this.edit) {
				return 'Actualizar'
			}
			return 'Guardar'
		},
	},
	data() {
		return {
			loading_save: false,
			send_mail: true,
			updating: false,
			loading_confirm: false,
			loading_order_production: false,
		}
	},
	methods: {
		save() {
			if (this.check()) {
				if (this.edit) {
					this.loading_save = true 
					this.$api.put('budgets', {
						budget: this.edit,
						client: this.client,
						products: this.products,
						start_at: this.start_at,
						finish_at: this.finish_at,
						observations: this.observations,
						delivery_and_placement: this.delivery_and_placement,
						send_mail: this.send_mail,
					})
					.then(res => {
						this.loading_save = false
						this.$toast.success('Presupuesto actualizado')
						this.$store.commit('produccion/budgets/update', res.data.budget)
						this.$bvModal.hide('create-budget')
						this.clear()
					})
					.catch(err => {
						this.loading_save = false
						this.$toast.error('Error al actualizar presupuesto')
						console.log(err)
					})
				} else {
					this.loading_save = true 
					this.$api.post('budgets', {
						client: this.client,
						products: this.products,
						start_at: this.start_at,
						finish_at: this.finish_at,
						observations: this.observations,
						delivery_and_placement: this.delivery_and_placement,
						send_mail: this.send_mail,
					})
					.then(res => {
						this.loading_save = false
						this.$toast.success('Presupuesto creado')
						this.$store.commit('produccion/budgets/add', res.data.budget)
						this.$bvModal.hide('create-budget')
					})
					.catch(err => {
						this.loading_save = false
						this.$toast.error('Error al guardar presupuesto')
						console.log(err)
					})
				}
			}
		},
		check() {
			if (!this.client) {
				this.$toast.error('Seleccione un cliente')
				return false
			}
			if (!this.products.length) {
				this.$toast.error('Agregue al menos un producto')
				return false
			}
			return true
		},
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