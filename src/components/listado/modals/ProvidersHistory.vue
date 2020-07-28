<template>
<b-modal id="providers-history" size="lg" :title="`Proveedores de ${this.article.name}`" hide-footer body-class="al-borde">
	<b-table class="text-center" striped hover :items="items"></b-table>
</b-modal>
</template>
<script>
export default {
	props: ['article'],
	computed: {
		items() {
			let items = []
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
			return items
		}
	}
}
</script>