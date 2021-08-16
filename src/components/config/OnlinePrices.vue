<template>
<b-modal id="online-prices" title="Precios" hide-footer>
	<b-form-group
	label="Quien puede ver los precios en la tienda">
		<b-form-radio
		v-model="auth_user.online_prices"
		value="all">
			Todos
		</b-form-radio>
		<b-form-radio
		v-model="auth_user.online_prices"
		value="only_registered">
			Solo usuarios registrados
		</b-form-radio>
	</b-form-group>
	<b-button
	block
	variant="primary"
	@click="updateUser">
		<btn-loader
		:loader="loading"
		text="Actualizar"></btn-loader>
	</b-button>
</b-modal>
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
			this.$api.put('/user', this.auth_user)
			.then(res => {
				this.$toast.success('Configuracion actualizada')
				this.$bvModal.hide('online-prices')
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