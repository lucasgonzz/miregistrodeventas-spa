<template>
    <autocomplete 
    ref="articleName"
    :search="search" 
    @keydown.shift="callVender"
	:get-result-value="getResultValue"
    auto-select
    placeholder="Buscar un artículo"
    @submit="setSelected"></autocomplete>
</template>
<script>
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'
export default {
	components : {
		Autocomplete,
	},
	computed: {
		articles() {
			return this.$store.state.articles.articles
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
			return `${article.name} | ${this.articlePrice(article)}`
		},
		setSelected(article) {
			let input = document.getElementsByClassName('autocomplete-input')[0]
			if (article) {
				let art = this.articles.find(art_ => {
					return art_.id == article.id
				})
				this.$emit('setSelected', art)
			} else {
				this.$emit('setSelected', input.value)
			}
			console.log(input.value)
			input.value = ''
			console.log(input.value)
		}
	}
}
</script>