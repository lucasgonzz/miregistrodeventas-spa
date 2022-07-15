<template>
<div>
    <confirm
    text="¿Seguro que quiere eliminar el pedido?"
    :actions="['providers/orders/delete']"
    id="delete-provider-order"
    toast="Pedido eliminado"></confirm>

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
		<btn-delete></btn-delete>
	</b-modal>
</div>
</template>
<script>
import Confirm from '@/components/common/Confirm'

import Received from '@/components/proveedores/modals/orders/create/Received'
import EditArticle from '@/components/common/EditArticle'

import FormComponent from '@/components/proveedores/modals/orders/create/Form'
import List from '@/components/proveedores/modals/orders/create/List'
import BtnSave from '@/components/proveedores/modals/orders/create/BtnSave'
import BtnPrint from '@/components/proveedores/modals/orders/create/BtnPrint'
import BtnDelete from '@/components/proveedores/modals/orders/create/BtnDelete'

import provider_orders from '@/mixins/provider_orders'
export default {
	mixins: [provider_orders],
	components: {
		Confirm,
		Received,
		EditArticle,
		
		FormComponent,
		List,
		BtnSave,
		BtnPrint,
		BtnDelete,
	},
	computed: {
		title() {
			return 'Pedido para '+this.provider.name
		}
	}
}
</script>