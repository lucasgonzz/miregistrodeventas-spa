<template>
	<div>
	    <confirm
	    :text="text_delete"
	    :actions="['locations/delete']"
	    id="delete-location"
	    toast="Localidad eliminada"></confirm>
		<model></model>	
		<b-modal
		id="locations"
		title="Localidades"
		hide-footer>
			<btn-create></btn-create>
			<list></list>
		</b-modal>
	</div>
</template>
<script>
import Confirm from '@/components/common/Confirm'
import Model from '@/components/ingresar/modals/locations/Model'

import BtnCreate from '@/components/ingresar/modals/locations/BtnCreate'
import List from '@/components/ingresar/modals/locations/List'
export default {
	components: {
		Confirm,
		Model,

		BtnCreate,
		List,
	},
	computed: {
		delete() {
			return this.$store.state.locations.delete 
		},
		text_delete() {
			if (this.delete) {
				return '¿Seguro que quiere eliminar la localidad '+this.delete.name+'?'
			}
			return ''
		},
	}
}
</script>