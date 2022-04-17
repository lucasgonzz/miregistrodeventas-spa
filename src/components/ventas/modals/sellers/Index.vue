<template>
<div>
	<create></create>	
	<b-modal
	title="Vendedores"
	id="sellers"
	hide-footer
	body-class="p-0">
		<create-btn></create-btn>
		<list></list>
	</b-modal>
</div>
</template>
<script>
import Create from '@/components/ventas/modals/sellers/Create'
import CreateBtn from '@/components/ventas/modals/sellers/CreateBtn'
import List from '@/components/ventas/modals/sellers/List'
export default {
	components: {
		Create,
		CreateBtn,
		List,
	}
}
</script>