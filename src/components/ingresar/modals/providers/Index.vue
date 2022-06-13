<template>
<div>
	<confirm
	:text="text_delete"
	:actions="['providers/delete']"
	id="delete-provider"
	toast="Proveedor eliminado"></confirm>
	<b-modal 
	id="providers" 
	title="Proveedores" 
	body-class="p-0"
	hide-footer>
		<div class="p-15">
			<b-button
			block
			variant="primary"
			v-b-modal="'create-provider'">
				<i class="icon-plus"></i>
				Nuevo proveedor
			</b-button>
		</div>
		<list></list>
	</b-modal>
</div>
</template>
<script>
import Confirm from '@/components/common/Confirm.vue'
import List from '@/components/proveedores/components/list/List'
export default {
	components: {
		Confirm,
		List,
	},
	computed: {
		delete() {
			return this.$store.state.providers.delete
		},
		text_delete() {
			return '¿Eliminar el proveedor '+this.delete.name+'?'
		}
	}
}
</script>