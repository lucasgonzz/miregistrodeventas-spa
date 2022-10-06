<template>
<div>
    <confirm
    :text="text_delete"
    :actions="['produccion/order_productions/product_deliveries/delete']"
    id="delete-product-delivery"
    toast="Entrega eliminada"></confirm>
	<create-product-delivery></create-product-delivery>
	<b-modal
	id="product-deliveries"
	:title="title"
	size="lg"
	hide-footer>
		<btn-create></btn-create>
		<list></list>
	</b-modal>
</div>
</template>
<script>
import product_deliveries from '@/mixins/product_deliveries'

import Confirm from '@/components/common/Confirm'
import CreateProductDelivery from '@/components/produccion/modals/order-productions/product-delivery/Create'
import BtnCreate from '@/components/produccion/modals/order-productions/product-delivery/BtnCreate'
import List from '@/components/produccion/modals/order-productions/product-delivery/List'
export default {
	mixins: [product_deliveries],
	components: {
		Confirm,
		CreateProductDelivery,
		BtnCreate,
		List,
	},
	computed: {
		title() {
			return 'Entregas de '+this.product.name
		},
		text_delete() {
			return '¿Seguro quiere eliminar esta entrega?'
		},
	}
}
</script>