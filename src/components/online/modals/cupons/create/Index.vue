<template>
<b-modal
id="create-cupon"
title="Nuevo Cupon"
hide-footer>
	<amount-percentage></amount-percentage>
	<cupon-code></cupon-code>
	<!-- <buyers></buyers>
	<expiration></expiration> -->
	<save-btn></save-btn>
</b-modal>
</template>
<script>
import cupons from '@/mixins/cupons'
import AmountPercentage from '@/components/online/modals/cupons/create/AmountPercentage'
import CuponCode from '@/components/online/modals/cupons/create/Code'
// import Buyers from '@/components/online/modals/cupons/create/Buyers'
// import Expiration from '@/components/online/modals/cupons/create/Expiration'
import SaveBtn from '@/components/online/modals/cupons/create/SaveBtn'
export default {
	mixins: [cupons],
	components: {
		AmountPercentage,
		CuponCode,
		// Buyers,
		// Expiration,
		SaveBtn,
	}
}
</script>