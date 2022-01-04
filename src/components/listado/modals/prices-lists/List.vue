<template>
<b-table
head-variant="dark"
:fields="fields"
:items="items">
	<template #cell(options)="data">
		<b-button
		variant="primary"
		@click="print(prices_lists[data.index])">
			<i class="icon-print"></i>
		</b-button>
		<b-button
		class="m-l-10"
		variant="danger"
		@click="deletePricesList(prices_lists[data.index])">
			<i class="icon-trash-3"></i>
		</b-button>
	</template>
</b-table>
</template>
<script>
import mixin from '@/mixins/prices_lists'
export default {
	mixins: [mixin],
	computed: {
		fields() {
			return [
				{ key: 'date', label: 'Fecha', class: 'text-center' },
				{ key: 'name', label: 'Nombre', sortable: true, class: 'text-center' },
				{ key: 'articles', label: 'Articulos', sortable: true, class: 'text-center'},
				{ key: 'options', label: 'Opciones', class: 'text-center'},
			]
		},
		items() {
			let items = []
			this.prices_lists.forEach(prices_list => {
				items.push({
					name: prices_list.name,
					date: this.date(prices_list.created_at),
					articles: prices_list.articles.length,
				})
			})
			return items
		},
	}
}
</script>