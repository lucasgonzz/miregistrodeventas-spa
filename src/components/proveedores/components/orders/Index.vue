<template>
	<view-component 
	v-if="view == 'pedidos'"
	model_name="provider_order"
	show_filter_modal
	:show_modal="false"
	:show_btn_create="can('provider_order.store')">
		<template #modals>
			<edit-article></edit-article>
			<import></import>
		</template>

		<template v-slot:default="props">
			<btn-import
			:model="props.model"></btn-import>
		</template>
	</view-component>
</template>
<script>
import EditArticle from '@/components/common/EditArticle'
import Import from '@/components/proveedores/modals/orders/Import'

import ViewComponent from '@/components/common/view/Index'
import BtnImport from '@/components/proveedores/components/orders/BtnImport'

import edit_articles from '@/mixins/edit_articles'
export default {
	mixins: [edit_articles],
	components: {
		EditArticle,
		Import,
		
		ViewComponent,
		BtnImport,
	},
}
</script>