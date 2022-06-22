<template>
<b-modal
id="payment-method"
title="Metodo de Pago"
hide-footer>	
	<b-form-group
	label="Nombre">
		<b-form-input
		@keyup.enter="save"
		v-model="model.name"
		placeholder="Nombre"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Descripcion">
		<b-form-input
		@keyup.enter="save"
		v-model="model.description"
		placeholder="Descripcion"></b-form-input>
	</b-form-group>
	<b-form-group>
		<b-button
		@click="save"
		variant="primary"
		block>
			<btn-loader
			:loader="loading"
			text="Guardar"></btn-loader>
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
			loading: false
		}
	},
	computed: {
		model() {
			return this.$store.state.payment_methods.model
		},
	},
	methods: {
		save() {
			if (this.check()) {
				this.loading = true 
				if (this.model.id) {
					this.$api.put('payment-methods/'+this.model.id, this.model)
					.then(res => {
						this.loading = false 
						this.$toast.success('Metodo de pago actualizado')
						this.$store.commit('payment_methods/update', res.data.payment_method)
						this.$bvModal.hide('payment-method')
					})
					.catch(err => {
						this.loading = false 
						this.$toast.error('Error al guardar Metodo de pago')
						console.log(err)
					})
				} else {
					this.$api.post('payment-methods', this.model)
					.then(res => {
						this.loading = false 
						this.$toast.success('Metodo de pago guardado')
						this.$store.commit('payment_methods/add', res.data.payment_method)
						this.$bvModal.hide('payment-method')
					})
					.catch(err => {
						this.loading = false 
						this.$toast.error('Error al guardar Metodo de pago')
						console.log(err)
					})
				}
			}
		},
		check() {
			if (this.model.name == '') {
				this.$toast.error('Ingrese un nombre')
				return false
			}
			return true
		}
	}
}
</script>