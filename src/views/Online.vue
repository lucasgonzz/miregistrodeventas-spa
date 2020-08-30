<template>
	<div id="online">
		<answer
		:question="question"></answer>
		<unconfirmed-order-details
		@updateOrders="updateOrders"
		:order="order"></unconfirmed-order-details>
		<confirmed-order-details
		:order="order"></confirmed-order-details>
		<b-row>
			<b-col
			cols="12">
				<b-card
				header="Tienda Online">
					<b-container fluid>
						<b-row>
							<b-col
							class="col-orders"
							cols="12"
							lg="9">
								<unconfirmed-orders
								ref="unconfirmedOrders"
								@setOrder="setOrder"></unconfirmed-orders>
								<confirmed-orders
								ref="confirmedOrders"
								@setOrder="setOrder"></confirmed-orders>
							</b-col>
							<b-col
							class="col-questions"
							cols="12"
							lg="3">
								<questions
								@answer="answer"></questions>
							</b-col>
						</b-row>
					</b-container>
				</b-card>
			</b-col>
		</b-row>
	</div>
</template>
<script>
import Questions from '@/components/online/components/Questions'
import UnconfirmedOrders from '@/components/online/components/UnconfirmedOrders'
import ConfirmedOrders from '@/components/online/components/ConfirmedOrders'
import UnconfirmedOrderDetails from '@/components/online/modals/UnconfirmedOrderDetails'
import ConfirmedOrderDetails from '@/components/online/modals/ConfirmedOrderDetails'
import Answer from '@/components/online/modals/Answer'
export default {
	components: {
		Questions,
		UnconfirmedOrders,
		ConfirmedOrders,
		UnconfirmedOrderDetails,
		ConfirmedOrderDetails,
		Answer,
	},
	data() {
		return {
			question: {},
			order: {}
		}
	},
	methods: {
		answer(question) {
			this.question = question
			this.$bvModal.show('answer')
		},
		setOrder(order) {
			this.order = order
		},
		updateOrders() {
			this.$refs.unconfirmedOrders.getOrders()
			this.$refs.confirmedOrders.getOrders()
		},
	}
}
</script>
<style scoped lang="sass">
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