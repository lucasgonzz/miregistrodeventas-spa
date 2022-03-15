<template>
	<div id="payment">
		<plans></plans>	
		<payment-form></payment-form>
	</div>	
</template>
<script>
import Plans from '@/components/subscription/components/Plans'
import PaymentForm from '@/components/subscription/components/Form'
export default {
	components: {
		Plans,
		PaymentForm,
	}
}
</script>