<template>
<b-modal id="create-sub-category" title="Nueva Subcategoria" hide-footer>
	<b-form-group>
		<b-form-input
		placeholder="Nombre"
		v-model="sub_category.name"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Categoria">
		<b-form-select
		:options="categories_options"
		v-model="sub_category.category_id"></b-form-select>
	</b-form-group>
	<b-form-group>
		<b-button
		block
		variant="primary"
		@click="save">
			<btn-loader
			:loader="loading"
			text="Guardar"></btn-loader>
		</b-button>
	</b-form-group>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
import categories from '@/mixins/categories'
export default {
	mixins: [categories],
	components: {
		BtnLoader
	},
	data() {
		return {
			sub_category: {
				name: '',
				category_id: 0,
			},
			loading: false,
		}
	},
	methods: {
		save() {
			this.loading = true
			this.$api.post('/sub-categories', this.sub_category)
			.then(res => {
				this.loading = false
				this.$store.commit('sub_categories/addSubCategory', res.data.sub_category)
				this.$store.commit('sub_categories/orderSubCategories')
				this.$toast.success('Subcategoria guardada')
				this.clear()
				this.$bvModal.hide('create-sub-category')
			})
			.catch(err => {
				this.loading = false
				console.log(err)
				this.$toast.error('Error al guardar subcategoria')
			})
		},
		clear() {
			this.sub_category.name = ''
			this.sub_category.category_id = 0
		}
	}
}
</script>