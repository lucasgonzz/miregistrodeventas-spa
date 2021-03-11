<template>
	<b-form-row>
		<b-col cols="12" :sm="col">
			<b-form-group
			v-intro-step="4"
			v-intro="'Completa con el costo de tu producto (opcional)'"
			label="Costo"
			label-for="article-cost">
				<b-form-input
				type="number"
				min="0"
				id="article-cost"
				placeholder="Ingresa el costo del producto"
				v-model="article.cost"
				@keydown.enter="changeToPrice"
				autocomplete="off"></b-form-input>
			</b-form-group>
		</b-col>
		<b-col cols="12" :sm="col">
			<b-form-group
			v-intro-step="5"
			v-intro="'Completa con el precio al que vas a vender tu producto'"
			label="Precio"
			label-for="article-price">
				<b-form-input
				type="number"
				min="0"
				id="article-price"
				@keydown.enter="changeToProvider"
				placeholder="Ingresa el precio del producto"
				v-model="article.price"
				autocomplete="off"></b-form-input>
			</b-form-group>
		</b-col>
		<b-col v-show="special_prices.length"
		cols="6"
		class="m-t-10"
		v-for="(special_price, index) in special_prices"
		:key="special_price.id">
			<b-form-group
			:label="`Precio ${special_price.name}`"
			:label-for="`article-price-${special_price.name}`">
				<b-form-input
				type="number"
				min="0"
				@keydown.enter="changeFromSpecialPrice(index)"
				:id="`article-special-price-${special_price.id}`"
				v-model="article[special_price.name]"
				:placeholder="`Ingrese el precio para ${special_price.name}`"></b-form-input>
			</b-form-group>
		</b-col>
	</b-form-row>
</template>
<script>
export default {
	props: ['article', 'user', 'porcentage_for_price'],
	data() {
		return {

		}
	},
	computed: {
		special_prices() {
			return this.$store.state.special_prices.special_prices
		},
		col() {
			if (this.article.uncontable) {
				return 4
			}
			return 6
		}
	},
	methods: {
		changeToPrice() {
			document.getElementById('article-price').focus()
		},
		changeToProvider() {
			if (this.special_prices.length) {
				let first_special_price = this.special_prices[0]
				document.getElementById(`article-special-price-${first_special_price.id}`).focus()
			} else {
				if (!this.isProvider()) {
					document.getElementById('article-provider').focus()
				} else {
					document.getElementById('article-stock').focus()
				}
			}
		},
		changeFromSpecialPrice(index) {
			index++
			if (index == this.special_prices.length) {
				document.getElementById('article-stock').focus()
			} else {
				let special_price = this.special_prices[index]
				document.getElementById(`article-special-price-${special_price.id}`).focus()
			}
		},
		calculatePorcentageForPrice() {
			if (this.porcentage_for_price != 0) {
				this.article.price = parseFloat(this.article.cost) + 
									(parseFloat(this.porcentage_for_price) / 100) * 
									parseFloat(this.article.cost)
			}
		},
		showPorcentageForPrice() {
			// $('#porcentage-for-price').modal('show')
		},
		stopPorcentageForPrice() {
			this.porcentage_for_price = 0
		},
	},
}
</script>
<style scoped lang="sass">
.input-uncontable-price 
	width: 50%
	display: inline-block

.select-measurement 
	width: 30%
	display: inline-block

	
</style>
