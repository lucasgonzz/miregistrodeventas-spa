<template>
	<b-list-group>
		<b-list-group-item
		class="category-item"
		v-for="item in items"
		:key="item.id">
			{{ item.name }}
			<span
			v-if="item.category_id">
				{{ item.category.name }}
			</span>
			<b-button
			class="float-right"
			@click="edit(item)"
			size="sm"
			variant="primary">
				Editar
			</b-button>
		</b-list-group-item>
	</b-list-group>
</template>
<script>
export default {
	computed: {
		view() {
			return this.$store.state.categories.view
		},
		items() {
			if (this.view == 'categories') {
				return this.categories
			} else if (this.view == 'subcategories') {
				return this.sub_categories
			}
		},
		categories() {
			return this.$store.state.categories.categories
		},
		sub_categories() {
			return this.$store.state.sub_categories.sub_categories
		},
	},
	data() {
		return {
			last_category_id: 0,
		}
	},
	methods: {
		edit(item) {
			let mutation 
			let modal = 'edit-'
			if (this.view == 'categories') {
				mutation = 'categories/setEdit'
				modal += 'category'
			} else if (this.view == 'subcategories') {
				mutation = 'sub_categories/setEdit'
				modal += 'sub-category'
			}
			this.$store.commit(mutation, item)
			this.$bvModal.show(modal)

		}
	}
}
</script>
<style scoped lang="sass">
.category-item
	display: flex
	justify-content: space-between
</style>