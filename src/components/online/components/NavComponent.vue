<template>
	<b-row>
		<b-col
		cols="12"
		class="col-nav">
			<b-nav tabs>
				<b-nav-item
				@click="setView('orders')"
				:active="view == 'orders' ? true : false">
					Pedidos
					<b-badge
					variant="primary"
					v-show="orders.length">
						{{ orders.length }}
					</b-badge>
				</b-nav-item>
				<b-nav-item
				@click="setView('questions')"
				:active="view == 'questions' ? true : false">
					Preguntas
					<b-badge
					variant="primary"
					v-show="questions.length">
						{{ questions.length }}
					</b-badge>
				</b-nav-item>
				<!-- <b-nav-item
				@click="setView('examine')"
				:active="view == 'examine' ? true : false">
					Examinar
				</b-nav-item> -->
			</b-nav>
		</b-col>
	</b-row>
</template>
<script>
export default {
	name: 'NavComponentOnline',
	computed: {
		view() {
			return this.$store.state.online.view
		},
		orders() {
			return this.$store.state.online.orders.unconfirmed_orders
		},
		questions() {
			return this.$store.state.online.questions.questions
		},
	},
	methods: {
		setView(view) {
			this.$store.commit('online/setView', view)
			if (view == 'orders') {
				this.getOrders()
			} else if (view == 'questions') {
				this.getQuestions()
			}
		},
		getOrders() {
			this.$store.dispatch('online/orders/getUnconfirmedOrders')
			this.$store.dispatch('online/orders/getConfirmedFinishedOrders')
		},
		getQuestions() {
			this.$store.dispatch('online/questions/getQuestions')
		}
	}
}
</script>
<style scoped lang="sass">
.nav-tabs
	width: 100%
	.nav-item
		margin: 0 .2em
</style>