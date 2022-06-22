<template>
<b-card 
class="shadow-2 b-r-1 m-b-25"
title="Dolar">
	<b-form-group
	label="Que valor del dolar user">
		<b-form-radio
		value="compra"
		v-model="user.dolar">
			A la compra <strong>{{ price(dolar.compra) }}</strong>
		</b-form-radio>
		<b-form-radio
		value="venta"
		v-model="user.dolar">
			A la venta <strong>{{ price(dolar.venta) }}</strong>
		</b-form-radio>
		<b-form-radio
		value="promedio"
		v-model="user.dolar">
			Promedio entre ambos <strong>{{ price(dolar.promedio) }}</strong>
		</b-form-radio>
		<b-form-input
		class="m-t-10"
		type="number"
		placeholder="Defina usted mismo el valor del dolar"
		v-model="user.dolar"></b-form-input>
	</b-form-group>
	<hr>
	<b-form-group
	label="Plus en pesos para cada dolar">
		<b-form-input
		type="number"
		v-model="user.dolar_plus"
		@keyup.enter="updateUser"></b-form-input>
	</b-form-group>
	<hr>
	<b-form-group
	label="Plus en pesos para cada dolar cara chica">
		<b-form-input
		type="number"
		v-model="user.dolar_cara_chica"
		@keyup.enter="updateUser"></b-form-input>
	</b-form-group>
	<hr>
	<p
	class="title">
		Precio final: <strong>{{ price(dolar_blue) }}</strong>
	</p>
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
	computed: {
		dolar() {
			return this.$store.state.coins.dolar
		},
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