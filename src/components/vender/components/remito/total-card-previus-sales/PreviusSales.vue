<template>
	<b-col
	:offset-lg="offset"
	cols="12"
	lg="3"
	class="j-end">
		<div class="float-right m-l-5 d-none d-sm-block">
			<b-button-group>
				<b-button
				@click="callPreviusSale(true)"
				variant="primary">
					<btn-loader :loader="loading_previus" icon="left"></btn-loader>
				</b-button>
				<b-button
				:disabled="index_previus_sales < 2"
				@click="callPreviusSale(false)"
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
		callPreviusSale(from_previus) {
			if (from_previus) {
				this.$store.commit('vender/previus_sales/incrementIndex')
				this.$store.commit('vender/previus_sales/setLoadingPrevius', true)
			} else {
				this.$store.commit('vender/previus_sales/decrementIndex')
				this.$store.commit('vender/previus_sales/setLoadingNext', true)
			}
			this.$store.dispatch('vender/previus_sales/previusSale')
			.then(() => {
				let items = this.getItemsPreviusSale(this.previus_sale)
				this.$store.commit('vender/setItems', items)
				if (this.previus_sale.client) {
					this.$store.commit('vender/setClient', this.previus_sale.client)
					this.$store.commit('vender/setPriceType', this.previus_sale.client.price_type)
				}
				this.checkWithCard()
				this.setItemsPrices(false, true)
				this.$store.commit('vender/setTotal')
			})
		},
		checkWithCard() {
			if (this.previus_sale.percentage_card) {
				this.$store.commit('vender/setWithCard', true)
			} else {
				this.$store.commit('vender/setWithCard', false)
			}
		},
		cancelPreviusSale() {
			this.$store.commit('vender/previus_sales/setIndex', 0)
			this.$store.commit('vender/previus_sales/setPreviusSale', {})
			this.$store.commit('vender/setItems', [])
			this.$store.commit('vender/setClient', null)
			this.$store.commit('vender/setTotal')
		},
	}
}
</script>