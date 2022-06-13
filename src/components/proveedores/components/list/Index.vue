<template>
<div
v-if="view == 'lista'">
	<confirm
	:text="text_delete"
	:actions="['providers/delete']"
	id="delete-provider"
	toast="Proveedor eliminado"></confirm>
	<create></create>	
	<edit></edit>	
	<b-row>
		</b-col>
		<b-col
		md="8">
			<nav-component></nav-component>
			<list></list>
		</b-col>
	</b-row>
</div>
</template>
<script>
import Confirm from '@/components/common/Confirm.vue'
import Create from '@/components/proveedores/modals/list/Create'
import Edit from '@/components/proveedores/modals/list/Edit'

import NavComponent from '@/components/proveedores/components/list/Nav'
import List from '@/components/proveedores/components/list/List'
export default {
	components: {
		Confirm,
		Create,
		Edit,

		NavComponent,
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
<style scoped lang="sass">
</style>