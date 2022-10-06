<template>
<div
v-if="view == 'remito'">
	<sub-categories></sub-categories>
	<header-form></header-form>
	<total-card-previus-sales></total-card-previus-sales>
	<previus-sale-data></previus-sale-data>
	<articles-table></articles-table>
</div>
</template>
<script>
import SubCategories from '@/components/vender/components/remito/sub-categories/Index.vue'
import HeaderForm from '@/components/vender/components/remito/header-form/Index.vue'
import TotalCardPreviusSales from '@/components/vender/components/remito/total-card-previus-sales/Index.vue'
import ArticlesTable from '@/components/vender/components/remito/ArticlesTable.vue'
import PreviusSaleData from '@/components/vender/components/remito/PreviusSaleData.vue'
export default {
	components: {
		SubCategories, 
		HeaderForm,
		TotalCardPreviusSales,
		ArticlesTable, 	
		PreviusSaleData, 
	}
}
</script>