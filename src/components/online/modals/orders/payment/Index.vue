<template>
<b-modal
id="payment-method-details"
title="Detalles del Pago"
hide-footer>
	<payment-details></payment-details>
</b-modal>
</template>
<script>
import PaymentDetails from '@/components/online/modals/orders/payment/Details'
export default {
	components: {
		PaymentDetails,
	},
}
</script>