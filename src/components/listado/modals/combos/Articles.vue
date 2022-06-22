<template>
	<div>
		<p>
			Articulos
		</p>
		<select-component
		class="m-b-10"
		id="combo-article"
		:model="article"
		:models="articles"
		prop_name="name"
		placeholder="Buscar articulo"
		:props_to_show="['bar_code', 'price']"
		@setSelected="setSelectedArticle"></select-component>
		<b-table
		v-if="model_articles.length"
		class="shadow-2 b-r-1"
		head-variant="dark"
		:fields="fields"
		:items="items">
			<template #cell(amount)="data">
				<b-form-input
				placeholder="Cantidad"
				v-model="model_articles[data.index].amount"></b-form-input>
			</template>
			<template #cell(delete)="data">
				<b-button
				size="sm"
				variant="danger"
				@click="deleteArticle(model_articles[data.index])">
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
import SelectComponent from '@/components/common/select/Index'
import combos from '@/mixins/combos'
export default {
	mixins: [combos],
	components: {
		SelectComponent,
	},
	computed: {
		fields() {
			return [
				{key: 'name', label: 'Nombre', class: 'text-center'},
				{key: 'amount', label: 'Cantidad', class: 'text-center'},
				{key: 'delete', label: '', class: 'text-center'},
			]
		},
		items() {
			let items = []
			this.model_articles.forEach(item => {
				items.push({
					name: item.name
				})
			})
			return items
		},
		articles() {
			return this.$store.state.articles.articles
		},
	},
	data() {
		return {
			article: {
				name: ''
			},
		}
	},
	methods: {
		setSelectedArticle(result) {
			let article = {
				...result,
				amount: '',
			}
			this.$store.commit('combos/model/addArticle', article)
			this.article.name = ''
		},
		deleteArticle(article) {
			this.$store.commit('combos/model/deleteArticle', article)
		}
	}
}
</script>