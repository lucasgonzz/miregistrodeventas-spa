<template>
	<b-col
	cols="12"
	lg="5"
	class="col-autocomplete margin-bottom-since-lg">
        <autocomplete 
        ref="articleName"
        :search="search" 
        @keydown.shift="callVender"
		:get-result-value="getResultValue"
        auto-select
        placeholder="Buscar un artículo"
        @submit="setArticleForSale"></autocomplete>
	</b-col>
</template>
<script>
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'
import vender from '@/mixins/vender'
export default {
	mixins: [vender],
	components : {
		Autocomplete,
	},
	computed: {
		articles() {
			return this.$store.state.articles.articles
		},
		clear_article_name() {
			return this.$store.state.vender.clear_article_name
		},
	},
	watch: {
		clear_article_name() {
			this.$refs.articleName.value = ''
		},
	},
	methods: {
        search(input) {
            if (input.length < 3) { return [] }
            return this.articles.filter(article => {
                return article.name && article.name.toLowerCase().includes(input.toLowerCase())
            })
        },
		getResultValue(article) {
			return `${article.name} | ${this.price(article.price)}`
		},
	}
}
</script>