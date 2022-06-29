<template>
<div>
	<received></received>	
	<edit-article></edit-article>
	<b-modal
	size="xl"
	id="provider-order"
	:title="title"
	hide-footer>
		<form-component></form-component>
		<list></list>
		<btn-save></btn-save>
		<btn-print></btn-print>
	</b-modal>
</div>
</template>
<script>
import provider_orders from '@/mixins/provider_orders'

import Received from '@/components/proveedores/modals/orders/create/Received'
import EditArticle from '@/components/common/EditArticle'

import FormComponent from '@/components/proveedores/modals/orders/create/Form'
import List from '@/components/proveedores/modals/orders/create/List'
import BtnSave from '@/components/proveedores/modals/orders/create/BtnSave'
import BtnPrint from '@/components/proveedores/modals/orders/create/BtnPrint'
export default {
	mixins: [provider_orders],
	components: {
		Received,
		EditArticle,
		
		FormComponent,
		List,
		BtnSave,
		BtnPrint,
	},
	computed: {
		title() {
			return 'Pedido para '+this.provider.name
		}
	}
}
</script>