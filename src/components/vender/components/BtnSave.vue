<template>
<b-row
v-if="is_provider && items.length"
class="j-center m-t-25">
	<b-col 
	cols="12"
	lg="6">
		<b-button 
		block
		size="lg"
		variant="primary"
		@click="saveSale">
			<btn-loader
			icon="check"
			text="Guardar venta"
			:loader="loader"></btn-loader>
		</b-button>
	</b-col>
</b-row>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
import previus_sales from '@/mixins/previus_sales'
import vender from '@/mixins/vender'
export default {
	name: 'ButtonClients',
	components: {
		BtnLoader,
	},
	mixins: [previus_sales, vender],
	methods: {
		saveSale() {
			if (this.index_previus_sales == 0) {
				this.vender(false)
			} else {
				this.updatePreviusSale()
			}
		},
	},
	computed: {
		items() {
			return this.$store.state.vender.items
		},
		loader() {
			if (this.index_previus_sales == 0) {
				return this.vendiendo
			}
			return this.updating
		}
	}
}
</script>