<template>
	<view-component 
	v-if="view == 'pedidos'"
	model_name="provider_order"
	model_name_spanish="Pedidos"
	:show_modal="false"
	:show_btn_create="can('provider_order.store')"
	:create_model_name_spanish="create_model_name_spanish"
	show_search_nav>
		<template #modals>
			<edit-article></edit-article>
		</template>
	</view-component>
</template>
<script>
import EditArticle from '@/components/common/EditArticle'

import ViewComponent from '@/components/common/view/Index'
export default {
	components: {
		EditArticle,
		
		ViewComponent,
	},
	computed: {
		create_model_name_spanish() {
			return 'Nuevo pedido'
		},
	},
}
</script>