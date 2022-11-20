<template>
<div>
	<confirm
	:text="text_delete"
	:actions="['titles/delete']"
	id="delete-title"
	toast="Titulo eliminado"></confirm>
	<b-row
	v-if="view == 'tienda-online'">
		<b-col
		lg="10">
			<horizontal-nav
			set_sub_view
			:items="items"></horizontal-nav>
			<general></general>	
			<platelets></platelets>	
			<payment-methods></payment-methods>	
			<delivery-zones></delivery-zones>	
			<!-- <dolar></dolar>	 -->
			<title-image></title-image>	
			<addresses></addresses>	
			<workdays></workdays>	
		</b-col>
	</b-row>
</div>
</template>
<script>
import HorizontalNav from '@/components/common/horizontal-nav/Index'

import Confirm from '@/components/common/Confirm.vue'
import BtnLoader from '@/components/common/BtnLoader'
import General from '@/components/configuration/components/online/General'
import Platelets from '@/components/configuration/components/online/Platelets'
import PaymentMethods from '@/components/configuration/components/online/payment-methods/Index'
import DeliveryZones from '@/components/configuration/components/online/DeliveryZones'
import Dolar from '@/components/configuration/components/online/Dolar'
import TitleImage from '@/components/configuration/components/online/TitleImage'
import Addresses from '@/components/configuration/components/online/Addresses' 
import Workdays from '@/components/configuration/components/online/Workdays'
import configuration from '@/mixins/configuration'
export default {
	mixins: [configuration],
	components: {
		HorizontalNav,

		Confirm,
		BtnLoader,
		General,
		Platelets,
		PaymentMethods,
		DeliveryZones,
		Dolar,
		TitleImage,
		Addresses,
		Workdays,
	},
	computed: {
		text_delete() {
			return '¿Seguro que quiere eliminar el titulo?'
		},
		items() {
			return [
				{name: 'General'},
				{name: 'Plaquetas', action: 'platelet/getModels'},
				{name: 'Metodos de pago', action: 'payment_method/getModels'},
				{name: 'Zonas de envio', action: 'delivery_zone/getModels'},
				{name: 'Imagenes', action: 'title/getModels'},
				{name: 'Direcciones', action: 'addresses/getModels'},
				{name: 'Horarios', action: 'schedules/getModels'},
			]
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