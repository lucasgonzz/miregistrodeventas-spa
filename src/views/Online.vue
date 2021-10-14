<template>
	<div id="online">
		<map-address></map-address>
		<answer></answer>
		<cancel-order></cancel-order>
		<views></views>
		<buyer-views></buyer-views>
		<nav-component></nav-component>
		<orders></orders>
		<questions
		ref="questions"
		@answer="answer"></questions>
		<buyers></buyers>
		<messages></messages>
		<cupons></cupons>
		<examine
		v-show="view == 'examine'"
		ref="examine"></examine>
	</div>
</template>
<script>
import NavComponent from '@/components/online/components/NavComponent'
import Orders from '@/components/online/components/orders/Orders'
import Questions from '@/components/online/components/questions/Questions'
import Buyers from '@/components/online/components/buyers/Index'
import Messages from '@/components/online/components/messages/Index'
import Cupons from '@/components/online/components/cupons/Index'
import Examine from '@/components/online/components/examine/Index'
import Answer from '@/components/online/modals/Answer'
import CancelOrder from '@/components/online/modals/orders/CancelOrder'
import Views from '@/components/online/modals/examine/Views'
import BuyerViews from '@/components/online/modals/examine/BuyerViews'
import MapAddress from '@/components/common/MapAddress'
import online from '@/mixins/online'
export default {
	components: {
		NavComponent,
		Orders,
		Questions,
		Examine,
		Buyers,
		Messages,
		Cupons,
		Answer,
		CancelOrder,
		Views,
		BuyerViews,
		MapAddress,
	},
	mixins: [online],
	computed: {
	},
	methods: {
		answer(question) {
			this.question = question
		},
	}
}
</script>
<style scoped lang="sass">
.col-nav 
	justify-content: flex-start
	margin-bottom: 1em
.col-orders
	flex-wrap: wrap
	.card 
		&:first-child
			margin-bottom: 1em
		width: 100%
.col-questions
	max-height: 75vh
	overflow-y: auto
</style>