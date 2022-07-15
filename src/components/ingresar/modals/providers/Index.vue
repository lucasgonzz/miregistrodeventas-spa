<template>
<div>
	<confirm
	:text="text_delete"
	:actions="['providers/delete']"
	id="delete-provider"
	toast="Proveedor eliminado"></confirm>
	<model></model>	
	<b-modal 
	id="providers" 
	title="Proveedores" 
	body-class="p-0"
	hide-footer>
		<div class="p-15">
			<b-button
			block
			variant="primary"
			@click="createProvider">
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
import Model from '@/components/proveedores/modals/list/Model'

import List from '@/components/proveedores/components/list/List'

import providers from '@/mixins/providers'
export default {
	components: {
		Confirm,
		Model,
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