<template>
	<b-col
	class="col-buttons"
	cols="12"
	lg="2">
		<b-form-input
		v-if="isProvider()"
		type="number"
		min="1"
		id="article-amount"
		v-model="article.amount"
		@keydown.enter="addArticleToArticlesSale"
		placeholder="Cantidad"></b-form-input>
		<b-button-group
		v-if="!isProvider() && index_previus_sale == 0">
			<b-button 
			v-intro-step="4"
			v-intro="'Guarda la venta'"
			variant="primary"
			@click="vender">
				<i class="icon-check" v-show="!vendiendo"></i>
				<span v-show="vendiendo" class="spinner-border spinner-border-sm"></span>
				Vender
			</b-button>
			<b-button 
			v-intro-step="3"
			v-intro="'Selecciona un cliente para la venta (opcional)'"
			v-if="can('client.index')"
			variant="success"
			v-b-modal="'clients'">
				<i class="icon-user"></i>
			</b-button>
		</b-button-group>
		<b-button 
		v-if="!isProvider() && index_previus_sale > 0"
		variant="primary"
		@click="updatePreviusSale">
			<btn-loader :loader="updating_previus_sale" text="Actualizar"></btn-loader>
		</b-button>
	</b-col>
</template>
<script>
import vender from '@/mixins/vender'
export default {
	mixins: [vender],
	computed: {
		article() {
			return this.$store.state.vender.article
		},
		index_previus_sale() {
			return this.$store.state.vender.previus_sales.index
		},
	},
}
</script>
<style scoped lang="sass">
.col-buttons 
	display: flex
	align-items: center
	justify-content: flex-end
</style>