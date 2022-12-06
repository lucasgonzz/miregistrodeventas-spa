<template>
<b-modal id="create-sub-category" title="Nueva Subcategoria" hide-footer>
	<b-form-group>
		<b-form-input
		placeholder="Nombre"
		v-model="sub_category.name"></b-form-input>
	</b-form-group>
		
	<b-form-group>
		<b-form-checkbox
		:value="1"
		:unchecked-value="0"
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
import app from '@/mixins/app'
export default {
	mixins: [categories, app],
	components: {
		BtnLoader
	},
	data() {
		return {
			sub_category: {
				name: '',
				category_id: 0,
				show_in_vender: 0,
			},
			loading: false,
		}
	},
	methods: {
		save() {
			if (this.check()) {
				this.loading = true
				this.$api.post('/sub-categories', this.sub_category)
				.then(res => {
					this.loading = false
					this.$store.commit('sub_categories/addSubCategory', res.data.sub_category)
					this.$store.commit('sub_categories/orderSubCategories')
					this.$toast.success('Subcategoria guardada')
					this.clear()
					this.$bvModal.hide('create-sub-category')
					this.setSubCategoriesInVender()
				})
				.catch(err => {
					this.loading = false
					console.log(err)
					this.$toast.error('Error al guardar subcategoria')
				})
			}
		},
		check() {
			if (this.sub_category.name == '') {
				this.$toast.error('Ingrese un nombre para la subcategoria, por favor')
				return false
			}
			if (this.sub_category.category_id == 0) {
				this.$toast.error('Seleccione una categoria para la subcategoria, por favor')
				return false
			}
			return true
		},
		clear() {
			this.sub_category.name = ''
			this.sub_category.category_id = 0
		}
	}
}
</script>