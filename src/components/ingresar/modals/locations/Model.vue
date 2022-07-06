<template>
<b-modal
title="Localidad"
id="location"
hide-footer>
	<b-form-group
	label="Nombre">
		<b-form-input
		v-model="model.name"
		placeholder="Nombre de la localidad"></b-form-input>
	</b-form-group>
	<b-button
	block 
	@click="save"
	variant="primary">
		<btn-loader
		:loader="loading"
		text="Guardar"></btn-loader>
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
	computed: {
		model() {
			return this.$store.state.locations.model 
		},
	},
	methods: {
		save() {
			if (this.check() && !this.loading) {
				this.loading = true 
				if (this.model.id) {
					this.$api.put('locations/'+this.model.id, this.model)
					.then(res => {
						this.$store.commit('locations/update', res.data.location)
						this.loading = false 
						this.$toast.success('Localidad actualizada')
						this.$bvModal.hide('location')
					})
					.catch(err => {
						console.log(err)
						this.loading = false 
						this.$toast.error('Error al actualizar Localidad')
					})
				} else {
					this.$api.post('locations', this.model)
					.then(res => {
						this.$store.commit('locations/add', res.data.location)
						this.loading = false 
						this.$toast.success('Localidad guardada')
						this.$bvModal.hide('location')
					})
					.catch(err => {
						console.log(err)
						this.loading = false 
						this.$toast.error('Error al guardar Localidad')
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