<template>
	<b-row>
		<b-col
		cols="12"
		class="j-end">
			<div class="btn-group">
				<button 
				v-if="previus_sale.client" 
				class="btn btn-dark">
					<i class="icon-user"></i>
					{{ previus_sale.client.name }}
				</button>
				<button 
				v-if="previus_sale.created_at" 
				class="btn btn-primary">
					{{ since(previus_sale.created_at) }}
				</button>
				<button 
				v-if="previus_sale.debt" 
				class="btn btn-danger">
					Debe {{ price(total - previus_sale.debt) }}
				</button>
			</div>
		</b-col>
	</b-row>
</template>
<script>
export default {
	name: 'PreviusSaleData',
	computed: {
		previus_sale() {
			return this.$store.state.vender.previus_sales.previus_sale
		},
		total() {
			return this.$store.state.vender.total
		},
	}
}
</script>