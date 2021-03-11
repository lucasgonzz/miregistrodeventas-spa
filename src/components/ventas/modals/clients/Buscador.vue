<template>
	<autocomplete 
	class="m-b-15"
	:search="search" 
	ref="article-search"			
	placeholder="Buscar un artículo"></autocomplete>
</template>
<script>
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'
export default {
	name: 'BuscadorClients',
	components: {
		Autocomplete
	},
	methods: {
		getResultValue(value) {
			return ''
		},
		search(value) {
			this.$store.commit('clients/setSearchQuery', value)
			return []
		},
	}
}
</script>