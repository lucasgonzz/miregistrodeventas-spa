<template>
	<b-col>
		<b-form-group
		class="col-autocomplete"
		label="Nombre"
		label-for="article-name">
			<search-component
			v-if="article.bar_code == ''"
			class="m-b-15"
			@setSelected="setSelectedArticle"
			:models="modelsStoreFromName('article')"
			model_name="article"
			:properties_to_filter="properties_to_filter"
			:clear_query="false"
			placeholder="Nombre"></search-component>

			<b-form-input
			v-else
			type="text"
			id="article-name"
			@keydown.enter="changeToCost"
			placeholder="Ingresa el nombre del producto"
			autocomplete="off"
			v-model="article.name"></b-form-input>

			<!-- <select-component
			full_width
			select_empty
			:id="id_name"
			@setSelected="setSelectedArticle"
			placeholder="Nombre del artículo"
			:model="article"
			:models="articles"></select-component> -->


			<!-- <select-component
			v-show="article.bar_code == ''"
			:id="id_name"
			:model="article"
			:models="articles"
			placeholder="Nombre"
			:props_to_show="['bar_code', 'price']"
			select_empty
			@selectEmpty="changeToCost"
			@setSelected="setSelectedArticle"></select-component> -->

			<!-- <autocomplete 
			data-position="below"
			ref="articleName"
			v-show="article.bar_code == ''"
			:search="search" 
			@change="change"
			:get-result-value="getResultValue"
			placeholder="Buscar un artículo"
			@submit="setSelectedArticle"></autocomplete> -->
		</b-form-group>
	</b-col>
</template>
<script>
import SearchComponent from '@/components/common/search/Index'
import SelectComponent from '@/components/common/select/Index'
// import Autocomplete from '@trevoreyre/autocomplete-vue'
// import '@trevoreyre/autocomplete-vue/dist/style.css'
import edit_articles from '@/mixins/edit_articles'
export default {
	props: ['article'],
	components: {
		SearchComponent,
		SelectComponent,
		// Autocomplete
	},
	mixins: [edit_articles],
	computed: {
		articles() {
			return this.$store.state.articles.articles
		},
		id_name() {
			return 'select-article-name'
		},
		properties_to_filter() {
			return [
				{
					text: 'Nombre',
					key: 'name',
					type: 'text',
					value: '',
				},
				{
					text: 'Codigo de Barras',
					key: 'bar_code',
					type: 'text',
					value: '',
				},
				{
					text: 'Codigo Proveedor',
					key: 'provider_code',
					type: 'text',
					value: '',
				},
				{
					text: 'N°',
					key: 'num',
					type: 'text',
					value: '',
				},
			]
		},
	},
	methods: {
		changeToCost() {
			document.getElementById('article-cost').focus()
		},
		setSelectedArticle(result) {
			console.log(result)
			if (result.model) {
				this.$store.commit('article/setModel', {model: this.setArticle(result.model), properties: []})
				this.$bvModal.show('edit-article')
			} else {
				this.article.name = result.query
				setTimeout(() => {
					this.changeToCost()
				}, 200)
			}
		},
	},
}
</script>

