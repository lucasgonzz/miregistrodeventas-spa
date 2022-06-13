<template>
<b-modal 
v-if="article.providers"
id="providers-history" 
size="lg" 
:title="`Proveedores de ${this.article.name}`" 
hide-footer 
body-class="p-0">
	<b-table 
	class="m-b-0"
	v-if="article.providers.length"
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
		article() {
			return this.$store.state.articles.article_providers_history
		},
		fields() {
			return [
				{key: 'date', label: 'Fecha'},
				{key: 'name', label: 'Nombre'},
				{key: 'cost', label: 'Costo'},
				{key: 'price', label: 'Precio'},
				{key: 'amount', label: 'Cantidad'},
			]
		},
		items() {
			let items = []
			if (this.article.providers) {
				this.article.providers.forEach(provider => {
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