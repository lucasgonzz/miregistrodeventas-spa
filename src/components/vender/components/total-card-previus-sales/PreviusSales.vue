<template>
	<b-col
	:offset-lg="offset"
	cols="12"
	lg="3"
	class="j-end">
		<div class="float-right m-l-5 d-none d-sm-block">
			<b-button-group>
				<b-button 
				v-if="is_provider && index > 0"
				variant="primary"
				@click="updatePreviusSale">
					<btn-loader :loader="updating" text="Actualizar"></btn-loader>
				</b-button>
				<b-button
				@click="previusSale"
				variant="primary">
					<btn-loader :loader="loading_previus" text="Anterior"></btn-loader>
				</b-button>
				<b-button
				v-if="index > 1"
				@click="nextSale"
				variant="primary">
					<btn-loader :loader="loading_next" icon="redo"></btn-loader>
				</b-button>
				<b-button
				v-if="index > 0"
				@click="cancelPreviusSale"
				variant="danger">
					<i class="icon-cancel"></i>
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
		index() {
			return this.$store.state.vender.previus_sales.index
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
		previusSale() {
			this.$store.dispatch('vender/previus_sales/previusSale')
			.then(() => {
				let articles = this.setPreviusSaleArticles(this.previus_sale.articles)
				this.$store.commit('vender/setArticles', articles)
				this.formatPreviusSale()
				this.$store.commit('vender/setTotal')
			})
		},
		nextSale() {
			this.$store.dispatch('vender/previus_sales/nextSale')
			.then(() => {
				let articles = this.setPreviusSaleArticles(this.previus_sale.articles)
				this.$store.commit('vender/setArticles', articles)
				this.formatPreviusSale()
				this.$store.commit('vender/setTotal')
			})
		},
		formatPreviusSale() {
			if (this.previus_sale.percentage_card) {
				console.log('con tarjet')
				this.$store.commit('vender/setWithCard', true)
			} else {
				console.log('sin tarjeta')
				this.$store.commit('vender/setWithCard', false)
			}
		},
		cancelPreviusSale() {
			this.clearVender()
		},
	}
}
</script>