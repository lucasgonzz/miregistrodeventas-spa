<template>
<div>
	<confirm
	:text="text_delete"
	action="conditions/delete"
	variant="danger"
	id="delete-condition"
	toast="Condicion eliminada"
	btn_text="Eliminar"></confirm>
	<b-modal 
	id="conditions" 
	title="Condiciones" 
	body-class="p-0"
	size="lg"
	hide-footer>
		<div class="p-15">
			<b-button
			block
			v-b-modal="'create-condition'"
			variant="primary">
				<i class="icon-plus"></i>
				Agregar condicion
			</b-button>
		</div>
		<list></list>
	</b-modal>
</div>
</template>
<script>
import Confirm from '@/components/common/Confirm'
import List from '@/components/ingresar/modals/conditions/List'
export default {
	components: {
		Confirm,
		List,
	},
	computed: {
		delete() {
			return this.$store.state.conditions.delete
		},
		text_delete() {
			return '¿Eliminar la condicion '+this.delete.name+'?'
		}
	}
}
</script>