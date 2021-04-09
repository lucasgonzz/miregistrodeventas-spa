<template>
	<b-card
	no-body
	header="Pedidos por confirmar">
		<ul 
		v-if="loading"
		class="horizontal-ul">
			<li
			v-for="i in 3"
			:key="i">
				<b-card
				class="order">
					<b-skeleton width="100%"></b-skeleton>
					<b-skeleton width="100%"></b-skeleton>
				</b-card>
			</li>
		</ul>
		<ul
		v-else 
		class="horizontal-ul">
			<li
			v-for="order in orders"
			:key="order.id">
				<b-card
				@click="orderDetails(order)"
				class="order"
				no-body>
					<div
					class="order-body">
						<p
						class="buyer-name">
							<strong>{{ buyerName(order) }}</strong> quiere hacer un pedido
						</p>
						<p class="since">
							{{ since(order.created_at) }}
						</p>
					</div>
				</b-card>
			</li>
		</ul>
		<p
		v-show="orders.length == 0 && !loading"
		class="no-orders text-success">
			<i class="icon-check icon"></i>
			No hay pedidos por confirmar
		</p>
	</b-card>
</template>
<script>
import Loading from '@/components/online/components/orders/Loading'
import Mixin from '@/mixins/online'
export default {
	name: 'UnconfirmedOrders',
	components: {
		Loading,
	},
	mixins: [Mixin],
	data() {
		return {
		}
	},
	computed: {
		orders() {
			return this.$store.state.online.orders.unconfirmed_orders
		},
		loading() {
			return this.$store.state.online.orders.loading_unconfirmed_orders
		}
	},
	methods: {
		orderDetails(order) {
			this.$store.commit('online/orders/setUnconfirmedOrderDetails', order)
			this.$bvModal.show('unconfirmed-order-details')
		}
	},
	created() {
	}
}
</script>
<style scoped lang="sass">
.buyer-name 
	text-align: center
	margin-bottom: 0
.since 
	margin-top: .5em
	margin-bottom: 0
	font-size: .7em
	text-align: right
	color: rgba(0,0,0,.5)
.card-footer
	display: flex
	justify-content: flex-end
	padding: 0
	button 
		margin: .5em
		// @media screen and (max-width: 576px)
</style>