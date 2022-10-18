<template>
	<b-col
	cols="12"
	:lg="col_header_lg"
	class="col-autocomplete margin-bottom-since-lg">
		<search-component
		id="search-article"
		@setSelected="setSelected"
		:models="modelsStoreFromName('article')"
		:model="article"
		:str_limint="3"
		:clear_query="false"
		:properties_to_filter="properties_to_filter"
		:prop="{text: 'Articulo', key: 'article_id'}"></search-component>
	</b-col>
</template>
<script>
import SearchComponent from '@/components/common/search/Index'
import vender from '@/mixins/vender'
export default {
	mixins: [vender],
	components : {
		SearchComponent,
	},
	computed: {
		articles() {
			return this.$store.state.articles.articles
		},
		id() {
			return 'article-sale-name'
		},
		properties_to_filter() {
			return [
				{key: 'num'},
				{key: 'name'},
				{key: 'provider_code'},
			]
		}
	},
	methods: {
		setSelected(result) {
			this.article.name = result.query
			this.setVenderArticle(result.model)
		},
  //       search(input) {
  //           if (input.length < 3) { return [] }
  //           return this.articles.filter(article => {
  //               return article.name && article.name.toLowerCase().includes(input.toLowerCase())
  //           })
  //       },
		// getResultValue(article) {
		// 	return `${article.name} | ${this.price(article.price)}`
		// },
	}
}
</script>