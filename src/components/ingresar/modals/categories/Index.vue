<template>
<div>
	
    <confirm
    :text="text_delete_category"
    :actions="['categories/delete']"
    id="delete-category"
    toast="Categoria eliminada"></confirm>
	
    <confirm
    :text="text_delete_sub_category"
    :actions="['sub_categories/delete']"
    id="delete-sub-category"
    toast="SubCategoria eliminada"></confirm>

	<b-modal 
	id="categories" 
	title="Categorias" 
	body-class="p-0"
	hide-footer>
		<categories-nav></categories-nav>
		<list></list>
	</b-modal>
</div>
</template>
<script>
import Confirm from '@/components/common/Confirm'

import CategoriesNav from '@/components/ingresar/modals/categories/Nav'
import List from '@/components/ingresar/modals/categories/List'
export default {
	computed: {
		delete_cateogry() {
			return this.$store.state.categories.delete
		},
		delete_sub_cateogry() {
			return this.$store.state.sub_categories.delete
		},
		text_delete_category() {
			if (this.delete_cateogry) {
				return '¿Seguro que quiere eliminar la categoria '+this.delete_cateogry.name+'?'
			}
		},
		text_delete_sub_category() {
			if (this.delete_sub_cateogry) {
				return '¿Seguro que quiere eliminar la subcategoria '+this.delete_sub_cateogry.name+'?'
			}
		},
	},
	components: {
		Confirm,

		CategoriesNav,
		List,
	}
}
</script>