<template>
<b-modal id="commissioners" size="lg" hide-footer title="Comisiones">
	<commissioners-nav></commissioners-nav>
	<commissions-list></commissions-list>
	<btn-pago></btn-pago>
</b-modal>
</template>
<script>
import CommissionersNav from '@/components/ventas/modals/commissioners/CommissionersNav'
import CommissionsList from '@/components/ventas/modals/commissioners/CommissionsList'
import BtnPago from '@/components/ventas/modals/commissioners/BtnPago'
export default {
	name: 'CommissionersIndex',
	components: {
		CommissionersNav,
		CommissionsList,
		BtnPago,
	}
}
</script>