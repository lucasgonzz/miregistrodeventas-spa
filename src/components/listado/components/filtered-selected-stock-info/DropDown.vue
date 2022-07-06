<template>
	<b-dropdown
	class="selected-drop-down"
	right
	variant="primary"
	v-show="show"
	:text="text">
		<b-dropdown-item
		v-if="selected_articles.length"
		@click="selectAll">
			<i class="icon-check"></i>
			Seleccionar todo
		</b-dropdown-item>
		<b-dropdown-item
		v-if="selected_articles.length"
		@click="deselectAll">
			<i class="icon-not"></i>
			Deseleccionar todo
		</b-dropdown-item>
		<b-dropdown-item
		@click="byPercentage">
			<i class="icon-plus"></i>
			Aumentar %
		</b-dropdown-item>
		<b-dropdown-item
		@click="subcategory">
			<i class="icon-redo"></i>
			SubCategoria
		</b-dropdown-item>
		<b-dropdown-item
		@click="iva">
			<i class="icon-redo"></i>
			Iva
		</b-dropdown-item>
		<b-dropdown-item
		@click="brand">
			<i class="icon-redo"></i>
			Marca
		</b-dropdown-item>
		<b-dropdown-item
		@click="deleteArticles"
		v-b-modal="''">
			<i class="icon-trash"></i>
			Eliminar
		</b-dropdown-item>
	</b-dropdown>
</template>
<script>
export default {
	props: {
		from_filter: {
			type: Boolean,
			default: false
		},
	},
	computed: {
		show() {
			if (this.from_filter) {
				return this.filtered.length
			}
			return this.selected_articles.length
		},
		text() {
			if (this.from_filter) {
				return this.filtered.length+' artículos filtrados'
			}
			return this.selected_articles.length+' artículos seleccionados'
		},
		filtered() {
			return this.$store.state.articles.filtered
		},
		selected_articles() {
			return this.$store.state.articles.selected_articles
		},
	},
	methods: {
		selectAll() {
			this.$store.commit('articles/setAllArticlesSelected', true)
		},
		deselectAll() {
			this.$store.commit('articles/setAllArticlesSelected', false)
		},
		byPercentage() {
			this.$store.commit('articles/setFromFilter', this.from_filter)
			this.$bvModal.show('update-by-porcentage')
		},
		subcategory() {
			this.$store.commit('articles/setFromFilter', this.from_filter)
			this.$bvModal.show('update-sub-category')
		},
		iva() {
			this.$store.commit('articles/setFromFilter', this.from_filter)
			this.$bvModal.show('update-iva')
		},
		brand() {
			this.$store.commit('articles/setFromFilter', this.from_filter)
			this.$bvModal.show('update-brand')
		},
		deleteArticles() {
			this.$store.commit('articles/setFromFilter', this.from_filter)
			this.$bvModal.show('delete-articles')
		}
	}
}
</script>
<style lang="sass">
.selected-drop-down
	@media screen and (max-width: 768px)
		width: 100%
		margin: 0 !important
</style>