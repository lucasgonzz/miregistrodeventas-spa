<template>
	<div
	class="cont-nav">
		<b-nav tabs class="m-b-10 nav-categories">
			<b-nav-item 
			:active="isActive('categories')"
			@click="setView('categories')">
				Categorias
			</b-nav-item>
			<b-nav-item
			:active="isActive('subcategories')"
			@click="setView('subcategories')">
				Subcategorias
			</b-nav-item>
		</b-nav>
		<b-button
		@click="create"
		variant="primary">
			<i class="icon-plus"></i>
		</b-button>
	</div>
</template>
<script>
export default {
	name: 'CategoriesNav',
	computed: {
		view() {
			return this.$store.state.categories.view
		},
	},
	methods: {
		setView(value) {
			this.$store.commit('categories/setView', value)
		},
		isActive(view) {
			return this.view == view
		},
		create() {
			if (this.view == 'categories') {
				this.$bvModal.show('create-category')
			} else {
				this.$bvModal.show('create-sub-category')
			}
		}
	}
}
</script>
<style lang="sass">
.nav-categories
	width: 80%
.cont-nav
	display: flex
	justify-content: space-between
	align-items: center
</style>