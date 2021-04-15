<template>
	<b-card
	no-body
	header="Pedidos por entregar">
		<ul
		v-if="loading" 
		class="horizontal-ul">
			<li
			v-for="i in 3"
			:key="i+'0'">
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
							Pedido de <strong>{{ buyerName(order) }}</strong> 
						</p>
						<p class="total">
							{{ price(total(order)) }}
						</p>
						<b-button
						size="sm"
						@click.stop="delivered(order)"
						block
						variant="success"
						v-show="order.status == 'finished' && order.deliver">
							<span class="spinner-border spinner-border-sm" v-show="loading_deliver"></span>
							<span v-show="!loading_deliver">
								Enviado
							</span>
						</b-button>
						<b-button
						size="sm"
						@click.stop="delivered(order)"
						block
						variant="success"
						v-show="order.status == 'finished' && !order.deliver">
							<span class="spinner-border spinner-border-sm" v-show="loading_deliver"></span>
							<span v-show="!loading_deliver">
								Retirado
							</span>
						</b-button>
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
			No hay pedidos por entregar
		</p>
	</b-card>
</template>
<script>
import Cargando from '@/components/common/Cargando'
import Mixin from '@/mixins/online'
import Loading from '@/components/online/components/orders/Loading'
export default {
	name: 'ConfirmedFinishedOrders',
	components: {
		Loading,
	},
	mixins: [Mixin],
	data() {
		return {
			loading_deliver: false,
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
			this.loading_deliver = true
			this.$api.get(`/orders/deliver/${order.id}`)
			.then(res => {
				this.loading_deliver = false
				this.$store.commit('sales/addSale', res.data.sale)
				this.$store.dispatch('online/orders/getConfirmedFinishedOrders')
			})
			.catch(err => {
				this.loading_deliver = false
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