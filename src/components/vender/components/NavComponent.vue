<template>
	<horizontal-nav
	set_view
	:items="items"></horizontal-nav>
</template>
<script>
import HorizontalNav from '@/components/common/horizontal-nav/Index'
export default {
	computed: {
		client() {
			return this.$store.state.vender.client
		},
		items() {
			let items = []
			if (this.client) {
				items.push({name: 'cliente ('+this.client.name+')'})
			} else {
				items.push({name: 'cliente'})
			}
			items.push({name: 'remito'})
			return items
		},
	},
	components: {
		HorizontalNav,
	}
}
</script>