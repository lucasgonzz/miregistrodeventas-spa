<template>
	<b-col
	class="m-b-15 m-lg-b-0" 
	v-if="hasExtencion('services')"
	cols="12"
	:lg="col_lg_extencions">
		<service
		:service="service"></service>	
		<b-form-input
		@keyup.enter="setService"
		v-model="service.name"
		placeholder="Servicio"></b-form-input>
	</b-col>
</template>
<script>
import Service from '@/components/vender/modals/Service'

import vender from '@/mixins/vender'
export default {
	mixins: [vender],
	components: {
		Service,
	},
	data() {
		return {
			service: {
				name: '',
				price: '',
			},
		}
	},
	methods: {
		setService() {
			if (this.check()) {
				this.$bvModal.show('service')
				setTimeout(() => {
					document.getElementById('service-price').focus()
				}, 500)
			}
		},
		check() {
			if (this.service.name == '') {
				this.$toast.error('Ingrese un nombre para el servicio')
				return false 
			}
			return true 
		}
	}
}
</script>