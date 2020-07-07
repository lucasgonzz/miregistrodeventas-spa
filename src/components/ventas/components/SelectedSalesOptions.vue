<template>
<div class="row m-b-10" v-show="sales_length > 0">
	<div class="col">
		<img :src="asset+'imgs/arrow.png'" class="img-arrow m-l-10" alt="">
		<a v-if="canUse('sale.print', user)"
			@click="showGeneratePdf"
			href="#"
				class="btn btn-success" 
				:class="selected_sales.selected_sales.length ? '' : 'disabled'">
			<i class="icon-print"></i>
			Pdf/Imprimir
		</a>
		<a class="btn btn-danger" 
			href="#"
			@click.prevent="showConfirmDeleteSales"
			:class="selected_sales.selected_sales.length ? '' : 'disabled'">
			<i class="icon-trash-2"></i>
			Eliminar
		</a>
		<strong v-show="selected_sales.selected_sales.length" class="p-l-5">
			{{ selected_sales.selected_sales.length }} ventas seleccionadas
			<span class="p-l-5">
				Total: {{ getTotalSelectedSales() }}
			</span>
		</strong>
	</div>
</div>
</template>
<script>
export default {
	props: ['asset', 'sales_length', 'selected_sales', 'sales', 'user'],
	methods: {
		showGeneratePdf() {
			$('#generate-pdf').modal('show')
		},
		showConfirmDeleteSales() {
			$('#delete-sales').modal('show')
		},
		getTotalSelectedSales() {
			var total = 0
			this.sales.forEach(sale => {
				if (this.selected_sales.selected_sales.includes(sale.id)) {
					sale.articles.forEach(article => {
						if (article.uncontable == 1) {
							if (article.pivot.measurement == article.measurement) {
								total += parseFloat(article.pivot.price) * article.pivot.amount
							} else {
								total += parseFloat(article.pivot.price) * article.pivot.amount / 1000
							}
						} else {
							total += parseFloat(article.pivot.price) * article.pivot.amount
						}
					})
					if (sale.percentage_card) {
                		var p = Number('1.'+parseInt(sale.percentage_card))
						total = total * p
					}
				}
			})
			return this.price(total)
		}
	},
}
</script>