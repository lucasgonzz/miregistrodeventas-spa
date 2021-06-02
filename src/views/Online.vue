<template>
	<div id="online">
		<answer></answer>
		<cancel-order></cancel-order>
		<nav-component></nav-component>
		<orders
		v-show="view == 'orders'"></orders>
		<questions
		v-show="view == 'questions'"
		ref="questions"
		@answer="answer"></questions>
		<examine
		v-show="view == 'examine'"
		ref="examine"></examine>
	</div>
</template>
<script>
import NavComponent from '@/components/online/components/NavComponent'
import Orders from '@/components/online/components/orders/Orders'
import Questions from '@/components/online/components/questions/Questions'
import Examine from '@/components/online/components/examine/Examine'
import Answer from '@/components/online/modals/Answer'
import CancelOrder from '@/components/online/modals/orders/CancelOrder'
// import Views from '@/components/online/modals/examine/Views'
export default {
	components: {
		NavComponent,
		Orders,
		Questions,
		Examine,
		Answer,
		CancelOrder,
	},
	computed: {
		view() {
			return this.$store.state.online.view
		}
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