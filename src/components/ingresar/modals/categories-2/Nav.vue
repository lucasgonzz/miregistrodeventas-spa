<template>
	<div
	class="p-15">
		<b-button
		block
		class="m-b-15"
		@click="create"
		variant="primary">
			<i class="icon-plus"></i>
			{{ btn_text }}
		</b-button>
		<b-nav 
		tabs>
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
	</div>
</template>
<script>
export default {
	name: 'CategoriesNav',
	computed: {
		view() {
			return this.$store.state.categories.view
		},
		btn_text() {
			if (this.view == 'categories') {
				return 'Nueva categoria'
			} else {
				return 'Nueva subcategoria'
			}
		}
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
.cont-nav
	display: flex
	justify-content: space-between
	align-items: center
</style>