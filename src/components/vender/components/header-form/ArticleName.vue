<template>
	<b-col
	cols="12"
	:lg="col_header_lg"
	class="col-autocomplete margin-bottom-since-lg">
        <!-- <autocomplete 
        ref="articleName"
        :search="search" 
        @keydown.shift="callVender"
		:get-result-value="getResultValue"
        auto-select
        placeholder="Buscar un artículo"
        @submit="setArticleForSale"></autocomplete> -->
		<!-- <select-component
		full_width
		auto_select
		:bus="bus"
		:id="id"
		@setSelected="setSelectedName"
		placeholder="Buscar un artículo"
		:models="articles"></select-component> -->

		<select-component
		id="article-name"
		:model="article"
		:models="articles"
		:props_to_filter="['name', 'bar_code', 'provider_code', 'num']"
		:str_limint="2"
		prop_name="name"
		placeholder="Buscar artículo"
		:props_to_show="['bar_code', 'price', 'provider_code', 'num']"
		auto_select
		@setSelected="setArticleForSale"></select-component>
	</b-col>
</template>
<script>
import SelectComponent from '@/components/common/select/Index'
import vender from '@/mixins/vender'
export default {
	mixins: [vender],
	components : {
		SelectComponent,
	},
	computed: {
		articles() {
			return this.$store.state.articles.articles
		},
		id() {
			return 'article-sale-name'
		}
	},
	methods: {
		setSelectedName(result) {
			this.setArticleForSale(result)
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