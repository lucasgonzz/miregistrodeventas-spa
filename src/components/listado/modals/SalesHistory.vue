<template>
<b-modal 
v-if="model && model.providers"
id="sales-history" 
size="md" 
:title="`Ventas de ${this.model.name}`" 
hide-footer>
	<b-table 
	class="m-b-0 shadow-2 b-r-1"
	v-if="model.providers.length"
	striped 
	head-variant="dark" 
	:items="items"
	:fields="fields"></b-table>
	<p 
	v-else
	class="text-with-icon">
		<i class="icon-eye-slash"></i>
		No hay proveedores
	</p>
</b-modal>
</template>
<script>
export default {
	computed: {
		model() {
			return this.$store.state.article.model 
		},
		fields() {
			return [
				{key: 'date', label: 'Fecha'},
				{key: 'name', label: 'Nombre'},
				{key: 'cost', label: 'Costo'},
				// {key: 'price', label: 'Precio'},
				{key: 'amount', label: 'Cantidad'},
			]
		},
		items() {
			let items = []
			if (this.model.providers) {
				this.model.providers.forEach(provider => {
					items.push({
						date: this.date(provider.pivot.created_at),
						name: provider.name,
						cost: this.price(provider.pivot.cost),
						price: this.price(provider.pivot.price),
						amount: provider.pivot.amount,
					})
				})
			}
			return items
		}
	}
}
</script>