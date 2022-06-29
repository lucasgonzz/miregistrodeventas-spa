<template>
	<div class="buscador m-b-15">
		<autocomplete 
		:search="search" 
		ref="article-search"			
		placeholder="Buscar un cliente"></autocomplete>
		<b-dropdown
		class="m-l-10" 
		text="Mas"
		right
		variant="primary">
			<b-dropdown-item
			v-b-modal="'create-client'">
				<i class="icon-plus"></i>
				Nuevo cliente
			</b-dropdown-item>
			<b-dropdown-item
			@click="updateClients">
				<i class="icon-redo"></i>
				Actualizar lista de clientes
			</b-dropdown-item>
			<b-dropdown-item
			v-b-modal="'import-clients'">
				<i class="icon-download"></i>
				Importar clientes
			</b-dropdown-item>
		</b-dropdown>
	</div>
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
		updateClients() {
			this.$store.dispatch('clients/getModels')
		},
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
<style lang="sass">
.buscador 
	// width: 100%
	display: flex
	justify-content: space-between
	&>div
		width: 90%
	.dropdown
		width: auto
</style>