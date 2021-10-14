<template>
<b-modal
id="create-cupon"
title="Nuevo Cupon"
hide-footer>
	<amount-percentage></amount-percentage>
	<buyers></buyers>
	<expiration-date></expiration-date>
	<save-btn></save-btn>
</b-modal>
</template>
<script>
import cupons from '@/mixins/cupons'
import AmountPercentage from '@/components/online/modals/cupons/create/AmountPercentage'
import Buyers from '@/components/online/modals/cupons/create/Buyers'
import ExpirationDate from '@/components/online/modals/cupons/create/ExpirationDate'
import SaveBtn from '@/components/online/modals/cupons/create/SaveBtn'
export default {
	mixins: [cupons],
	components: {
		AmountPercentage,
		Buyers,
		ExpirationDate,
		SaveBtn,
	}
}
</script>