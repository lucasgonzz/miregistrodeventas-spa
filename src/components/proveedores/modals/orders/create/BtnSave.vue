<template>
	<div
	class="m-t-10">
		<b-form-group
		v-if="provider.email">
			<b-form-checkbox
			v-model="send_email"
			:value="1"
			:uncheck-value="0">
				Enviar correo al proveedor ({{ provider.email }})
			</b-form-checkbox>
		</b-form-group>
		<b-button
		block
		@click="save"
		variant="primary">
			<btn-loader
			:text="text"
			:loader="saving"></btn-loader>
		</b-button>
	</div>
</template>
<script>
import provider_orders from '@/mixins/provider_orders'

import BtnLoader from '@/components/common/BtnLoader'
export default {
	mixins: [provider_orders],
	components: {
		BtnLoader,
	},
	data() {
		return {
			send_email: 1,
			saving: false,
		}
	},
	computed: {
		text() {
			if (this.edit_order) {
				return 'Actualizar pedido'
			}
			return 'Hacer pedido'
		}
	},
	methods: {
		save() {
			this.saving = true 
			if (this.edit_order) {
				this.$api.put('provider-orders/'+this.edit_order.id, {
					provider_id: this.provider.id,
					articles: this.articles,
					send_email: this.send_email
				})
				.then(res => {
					this.saving = false 
					this.$toast.success('Pedido guardado')
					this.$bvModal.hide('provider-order')
					this.$store.commit('providers/orders/update', res.data.provider_order)
					// this.$router.push({name: this.route_name, params: {view: 'pedidos'}})
				})
				.catch(err => {
					this.saving = false 
					this.$toast.error('Error al guardar Pedido')
					console.log(err)
				})
			} else {
				this.$api.post('provider-orders', {
					provider_id: this.provider.id,
					articles: this.articles,
					send_email: this.send_email
				})
				.then(res => {
					this.saving = false 
					this.$toast.success('Pedido guardado')
					this.$bvModal.hide('provider-order')
					this.$store.commit('providers/orders/add', res.data.provider_order)
					this.$router.push({name: this.route_name, params: {view: 'pedidos'}})
				})
				.catch(err => {
					this.saving = false 
					this.$toast.error('Error al guardar Pedido')
					console.log(err)
				})
			}
		}
	}
}
</script>