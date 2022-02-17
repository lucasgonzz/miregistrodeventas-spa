<template>
<b-card 
class="s"
title="Tienda Online">
	<b-form-group
	label="Quien puede ver los precios en la tienda">
		<b-form-radio
		v-model="user.online_prices"
		value="all">
			Todos
		</b-form-radio>
		<b-form-radio
		v-model="user.online_prices"
		value="only_registered">
			Solo usuarios registrados
		</b-form-radio>
	</b-form-group>
	<hr>
	<b-form-group
	label="Precios">
		<b-form-radio
		v-model="user.with_dolar"
		:value="1">
			En dolares
		</b-form-radio>
		<b-form-radio
		v-model="user.with_dolar"
		:value="0">
			En pesos
		</b-form-radio>
	</b-form-group>
	<hr>
	<b-form-group
	label="Nota para los pedidos">
		<b-form-input
		v-model="user.order_description"
		@keyup.enter="updateUser"
		placeholder="Pregunta para antes de hacer el pedido"></b-form-input>
	</b-form-group>
	<hr>
	<b-form-group
	label="Opcion para enviar a domicilio">
		<b-form-radio
		v-model="user.has_delivery"
		:value="1">
			Si, ofecer envio a domicilio
		</b-form-radio>
		<b-form-radio
		v-model="user.has_delivery"
		:value="0">
			No, no ofecer envio a domicilio
		</b-form-radio>
	</b-form-group>
	<hr>
	<b-form-group
	v-if="user.has_delivery"
	label="Precio de envio">
		<b-form-input
		type="number"
		v-model="user.delivery_price"
		@keyup.enter="updateUser"></b-form-input>
	</b-form-group>
	<hr>
	<b-button
	block
	variant="primary"
	@click="updateUser">
		<btn-loader
		:loader="loading"
		text="Guardar cambios"></btn-loader>
	</b-button>
	<hr>
	<title-image></title-image>	
	<hr>
	<addresses></addresses>	
	<hr>
	<workdays></workdays>	
</b-card>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
import TitleImage from '@/components/configuration/components/online/TitleImage'
import Addresses from '@/components/configuration/components/online/Addresses'
import Workdays from '@/components/configuration/components/online/Workdays'
export default {
	components: {
		BtnLoader,
		TitleImage,
		Addresses,
		Workdays,
	},
	data() {
		return {
			loading: false,
		}
	},
	methods: {
		updateUser() {
			this.loading = true
			this.$api.put('/user', this.user)
			.then(res => {
				this.$toast.success('Actualizado')
				this.loading = false
			})
			.catch(err => {
				this.$toast.error('Error al actualizar')
				console.log(err)
				this.loading = false
			})
		}
	}
}
</script>