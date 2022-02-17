<template>
<div>
	<b-table
	v-if="prices_lists.length"
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
				<btn-loader
				:loader="deleting"
				:index="prices_lists[data.index].id"
				icon="trash"></btn-loader>
			</b-button>
		</template>
	</b-table>
	<p 
	v-else
	class="text-with-icon">
		<i class="icon-cancel"></i>
		No hay listas de precios creadas
	</p>
</div>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
import mixin from '@/mixins/prices_lists'
export default {
	mixins: [mixin],
	components: {
		BtnLoader,
	},
	data() {
		return {
			deleting: 0,
		}
	},
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
	},
	methods: {
		deletePricesList(prices_list) {
			this.deleting = prices_list.id 
			this.$api.delete('prices-lists/'+prices_list.id)
			.then(() => {
				this.deleting = 0
				this.$store.commit('prices_lists/delete', prices_list.id)
				this.$toast.success('Lista de precios eliminada')
			})
			.catch(err => {
				console.log(err)
				this.$toast.error('Error al eliminar lista de precios')
			})
		}
	}
}
</script>