<template>
<b-modal
title="Vendedores"
id="sellers"
hide-footer>
	<create-btn></create-btn>
	<sellers-table></sellers-table>
</b-modal>
</template>
<script>
import CreateBtn from '@/components/ventas/modals/sellers/CreateBtn'
import SellersTable from '@/components/ventas/modals/sellers/SellersTable'
export default {
	components: {
		CreateBtn,
		SellersTable,
	}
}
</script>