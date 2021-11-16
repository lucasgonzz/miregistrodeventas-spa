<template>
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
		<!-- <b-dropdown split
		right
		variant="primary"
		@click="previusSale">
			<template v-slot:button-content>
				<btn-loader :loader="loading" text="Anterior"></btn-loader>
			</template>
			<b-dropdown-item
			v-show="index > 1"
			@click="nextSale">
				<i class="icon-redo"></i>
				Atras
			</b-dropdown-item>
			<b-dropdown-item
			v-show="index > 0"
			@click="updatePreviusSale">
				<i class="icon-check"></i>
				Actualizar
			</b-dropdown-item>
			<b-dropdown-item
			v-show="index > 0"
			@click="cancelPreviusSale">
				<i class="icon-cancel"></i>
				Cancelar
			</b-dropdown-item>
		</b-dropdown> -->
	</div>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
import Vender from '@/mixins/vender'
export default {
	name: 'PreviusSales',
	components: {
		BtnLoader
	},
	mixins: [Vender],
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
		updating() {
			return this.$store.state.vender.previus_sales.updating
		},
		articles() {
			return this.$store.state.vender.articles
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
		updatePreviusSale() {
			this.$store.dispatch('vender/previus_sales/updatePreviusSale', this.articles)
			.then(res => {
				this.$toast.success('Venta actualizada')
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