<template>
	<view-component
	v-if="view == 'clientes'"
	model_name="buyer"
	model_name_spanish="clientes"
	create_model_name_spanish="cliente"
	:show_btn_create="false"
	:show_previus_days="false"
	show_search_nav>
		<template
		v-slot:modal_buttons="slotProps">
    		<comercio-city-user  
    		model_name_to_attach="client"
    		prop_to_find_model="name"
    		prop_to_set="comercio_city_client"
    		text="Asignar a un cliente ya cargado en el sistema"
    		:placeholder="'Ingrese el nombre del cliente '+slotProps.model.name+' tal como figura en el sistema'"
    		:model="slotProps.model"
    		model_name="buyer"></comercio-city-user>
		</template>
		<template v-slot:default="props">
			<btn-chat
			:model="props.model"></btn-chat>
		</template>
	</view-component>
</template>
<script>
import ViewComponent from '@/components/common/view/Index'
import ComercioCityUser from '@/components/common/ComercioCityUser'
import BtnChat from '@/components/online/components/buyers/BtnChat'
export default {
	components: {
		ViewComponent,
		ComercioCityUser,
		BtnChat,
	}
}
</script>