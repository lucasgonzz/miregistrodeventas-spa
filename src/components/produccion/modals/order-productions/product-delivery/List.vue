<template>
	<div
	class="m-t-15">
		<div
		v-if="product.deliveries.length">
			<b-table
			responsive
			class="shadow-1 b-r-1"
			head-variant="dark"
			striped 
			:fields="fields"
			:items="items">
				<template 
				#cell(options)="data">
					<b-button
					size="sm"
					@click="deleteDelivery(product.deliveries[data.index])"
					variant="danger">
						<i class="icon-trash"></i>
					</b-button>
				</template>
			</b-table> 
		</div>
		<p 
		v-else
		class="text-with-icon">
			<i class="icon-eye-slash"></i>
			No hay entregas		
		</p>
	</div>
</template>
<script>
import product_deliveries from '@/mixins/product_deliveries'
export default {
	mixins: [product_deliveries],
	computed: {
		fields() {
			return [
				{key: 'date', label: 'Fecha', class: 'text-center'},
				{key: 'amount', label: 'Cantidad', class: 'text-center'},
				{key: 'note', label: 'Nota', class: 'text-center'},
				{key: 'options', label: ''},
			]
		},
		items() {
			let items = []
			this.product.deliveries.forEach(item => {
				items.push({
					date: this.date(item.created_at),
					amount: item.amount,
					note: item.note,
				})
			})
			return items
		},
	},
	methods: {
		deleteDelivery(delivery) {
			this.$store.commit('produccion/order_productions/product_deliveries/setDelete', delivery)
			this.$bvModal.show('delete-product-delivery')
		},
	}
} 
</script>