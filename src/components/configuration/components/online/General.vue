<template>
<b-card 
class="shadow-2 b-r-1 m-b-25"
title="Tienda Online">
	<b-form-group
	label="Descripcion de la web"
	description="Descripcion que aparecera en los resultados de Google">
		<b-form-textarea
		placeholder="Ingrese la descripcion de su tienda"
		v-model="user.online_description"></b-form-textarea>
	</b-form-group>
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
	<!-- <b-form-group
	v-if="user.has_delivery"
	label="Precio de envio">
		<b-form-input
		type="number"
		v-model="user.delivery_price"
		@keyup.enter="updateUser"></b-form-input>
	</b-form-group>
	<hr> -->
	<b-form-group>
		<b-form-checkbox
		:value="1"
		:unchecked-value="0"
		v-model="user_configuration.show_articles_without_stock"
		@keyup.enter="updateUser">
			Mostrar articulos sin stock
		</b-form-checkbox>
	</b-form-group>
	<hr>
	<b-form-group
	label="Plus en pesos para precios en dolares">
		<b-form-input
		type="number"
		v-model="user.dolar_plus"
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
</b-card>
</div>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	components: {
		BtnLoader,
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