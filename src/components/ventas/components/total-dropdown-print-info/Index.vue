<template>
<b-row
class="row-total-dropdown-print-info">
	<total></total>
	<selected-sales></selected-sales>
	<drop-down></drop-down>
	<print-info></print-info>
</b-row>
</template>
<script>
import Total from '@/components/ventas/components/total-dropdown-print-info/Total'
import SelectedSales from '@/components/ventas/components/total-dropdown-print-info/SelectedSales'
import DropDown from '@/components/ventas/components/total-dropdown-print-info/DropDown'
import PrintInfo from '@/components/ventas/components/total-dropdown-print-info/PrintInfo'
export default {
	components: {
		Total,
		SelectedSales,
		DropDown,
		PrintInfo,
	}
}
</script>
<style lang="sass">
.row-total-dropdown-print-info
	justify-content: flex-start
	.col-12
		@media screen and (max-width: 992px)
			margin-bottom: 10px
			&:last-child
				margin-bottom: 0
	.col-ver
		display: flex
		justify-content: flex-end

	.col-info
		@media screen and (min-width: 778px)
			display: flex
			justify-content: flex-start
	.btn-group-totales 
		@media screen and (max-width: 768px)
			width: 100%
</style>