<template>
	<!-- <div 
	class="p-15"
	v-if="selected_articles.length">
		<b-button
		block 
		@click="create"
		variant="primary">
			<i class="icon-plus"></i>
			Nuevo combo con los {{ selected_articles.length }} artículos seleccionados
		</b-button>
	</div> -->
	<div 
	class="p-15">
		<b-button
		block 
		@click="create"
		variant="primary">
			<i class="icon-plus"></i>
			Crear combo
		</b-button>
	</div>
</template>
<script>
import combos from '@/mixins/combos'
export default {
	mixins: [combos],
	methods: {
		create() {
			this.$store.commit('combos/model/setModel', {
				id: null,
				name: '',
				price: ''
			})
			this.$store.commit('combos/model/setArticles', [])
			this.$bvModal.show('combo')
		}
	}
}
</script>