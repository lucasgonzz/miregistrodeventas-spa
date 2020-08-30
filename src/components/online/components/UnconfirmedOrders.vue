<template>
	<b-card
	no-body
	header="Pedidos por confirmar">
		<ul class="card-unconfirmed-body" v-show="!loading && orders.length">
			<li
			v-for="order in orders"
			:key="order.id">
				<b-card
				@click="orderDetails(order)"
				class="unconfirmed-order"
				no-body>
					<div
					class="unconfirmed-order-body">
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
		<cargando
		size="sm"
		:is_loading="loading"></cargando>
	</b-card>
</template>
<script>
import Cargando from '@/components/common/Cargando'
export default {
	name: 'UnconfirmedOrders',
	components: {
		Cargando
	},
	data() {
		return {
			orders: [],
			loading: false,
		}
	},
	methods: {
		getOrders() {
			this.loading = true
			this.$api.get('/orders/unconfirmed')
			.then(res => {
				this.loading = false
				console.log(res.data.orders)
				this.orders = res.data.orders
			})
			.catch(err => {
				this.loading = false
				console.log(err)
			})
		},
		buyerName(order) {
			return `${order.buyer.name} ${order.buyer.surname}`
		},
		orderDetails(order) {
			this.$emit('setOrder', order)
			this.$bvModal.show('unconfirmed-order-details')
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
.card-unconfirmed-body
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
		.unconfirmed-order
			cursor: pointer
			border: none
			-webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75)
			-moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75)
			box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75)	
			&:hover
				-webkit-box-shadow: 0px 0px 7px 0px rgba(0,0,0,1)
				-moz-box-shadow: 0px 0px 7px 0px rgba(0,0,0,1)
				box-shadow: 0px 0px 7px 0px rgba(0,0,0,1)	
			.unconfirmed-order-body
				padding: 1em
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