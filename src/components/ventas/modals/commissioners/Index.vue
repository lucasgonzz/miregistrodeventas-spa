<template>
<b-modal id="commissioners" size="lg" hide-footer title="Comisiones">
	<commissioners-nav></commissioners-nav>
	<weeks-ago-nav></weeks-ago-nav>
	<commissions-list></commissions-list>
	<btn-pago></btn-pago>
</b-modal>
</template>
<script>
import WeeksAgoNav from '@/components/ventas/modals/commissioners/WeeksAgoNav'
import CommissionersNav from '@/components/ventas/modals/commissioners/CommissionersNav'
import CommissionsList from '@/components/ventas/modals/commissioners/CommissionsList'
import BtnPago from '@/components/ventas/modals/commissioners/BtnPago'
export default {
	name: 'CommissionersIndex',
	components: {
		CommissionersNav,
		WeeksAgoNav,
		CommissionsList,
		BtnPago,
	}
}
</script>