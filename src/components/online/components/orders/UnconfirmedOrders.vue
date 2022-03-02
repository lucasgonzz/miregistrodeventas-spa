<template>
	<b-card
	no-body
	header="Pedidos por confirmar">
		<loading
		v-if="loading"></loading>
		<div
		v-else>
			<ul
			v-if="orders.length"
			class="horizontal-ul">
				<li
				v-for="order in orders"
				:key="order.id">
					<order-card
					:order="order"></order-card>
				</li>
			</ul>
			<p
			v-show="orders.length == 0 && !loading"
			class="text-with-icon">
				<i class="icon-check"></i>
				No hay pedidos por confirmar
			</p>
		</div>
	</b-card>
</template>
<script>
import Loading from '@/components/online/components/orders/Loading'
import OrderCard from '@/components/online/components/orders/OrderCard'
import Mixin from '@/mixins/online'
export default {
	name: 'UnconfirmedOrders',
	components: {
		Loading,
		OrderCard,
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
	created() {
	}
}
</script>
<style scoped lang="sass">
// .buyer-name 
// 	text-align: center
// 	margin-bottom: 0
// .since 
// 	margin-top: .5em
// 	margin-bottom: 0
// 	font-size: .7em
// 	text-align: right
// 	color: rgba(0,0,0,.5)
// .card-footer
// 	display: flex
// 	justify-content: flex-end
// 	padding: 0
// 	button 
// 		margin: .5em
		// @media screen and (max-width: 576px)
</style>