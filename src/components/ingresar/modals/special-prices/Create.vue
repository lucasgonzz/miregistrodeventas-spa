<template>
<b-modal
id="create-special-price"
title="Nuevo precio especial"
hide-footer>
	<b-form-group
	label="Nombre del precio especial"
	label-for="special-price-name">
		<b-form-input
		type="text"
		id="special-price-name"
		v-model="special_price.name"
		autocomplete="off"
		@keydown.enter="save"
		placeholder="Ingrese el nombre del precio especial"></b-form-input>
	</b-form-group>
	<b-form-group>
		<b-button 
		variant="primary"
		block
		@click="save">
			<btn-loader
			:loader="loading"
			text="Guardar precio especial"
			></btn-loader>
		</b-button>
	</b-form-group>
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
			special_price: {
				name: '',
			},
			loading: false,
		}
	},
	methods: {
		save() {
			if (this.check()) {
				this.loading = true
				this.$api.post('special-prices', this.special_price)
				.then(res => {
					let special_price = res.data.special_price
					this.loading = false
					this.$store.commit('special_prices/add', res.data.special_price)
					this.$bvModal.hide('create-special-price')
					this.$toast.success('Precio especial guardo')
					this.clear()
				})
				.catch( err => {
					this.$toast.error('Error al guardad precio especial')
					this.loading = false
					console.log(err)
				})
			}
		},
		clear() {
			this.special_price = {
				name: '',
			}
		},
		check() {
			let ok = true
			if (this.special_price.name == '') {
				ok = false
				this.$toast.error('Ingrese un nombre para el precio especial')
			} 
			return ok
		}
	}
}
</script>