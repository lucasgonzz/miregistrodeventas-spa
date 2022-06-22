<template>
<b-modal
id="delivery-zone"
title="Zona de envio"
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
	<b-form-group
	label="Precio">
		<b-form-input
		@keyup.enter="save"
		v-model="model.price"
		type="number"
		placeholder="Precio"></b-form-input>
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
			return this.$store.state.delivery_zones.model
		},
	},
	methods: {
		save() {
			if (this.check() && !this.loading) {
				this.loading = true 
				if (this.model.id) {
					this.$api.put('delivery-zones/'+this.model.id, this.model)
					.then(res => {
						this.loading = false 
						this.$toast.success('Zona de envio actualizada')
						this.$store.commit('delivery_zones/update', res.data.delivery_zone)
						this.$bvModal.hide('delivery-zone')
					})
					.catch(err => {
						this.loading = false 
						this.$toast.error('Error al guardar Zona de envio')
						console.log(err)
					})
				} else {
					this.$api.post('delivery-zones', this.model)
					.then(res => {
						this.loading = false 
						this.$toast.success('Zona de envio guardada')
						this.$store.commit('delivery_zones/add', res.data.delivery_zone)
						this.$bvModal.hide('delivery-zone')
					})
					.catch(err => {
						this.loading = false 
						this.$toast.error('Error al guardar Zona de envio')
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
			if (this.model.price == '') {
				this.$toast.error('Ingrese un precio')
				return false
			}
			return true
		}
	}
}
</script>