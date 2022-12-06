<template>
<b-modal id="edit-sub-category" title="Editar Categoria" hide-footer>
	<b-form-group
	label="Nombre">
		<b-form-input
		v-model="sub_category.name"></b-form-input>
	</b-form-group>
	</b-form-group>
		
	<b-form-group>
		<b-form-checkbox
		:value="1"
		:unchecked-value="1"
		v-model="sub_category.show_in_vender">
			Mostrar en VENDER
		</b-form-checkbox>
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
		@click="update"
		variant="primary">
			<btn-loader
			text="Actualizar"
			:loader="loading"></btn-loader>
		</b-button>
	</b-form-group>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'

import app from '@/mixins/app'
export default {
	mixins: [app],
	components: {
		BtnLoader,
	},
	data() {
		return {
			loading: false
		}
	},
	computed: {
		sub_category() {
			return this.$store.state.sub_categories.edit
		},
		categories() {
			return this.$store.state.categories.categories
		},
		categories_options() {
			let options = []
			this.categories.forEach(cat => {
				options.push({
					text: cat.name,
					value: cat.id,
				})
			})
			return options
		}
	},
	methods: {
		update() {
			this.loading = true
			this.$api.put('/sub-categories', this.sub_category)
			.then(res => {
				this.loading = false
				this.$store.commit('sub_categories/update', res.data.sub_category)
				this.$store.commit('sub_categories/orderSubCategories')
				this.$toast.success('Subcategoria actualizada')
				this.$bvModal.hide('edit-sub-category')
				this.setSubCategoriesInVender()
			})
			.catch(err => {
				this.loading = false
				this.$toast.error('Error al actualizar subcategoria')
				console.log(err)
			})
		}
	}
}
</script>