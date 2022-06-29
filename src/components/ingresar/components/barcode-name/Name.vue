<template>
	<b-col>
		<b-form-group
		class="col-autocomplete"
		label="Nombre"
		label-for="article-name">
			<b-form-input
			v-show="article.bar_code != ''"
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


			<select-component
			v-show="article.bar_code == ''"
			:id="id_name"
			:model="article"
			:models="articles"
			placeholder="Nombre"
			:props_to_show="['bar_code', 'price']"
			select_empty
			@selectEmpty="changeToCost"
			@setSelected="setSelectedArticle"></select-component>

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
import SelectComponent from '@/components/common/select/Index'
// import Autocomplete from '@trevoreyre/autocomplete-vue'
// import '@trevoreyre/autocomplete-vue/dist/style.css'
import edit_articles from '@/mixins/edit_articles'
export default {
	props: ['article'],
	components: {
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
	},
	methods: {
		changeToCost() {
			document.getElementById('article-cost').focus()
		},
		setSelectedArticle(result) {
			this.$store.commit('articles/setEdit', this.setArticle(result))
			this.$bvModal.show('edit-article')
		},
	},
}
</script>

