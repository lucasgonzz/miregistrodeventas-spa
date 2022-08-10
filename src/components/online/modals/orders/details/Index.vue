<template>
<b-modal 
v-if="order_details"
id="order-details" 
title="Detalles del pedido" 
size="lg" 
hide-footer>
	<articles></articles>	
	<cupon></cupon>	
	<payment-method></payment-method>
	<delivery-zone></delivery-zone>
	<deliver></deliver>	
	<description></description>	
	<total></total>	
	<since></since>	
	<buyer></buyer>	
	
	<btn-confirm></btn-confirm>
	<btn-finish></btn-finish>
	<btn-cancel></btn-cancel>
</b-modal>
</template>
<script>
import Articles from '@/components/online/modals/orders/details/Articles'
import Cupon from '@/components/online/modals/orders/details/Cupon'
import PaymentMethod from '@/components/online/modals/orders/details/PaymentMethod'
import DeliveryZone from '@/components/online/modals/orders/details/DeliveryZone'
import Deliver from '@/components/online/modals/orders/details/Deliver'
import Description from '@/components/online/modals/orders/details/Description'
import Total from '@/components/online/modals/orders/details/Total'
import Since from '@/components/online/modals/orders/details/Since'
import Buyer from '@/components/online/modals/orders/details/Buyer'
import BtnConfirm from '@/components/online/modals/orders/details/BtnConfirm'
import BtnFinish from '@/components/online/modals/orders/details/BtnFinish'
import BtnCancel from '@/components/online/modals/orders/details/BtnCancel'

import BtnLoader from '@/components/common/BtnLoader'
import orders from '@/mixins/orders'
export default {
	components: {
		Articles,
		Cupon,
		PaymentMethod,
		DeliveryZone,
		Deliver,
		Description,
		Total,
		Since,
		Buyer,
		BtnConfirm,
		BtnFinish,
		BtnCancel,

		BtnLoader,
	},
	mixins: [orders],
}
</script>
