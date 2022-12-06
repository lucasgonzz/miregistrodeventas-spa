<template>
<div>
	<inactive-articles></inactive-articles>
	<b-row>
		<b-col
		cols="12"
		md="6">
			<div 
			class="j-start align-center">
				<horizontal-nav
				show_filter_modal
				:show_btn_create="false"
				model_name="article" />
				<drop-down></drop-down>
			</div>
		</b-col>
		<!-- <b-col
		class="align-center"
		cols="4"
		md="2">
			<drop-down></drop-down>
		</b-col> -->
		<b-col
		class="j-end align-center"
		cols="12"
		md="6">
			<stock-info></stock-info>
		</b-col>
	</b-row>
</div>
</template>
<script>
import InactiveArticles from '@/components/listado/modals/inactive-articles/Index'

import HorizontalNav from '@/components/common/horizontal-nav/Index'
import DropDown from '@/components/listado/components/header/DropDown'
import StockInfo from '@/components/listado/components/header/StockInfo'
export default {
	components: {
		InactiveArticles,

		HorizontalNav,
		DropDown,
		StockInfo,
	},
}
</script>