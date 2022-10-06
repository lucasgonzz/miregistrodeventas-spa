<template>
	<horizontal-nav
	set_view
	:items="items"></horizontal-nav>
</template>
<script>
import HorizontalNav from '@/components/common/horizontal-nav/Index'

import previus_sales from '@/mixins/previus_sales'
export default {
	mixins: [previus_sales],
	computed: {
		items() {
			let items = []
			if (this.index_previus_sales == 0 || (this.index_previus_sales > 0 && !this.previus_sale.client)) {
				return [
					{
						name: 'cliente'
					},
					{
						name: 'remito'
					},
				]
			} 
			return [
				{
					name: 'remito'
				},
			]
		},
	},
	components: {
		HorizontalNav,
	}
}
</script>