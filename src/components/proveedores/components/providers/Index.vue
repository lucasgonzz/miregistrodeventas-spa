<template>
	<view-component 
	v-if="view == 'proveedores'"
	model_name="provider"
	show_filter_modal
	show_plus_dropdown
	:show_previus_days="false">
		<template #modals>
	    	<current-acounts></current-acounts>
	    	<import></import>
			<update-prices></update-prices>
		</template>

		<!-- <template #horizontal_nav_btn_create>
			<btn-create
			:create_model_name_spanish="create_model_name_spanish"></btn-create>
		</template> -->

		<template v-slot:default="slotProps">
			<btn-current-acounts
			:model="slotProps.model"></btn-current-acounts>
		</template>

		<template
		v-slot:modal_buttons="slotProps">
    		<comercio-city-user  
    		:model="slotProps.model"
    		model_name="provider"></comercio-city-user>
		</template>
	</view-component>
</template>
<script>
import CurrentAcounts from '@/components/common/current-acounts/Index'
import Import from '@/components/proveedores/modals/providers/Import'
import UpdatePrices from '@/components/ventas/modals/update-prices/Index'

import ViewComponent from '@/components/common/view/Index'
import BtnCurrentAcounts from '@/components/proveedores/components/providers/BtnCurrentAcounts'
import BtnCreate from '@/components/proveedores/components/providers/BtnCreate'
import ComercioCityUser from '@/components/common/ComercioCityUser'
export default {
	components: {
		CurrentAcounts,
		Import,
		UpdatePrices,
		
		ViewComponent,
		BtnCurrentAcounts,
		BtnCreate,
		ComercioCityUser,
	},
	computed: {
		create_model_name_spanish() {
			return 'Nuevo proveedor'
		},
	},
}
</script>