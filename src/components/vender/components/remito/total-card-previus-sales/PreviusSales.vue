<template>
	<b-col
	:offset-lg="offset"
	cols="12"
	lg="3"
	class="j-end">
		<div class="float-right m-l-5 d-none d-sm-block">
			<b-button-group>
				<b-button
				@click="setIndexAndCallPreviusSale(true)"
				variant="primary">
					<btn-loader :loader="loading_previus" icon="left"></btn-loader>
				</b-button>
				<b-button
				:disabled="index_previus_sales < 2"
				@click="setIndexAndCallPreviusSale(false)"
				variant="primary">
					<btn-loader :loader="loading_next" icon="right"></btn-loader>
				</b-button>
				<b-button
				v-if="index_previus_sales > 0"
				@click="cancelPreviusSale"
				variant="outline-danger">
					Cancelar
				</b-button>
			</b-button-group>
		</div>
	</b-col>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
import Vender from '@/mixins/vender'
import previus_sales from '@/mixins/previus_sales'
export default {
	name: 'PreviusSales',
	components: {
		BtnLoader
	},
	mixins: [Vender, previus_sales],
	computed: {
		previus_sale() {
			return this.$store.state.vender.previus_sales.previus_sale
		},
		loading_previus() {
			return this.$store.state.vender.previus_sales.loading_previus
		},
		loading_next() {
			return this.$store.state.vender.previus_sales.loading_next
		},
		articles() {
			return this.$store.state.vender.articles
		},
		special_prices() {
			return this.$store.state.special_prices.special_prices
		},
		offset() {
			if (this.special_prices.length) {
				return 0
			}
			return 3
		},
	},
	methods: {
		setIndexAndCallPreviusSale(from_previus) {
			if (from_previus) {
				this.$store.commit('vender/previus_sales/incrementIndex')
				this.$store.commit('vender/previus_sales/setLoadingPrevius', true)
			} else {
				this.$store.commit('vender/previus_sales/decrementIndex')
				this.$store.commit('vender/previus_sales/setLoadingNext', true)
			}
			this.callPreviusSale()
		},
	}
}
</script>