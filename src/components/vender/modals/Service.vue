<template>
<b-modal
title="Precio del servicio"
id="service"
hide-footer>
	<b-form-group
	:label="'Precio para el servicio '+service.name">
		<b-form-input
		id="service-price"
		@keyup.enter="saveService"
		v-model="service.price"
		placeholder="Ingrese el precio del servicio"></b-form-input>
	</b-form-group>
	<b-button
	block 
	@click="saveService"
	variant="primary">
		<btn-loader
		:loader="loading"
		text="Guardar"></btn-loader>
	</b-button>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
import vender from '@/mixins/vender'
export default {
	props: ['service'],
	mixins: [vender],
	components: {
		BtnLoader,
	},
	data() {
		return {
			loading: false
		}
	},
	methods: {
		saveService() {
			if (this.check() && !this.loading) {
				this.loading = true 
				this.$api.post('services', this.service)
				.then(res => {
					this.loading = false 
					let service = {
						...res.data.service,
						is_service: true,
						amount: 1,
					}
					this.$store.commit('vender/addItem', service)
					if (this.index_previus_sales > 0) {
						this.setItemsPrices(true, false)
					} else {
						this.setItemsPrices()
					}
					this.$store.commit('vender/setTotal')
					this.$bvModal.hide('service')
					this.service.name = ''
					this.service.price = ''
				})
				.catch(err => {
					this.loading = false 
					this.$toast.error('Error al guardar servicio')
					console.log(err)
				})
			}
		},
		check() {
			if (this.service.price == '') {
				this.$toast.warning('Ingrese un precio para el servicio')
				return false	
			}
			return true 
		}
	}
}
</script>