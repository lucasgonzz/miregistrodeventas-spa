<template>
	<b-col 
	class="col-cost"
	md="6"
	cols="12"> 
		<b-form-group
		label="Costo">
			<b-form-input
			id="article-cost"
			type="number"
			min="0"
			placeholder="Ingresa el costo del producto"
			v-model="article.cost"
			@keydown.enter="changeToPrice"
			autocomplete="off"></b-form-input>
		</b-form-group>
	</b-col>
</template>
<script>
export default {
	props: ['article'],
	computed: {
		special_prices() {
			return this.$store.state.special_prices.special_prices
		},
		disabled_percetange_gain() {
			return this.article.price != ''
		},
		disabled_price() {
			return this.article.percentage_gain != ''
		},
	},
	methods: {
		changeToPrice() {
			if (this.hasExtencion('articles.percentage_gain')) {
				document.getElementById('article-percentage-gain').focus()
			} else {
				document.getElementById('article-price').focus()
			}
		},
	},
}
</script>
<style lang="sass">
.col-cost 
	display: flex
	justify-content: flex-start
</style>
