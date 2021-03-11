<template>
<b-modal id="discounts" title="Descuentos" hide-footer body-class="p-0">
	<discounts-list></discounts-list>
	<div class="p-15">
		<b-button
		block
		variant="primary"
		v-b-modal="'create-discount'">
			Crear descuento
		</b-button>
	</div>
</b-modal>
</template>
<script>
import DiscountsList from '@/components/ventas/modals/discounts/DiscountsList'
export default {
	name: 'DiscountsIndex',
	components: {
		DiscountsList,
	},
}
</script>