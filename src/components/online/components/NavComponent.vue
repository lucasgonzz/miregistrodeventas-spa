<template>
	<b-row>
		<b-col
		cols="12"
		class="col-nav">
			<horizontal-nav
			set_view
			:items="items"></horizontal-nav>
		</b-col>
	</b-row>
</template>
<script>
import HorizontalNav from '@/components/common/horizontal-nav/Index'

import online from '@/mixins/online'
export default {
	name: 'NavComponentOnline',
	components: {
		HorizontalNav,
	},
	mixins: [online],
	computed: {
		items() {
			return [
				{
					name: 'pedidos',
					action: 'order/getModels',
				},
				{
					name: 'clientes',
					action: 'buyer/getModels',
				},
				{
					name: 'mensajes',
				},
			]
		},
	},
}
</script>