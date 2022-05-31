<template>
	<b-card
	no-body
	header="Pedidos por entregar">
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
					:order="order">
						<b-button
						class="m-b-15"
						size="sm"
						@click.stop="delivered(order)"
						block
						variant="success"
						v-show="order.status == 'finished' && order.deliver">
							<btn-loader
							:index="order.id"
							:loader="loading_deliver"
							text="Enviado"></btn-loader>
						</b-button>
						<b-button
						class="m-b-15"
						size="sm"
						@click.stop="delivered(order)"
						block
						variant="success"
						v-show="order.status == 'finished' && !order.deliver">
							<btn-loader
							:index="order.id"
							:loader="loading_deliver"
							text="Retirado"></btn-loader>
						</b-button>
					</order-card>
				</li>
			</ul>
			<p
			v-else
			class="text-with-icon">
				<i class="icon-check"></i>
				No hay pedidos por entregar
			</p>
		</div>
	</b-card>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
import Mixin from '@/mixins/online'
import OrderCard from '@/components/online/components/orders/OrderCard'
import Loading from '@/components/online/components/orders/Loading'
export default {
	name: 'ConfirmedFinishedOrders',
	components: {
		Loading,
		BtnLoader,
		OrderCard,
	},
	mixins: [Mixin],
	data() {
		return {
			loading_deliver: 0,
		}
	},
	computed: {
		orders() {
			return this.$store.state.online.orders.confirmed_finished_orders
		},
		loading() {
			return this.$store.state.online.orders.loading_confirmed_finished_orders
		},
	},
	methods: {
		delivered(order) {
			this.loading_deliver = order.id
			this.$api.get(`/orders/deliver/${order.id}`)
			.then(res => {
				this.loading_deliver = 0
				this.$store.commit('sales/addSale', res.data.sale)
				this.$store.commit('sales/setTotal', null)
				this.$store.dispatch('online/orders/getConfirmedFinishedOrders')
			})
			.catch(err => {
				this.loading_deliver = 0
				console.log(err)
			})
		},
		orderDetails(order) {
			// if (order.status == 'confirmed') {
				this.$store.commit('online/orders/setConfirmedFinishedOrderDetails', order)
				this.$bvModal.show('confirmed-finished-order-details')
			// }
		}
	},
}
</script>