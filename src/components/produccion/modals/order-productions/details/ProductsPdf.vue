<template>
	<b-button
	block
	variant="outline-danger"
	@click="print">
		<i class="icon-print"></i>
		Imprimir etiquetas
	</b-button>
</template>
<script>
import order_productions from '@/mixins/order_productions'
export default {
	mixins: [order_productions],
	methods: {
		print() {
			let link = process.env.VUE_APP_API_URL+'/api/order-productions/products-pdf/'+this.edit.id
			window.open(link)
		}
	}
}
</script>