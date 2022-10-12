<template>
	<b-col
	class="col-buttons"
	cols="12"
	:lg="col_lg">

		<b-form-input
		v-if="is_provider"
		type="number"
		min="1"
		id="article-amount"
		v-model="article.amount"
		@keydown.enter="addArticleToSale"
		placeholder="Cantidad"></b-form-input>
		
		<b-button-group
		v-if="!is_provider && index_previus_sale == 0">
			<b-button 
			v-intro-step="4"
			v-intro="'Guarda la venta'"
			variant="primary"
			@click="vender(false)">
				<btn-loader
				text="Vender"
				:loader="vendiendo"></btn-loader>
			</b-button>
			<b-button 
			v-if="hasExtencion('combos')"
			variant="danger"
			@click="vender(true)">
				<i class="icon-cupon"></i>
			</b-button>
		</b-button-group>
		<b-button-group
		v-if="!is_provider && index_previus_sale > 0">
			<!-- <b-button 
			variant="primary"
			@click="updatePreviusSale">
				<btn-loader :loader="updating" text="Actualizar"></btn-loader>
			</b-button> -->
			<b-button 
			v-if="hasExtencion('combos')"
			variant="danger"
			@click="printTicket(previus_sale)">
				<i class="icon-cupon"></i>
			</b-button>
		</b-button-group>
	</b-col>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
import vender from '@/mixins/vender'
import previus_sales from '@/mixins/previus_sales'
export default {
	components: {
		BtnLoader,
	},
	mixins: [vender, previus_sales],
	computed: {
		article() {
			return this.$store.state.vender.article
		},
		index_previus_sale() {
			return this.$store.state.vender.previus_sales.index
		},
        previus_sale() {
            return this.$store.state.vender.previus_sales.previus_sale
        },
		col_lg() {
			if (this.hasExtencion('combos') || this.hasExtencion('services')) {
				return 3
			}
			return 2
		}
	},
}
</script>
<style scoped lang="sass">
.col-buttons 
	display: flex
	align-items: center
	justify-content: flex-end
</style>