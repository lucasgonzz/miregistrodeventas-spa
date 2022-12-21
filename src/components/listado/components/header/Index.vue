<template>
<div>
	<inactive-articles></inactive-articles>
	<b-row>
		<b-col
		cols="12">
			<horizontal-nav
			show_filter_modal
			:show_btn_create="false"
			model_name="article">
				<template #btn_create>
					<drop-down></drop-down>
				</template>
			</horizontal-nav>
		</b-col>
		
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