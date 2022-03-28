<template>
<div>
	<confirm
	:text="text_delete"
	action="brands/delete"
	id="delete-brand"
	toast="Marca eliminada"></confirm>
	<b-modal 
	id="brands" 
	title="Marcas" 
	body-class="p-0"
	hide-footer>
		<div class="p-15">
			<b-button
			block
			v-b-modal="'create-brand'"
			variant="primary">
				<i class="icon-plus"></i>
				Agregar marca
			</b-button>
		</div>
		<list></list>
	</b-modal>
</div>
</template>
<script>
import Confirm from '@/components/common/Confirm.vue'
import List from '@/components/ingresar/modals/brands/List'
export default {
	components: {
		Confirm,
		List,
	},
	computed: {
		delete() {
			return this.$store.state.brands.delete
		},
		text_delete() {
			return '¿Eliminar la marca '+this.delete.name+'?'
		}
	}
}
</script>