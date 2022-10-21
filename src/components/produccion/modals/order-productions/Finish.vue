<template>
<b-modal
v-if="model.client"
id="finish-order-production"
title="Terminar orden de produccion"
hide-footer>
	<b-form-checkbox
	class="m-b-15"
	:value="1"
	:unchecked-value="0"
	v-model="save_current_acount">
		Generar movimiento en la cuenta corriente de {{ model.client.name }}
	</b-form-checkbox>
	<b-form-checkbox
	class="m-b-15"
	v-if="model.client.comercio_city_user"
	:value="1"
	:unchecked-value="0"
	v-model="save_provider_order">
		Enviar pedido a la cuenta de ComercioCity de {{ model.client.comercio_city_user.company_name }}
	</b-form-checkbox>
	<btn-loader
	@clicked="save"
	text="Guardar"
	:loader="loading"></btn-loader>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader2'
export default {
	components: {
		BtnLoader,
	},
	computed: {
		model() {
			return this.$store.state.order_production.model 
		},
	},
	data() {
		return {
			save_current_acount: 0,
			save_provider_order: 0,
			loading: false,
		}
	},
	methods: {
		save() {
			this.loading = true 
			this.$api.put('order-production/finish/'+this.model.id, {
				save_current_acount		: this.save_current_acount,
				save_provider_order		: this.save_provider_order,
			})
			.then(res => {
				this.loading = false
				this.$toast.success('Orden de produccion actualizada')
				this.$bvModal.hide('finish-order-production')
				this.$bvModal.hide('order-production')
			})
			.catch(err => {
				console.log(err)
				this.$toast.error('Error al actualizar orden de produccion')
				this.loading = false
			})
		}
	}
}
</script>