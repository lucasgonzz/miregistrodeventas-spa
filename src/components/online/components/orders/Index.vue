<template>
	<view-component
	v-if="view == 'pedidos'"
	model_name="order"
	model_name_spanish="Pedidos"
	create_model_name_spanish="Pedido"
	:show_btn_create="false"
	:show_btn_delete="false"
	show_search_nav>
		<template v-slot:modal_buttons="slotProps">
			<btn-status
			:model="slotProps.model"></btn-status>

			<btn-cancel
			:model="slotProps.model"></btn-cancel>
		</template>
	</view-component>
</template>
<script>
import ViewComponent from '@/components/common/view/Index'
import BtnStatus from '@/components/online/components/orders/BtnStatus'
import BtnCancel from '@/components/online/components/orders/BtnCancel'
export default {
	components: {
		ViewComponent,
		BtnStatus,
		BtnCancel,
	}
}
</script>