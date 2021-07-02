<template>
	<b-row
	v-show="view == 'clientes'">
		<b-col>
			<buyers-table></buyers-table>
		</b-col>
	</b-row>
	<!-- <update-button></update-button> -->
</template>
<script>
// import UpdateButton from '@/components/online/modals/examine/buyers/UpdateButton'
import BuyersTable from '@/components/online/components/buyers/BuyersTable'
import online from '@/mixins/online'
export default {
	mixins: [online],
	components: {
		// UpdateButton,
		BuyersTable,
	},
}
</script>