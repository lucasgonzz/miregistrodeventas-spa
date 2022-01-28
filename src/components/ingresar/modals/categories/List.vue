<template>
	<div>
		<b-list-group
		v-if="view == 'categories'">
			<b-table
			head-variant="dark"
			:fields="fields"
			:items="table_items">
				<template #cell(icon)="data">
					<i 
					v-if="items[data.index].icon"
					:class="'icon-'+items[data.index].icon.slug"></i>
				</template>
				<template #cell(options)="data">
					<b-button
					@click="edit(items[data.index])"
					size="sm"
					variant="primary">
						Editar
					</b-button>
					<b-button
					@click="deleteCategory(items[data.index])"
					size="sm"
					class="m-l-10"
					variant="danger">
						<i class="icon-trash"></i>
					</b-button>
				</template>
			</b-table>
		</b-list-group>
		<b-list-group
		v-else>
			<b-table
			head-variant="dark"
			:fields="fields"
			:items="table_items">
				<template #cell(options)="data">
					<b-button
					@click="edit(items[data.index])"
					size="sm"
					variant="primary">
						Editar
					</b-button>
					<b-button
					@click="deleteSubCategory(items[data.index])"
					size="sm"
					class="m-l-10"
					variant="danger">
						<i class="icon-trash"></i>
					</b-button>
				</template>
			</b-table>
		</b-list-group>
	</div>
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
		fields() {
			if (this.view == 'categories') {
				return [
					{ key: 'name', label: 'Nombre', class: 'text-center'},
					{ key: 'icon', label: 'Icono', class: 'text-center'},
					{ key: 'options', label: 'Opciones', class: 'text-center'},
				] 
			}
			return [
				{ key: 'name', label: 'Nombre', class: 'text-center'},
				{ key: 'icon', label: 'Icono', class: 'text-center'},
				{ key: 'category', label: 'Categoria', sortable: true, class: 'text-center'},
				{ key: 'options', label: 'Opciones', class: 'text-center'},
			]
		},
		table_items() {
			let items = []
			if (this.view == 'categories') {
				this.items.forEach(item => {
					items.push({
						name: item.name,
					})
				})
				return items
			}
			this.items.forEach(item => {
				items.push({
					name: item.name,
					category: item.category.name,
				})
			})
			return items
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

		},
		deleteSubCategory(sub_category) {
			console.log('deleteSubCategory')
			this.$store.commit('sub_categories/setDelete', sub_category)
			this.$bvModal.show('delete-category')
		},
		deleteCategory(category) {
			console.log('deleteCategory')
			this.$store.commit('categories/setDelete', category)
			this.$bvModal.show('delete-category')
		},
	}
}
</script>
<style scoped lang="sass">
.category-item
	display: flex
	justify-content: space-between
</style>