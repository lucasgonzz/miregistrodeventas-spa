<template>
<b-modal
v-if="sale"
title="Actualizar precios"
hide-footer
size="lg"
id="update-prices">
	<b-table
	class="shadow-2 b-r-1"
	head-variant="dark"
	:fields="fields"
	:items="items">
		<template #cell(price_vender)="data">
			<b-form-input
			type="number"
			placeholder="Nuevo precio"
			v-model="items[data.index].price_vender"></b-form-input>
		</template>
	</b-table>
	<btn-loader
	@clicked="update"
	:loader="loading"
	text="Actualizar"></btn-loader>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader2'
export default {
	components: {
		BtnLoader,
	},
	data() {
		return {
			loading: false,
		}
	},
	computed: {
		sale() {
			return this.$store.state.sale.details 
		},
		articles() {
			return this.$store.state.article.models 
		},
		fields() {
			return [
				{label: 'Articulo', key: 'name'},
				{label: 'Precio de venta', key: 'actual_price'},
				{label: 'Nuevo precio | Precio actual', key: 'price_vender'},
			]
		},
		items() {
			let items = []
			this.sale.articles.forEach(article => {
				items.push({
					id: article.id,
					name: article.name,
					actual_price: article.pivot.price,
					price_vender: this.getActualPrice(article)
				})
			})
			return items 
		},
	},
	methods: {
		getActualPrice(article) {
			let finded = this.articles.find(model => {
				return model.id == article.id 
			})
			if (typeof finded != 'undefined') {
				return finded.price 
			}
			return ''
		},
		update() {
			this.loading = true 
			this.$api.put('sale/update-prices/'+this.sale.id, {
				articles: this.items 
			})
			.then(res => {
				this.loading = false 
				this.$toast.success('Precios actualizados')
				this.addModel('sale', res.data.model)
				this.$bvModal.hide('update-prices')
				this.$bvModal.hide('sale-details')
			})
			.catch(err => {
				console.log(err)
				this.loading = false 
				this.$toast.error('Error al actualizar precios')
			})
		}
	}
}
</script>