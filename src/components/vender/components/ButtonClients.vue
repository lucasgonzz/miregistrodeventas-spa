<template>
<b-row
v-if="is_provider && items.length && index_previus_sales == 0"
class="j-center">
	<b-col 
	cols="12"
	lg="3">
		<b-button 
		block
		variant="success"
		v-b-modal="'clients'">
			<i class="icon-user"></i>
			Seleccionar cliente
		</b-button>
	</b-col>
	<b-col 
	cols="12"
	lg="3">
		<b-button 
		block
		variant="primary"
		@click="vender(false)">
			<btn-loader
			icon="check"
			text="Guardar venta"
			:loader="vendiendo"></btn-loader>
		</b-button>
	</b-col>
</b-row>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
import vender from '@/mixins/vender'
export default {
	name: 'ButtonClients',
	components: {
		BtnLoader,
	},
	mixins: [vender],
	computed: {
		items() {
			return this.$store.state.vender.items
		},
		index_previus_sales() {
			return this.$store.state.vender.previus_sales.index
		}
	}
}
</script>