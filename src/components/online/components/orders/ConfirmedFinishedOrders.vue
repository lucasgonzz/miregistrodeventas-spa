<template>
	<b-card
	no-body
	header="Pedidos por entregar">
		<ul class="card-confirmed-body" v-show="!loading && orders.length">
			<li
			v-for="order in orders"
			:key="order.id">
				<b-card
				@click="orderDetails(order)"
				class="confirmed-order"
				no-body>
					<div
					class="confirmed-order-body">
						<p
						class="buyer-name">
							Pedido de <strong>{{ buyerName(order) }}</strong> 
						</p>
						<p class="total">
							{{ price(total(order)) }}
						</p>
						<b-button
						size="sm"
						@click="delivered(order)"
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
						@click="delivered(order)"
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
		<cargando
		size="sm"
		:is_loading="loading"></cargando>
	</b-card>
</template>
<script>
import Cargando from '@/components/common/Cargando'
import Mixin from '@/mixins/online'
export default {
	name: 'ConfirmedFinishedOrders',
	components: {
		Cargando
	},
	mixins: [Mixin],
	data() {
		return {
			orders: [],
			loading: false,
			loading_deliver: false,
		}
	},
	methods: {
		getOrders() {
			this.loading = true
			this.$api.get('/orders/confirmed-finished')
			.then(res => {
				this.loading = false
				this.orders = res.data.orders
			})
			.catch(err => {
				this.loading = false
				console.log(err)
			})
		},
		delivered(order) {
			this.loading_deliver = true
			this.$api.get(`/orders/deliver/${order.id}`)
			.then(res => {
				this.loading_deliver = false
				this.getOrders()
				this.$store.commit('sales/addSale', res.data.sale)
			})
			.catch(err => {
				this.loading_deliver = false
				console.log(err)
			})
		},
		orderDetails(order) {
			if (order.status == 'confirmed') {
				this.$emit('setOrder', order)
				this.$bvModal.show('confirmed-order-details')
			}
		}
	},
	created() {
		this.getOrders()
	}
}
</script>
<style scoped lang="sass">
.no-orders
	text-align: center
	font-size: 1.2em
	margin: 1em 0
	.icon 
		display: block
		font-size: 3em
.card-confirmed-body
	width: 100%
	padding: .5em
	margin: 0
	overflow-x: scroll
	display: flex
	flex-direction: row
	flex-wrap: nowrap
	li 
		display: table
		padding: 0 .5em
		width: 200px
		.confirmed-order
			cursor: pointer
			border: none
			-webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75)
			-moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75)
			box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75)	
			&:hover
				-webkit-box-shadow: 0px 0px 7px 0px rgba(0,0,0,1)
				-moz-box-shadow: 0px 0px 7px 0px rgba(0,0,0,1)
				box-shadow: 0px 0px 7px 0px rgba(0,0,0,1)	
			.confirmed-order-body
				padding: 1em
				button 
					margin-top: .5em
				.buyer-name 
					text-align: center
					margin-bottom: .5em
				.total
					text-align: center
					margin-bottom: 0
					font-weight: bold
				.since 
					margin-top: .5em
					margin-bottom: 0
					font-size: .7em
					text-align: right
					color: rgba(0,0,0,.5)
</style>