<template>
	<b-card
	no-body
	header="Pedidos por entregar">
		<ul class="card-confirmed-body" v-show="!loading">
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
						<p class="since">
							{{ since(order.created_at) }}
						</p>
					</div>
				</b-card>
			</li>
		</ul>
		<cargando
		size="sm"
		:is_loading="loading"></cargando>
	</b-card>
</template>
<script>
import Cargando from '@/components/common/Cargando'
export default {
	name: 'ConfirmedOrders',
	components: {
		Cargando
	},
	data() {
		return {
			orders: [],
			loading: false
		}
	},
	methods: {
		getOrders() {
			this.loading = true
			this.$api.get('/orders/confirmed')
			.then(res => {
				this.loading = false
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
			this.$bvModal.show('confirmed-order-details')
		}
	},
	created() {
		this.getOrders()
	}
}
</script>
<style scoped lang="sass">
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
				.buyer-name 
					text-align: center
					margin-bottom: 0
				.since 
					margin-top: .5em
					margin-bottom: 0
					font-size: .7em
					text-align: right
					color: rgba(0,0,0,.5)
		// @media screen and (max-width: 576px)
</style>