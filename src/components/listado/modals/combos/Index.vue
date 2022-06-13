<template>
<div>
    <confirm
    :text="text_delete"
    :actions="['combos/delete']"
    id="delete-combo"
    toast="Combo eliminado"></confirm>
	<create></create>	
	<edit></edit>	
	<b-modal
	id="combos"
	title="Combos"
	hide-footer
	body-class="p-0"
	size="lg">
		<create-btn></create-btn>
		<list></list>
	</b-modal>
</div>
</template>
<script>
import Confirm from '@/components/common/Confirm'
import Create from '@/components/listado/modals/combos/Create'
import Edit from '@/components/listado/modals/combos/Edit'

import CreateBtn from '@/components/listado/modals/combos/CreateBtn'
import List from '@/components/listado/modals/combos/List'
export default {
	components: {
		Confirm,
		Create,
		Edit,
		
		CreateBtn,
		List,
	},
	computed: {
		delete() {
			return this.$store.state.combos.delete
		},
		text_delete() {
			return '¿Seguro que quiere eliminar el combo '+this.delete.name+'?'
		},
	}
}
</script>