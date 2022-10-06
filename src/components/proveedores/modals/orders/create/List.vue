<template>
	<div
	class="m-b-15">
		<b-table
		class="shadow-1 b-r-1"
		responsive
		head-variant="dark" 
		v-if="articles.length"
		striped
		:fields="fields"
		:items="items">
			<template #cell(code)="data">
				<b-form-input
				v-if="showInputName(articles[data.index])"
				placeholder="Nombre"
				v-model="articles[data.index].bar_code"></b-form-input>
				<span
				v-else>
					{{ articles[data.index].bar_code }}
				</span>
			</template>
			<template #cell(name)="data">
				<b-form-input
				v-if="showInputName(articles[data.index])"
				placeholder="Nombre"
				v-model="articles[data.index].name"></b-form-input>
				<span
				v-else>
					{{ articles[data.index].name }}
				</span>
			</template>
			<template #cell(amount)="data">
				<b-form-input
				class="input-amount"
				placeholder="Cantidad"
				type="number"
				v-model="articles[data.index].amount"></b-form-input>
			</template>
			<template #cell(notes)="data">
				<b-form-textarea
				placeholder="Notas"
				v-model="articles[data.index].notes"></b-form-textarea>
			</template>
			<template #cell(received)="data">
				<b-button
				@click="received(articles[data.index])"
				size="sm"
				variant="primary"> 
					{{ articles[data.index].received }}
				</b-button>
			</template>
			<template #cell(options)="data">
				<b-button
				@click="deleteItem(articles[data.index])"
				size="sm"
				variant="danger"> 
					<i class="icon-trash"></i>
				</b-button>
			</template>
		</b-table>
		<p 
		v-else 
		class="text-with-icon">
			<i class="icon-eye-slash"></i>
			No hay articulos
		</p>
	</div>
</template>
<script>
import provider_orders from '@/mixins/provider_orders'
export default {
	mixins: [provider_orders],
	computed: {
		fields() {
			let fields = []
			fields.push({ key: 'code', label: 'Codigo' })
			fields.push({ key: 'name', label: 'Nombre' })
			fields.push({ key: 'amount', label: 'Cantidad' })
			fields.push({ key: 'notes', label: 'Notas' })
			if (this.edit_order) {
				fields.push({ key: 'received', label: 'Recibidas' })
			}
			fields.push({ key: 'options', label: '' })
			return fields
		},
		items() {
			let items = []
			this.articles.forEach(item => {
				items.push({
					code: item.bar_code,
					amount: item.amount,
				})
			})
			return items
		}
	},
	methods: {
		showInputName(article) {
			if (!this.edit_order && article.from_provider_order) {
				return true 
			} else if (this.edit_order && (article.from_provider_order || article.status == 'from_provider_order')) {
				return true
			}
			return false
		},
		received(item) {
			this.$store.commit('providers/orders/create/setArticleReceived', item)
			this.$bvModal.show('provider-order-article-received')
		},
		deleteItem(item) {
			this.$store.commit('providers/orders/create/deleteItem', item)
		},
	}
}
</script>
<style lang="sass">
.input-amount
	width: 80px
</style>
	