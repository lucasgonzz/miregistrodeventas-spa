<template>
<div
v-if="view == 'lista'">
	<confirm
	:text="text_delete"
	:actions="['providers/delete']"
	id="delete-provider"
	toast="Proveedor eliminado"></confirm>
	<model></model>	
	<import></import>	
	<b-row>
		<b-col>
			<nav-component></nav-component>
			<list></list>
		</b-col>
	</b-row>
</div>
</template>
<script>
import Confirm from '@/components/common/Confirm.vue'
import Model from '@/components/proveedores/modals/list/Model'
import Import from '@/components/proveedores/modals/list/Import'

import NavComponent from '@/components/proveedores/components/list/Nav'
import List from '@/components/proveedores/components/list/List'
export default {
	components: {
		Confirm,
		Model,
		Import,

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