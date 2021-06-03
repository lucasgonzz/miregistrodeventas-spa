<template>
<b-modal id="discounts" title="Descuentos" hide-footer body-class="p-0">
	<div class="p-15 j-end">
		<b-button
		variant="primary"
		v-b-modal="'create-discount'">
			<i class="icon-plus"></i>
			Crear descuento
		</b-button>
	</div>
	<discounts-list></discounts-list>
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