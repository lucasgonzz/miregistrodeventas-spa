<template>
<b-modal id="providers-history" size="lg" :title="`Proveedores de ${this.article.name}`" hide-footer body-class="p-0">
	<div class="table-responsive">
		<b-table class="text-center" striped hover :items="items"></b-table>
	</div>
</b-modal>
</template>
<script>
export default {
	computed: {
		article() {
			return this.$store.state.articles.article_providers_history
		},
		items() {
			let items = []
			if (this.article.providers) {
				this.article.providers.forEach(provider => {
					let item = {}
					item.fecha = this.date(provider.pivot.created_at)
					item.nombre = provider.name
					item.costo = this.price(provider.pivot.cost)
					item.precio = this.price(provider.pivot.price)
					if (provider.pivot.amount) {
						item.cantidad = provider.pivot.amount
					} else {
						item.cantidad = 'Sin uso'
					}
					items.push(item)
				})
			}
			return items
		}
	}
}
</script>