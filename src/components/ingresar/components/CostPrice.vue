<template>
	<b-form-row>
		<b-col cols="12" :sm="col">
			<b-form-group
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
			label="Precio"
			label-for="article-price">
				<b-form-input
				type="number"
				min="0"
				id="article-price"
				@keydown.enter="changeToStock"
				placeholder="Ingresa el precio del producto"
				v-model="article.price"
				autocomplete="off"></b-form-input>
			</b-form-group>
		</b-col>
		<b-col cols="12" sm="4" v-show="article.uncontable">
			<b-form-group
			label="Precio por"
			label-for="article-measurement">
				<b-form-select
				id="article-measurement"
				v-model="article.measurement"
				:options="[{text:'Kilo', value:'kilo'}, {text:'Gramo', value:'gramo'}]"></b-form-select>
			</b-form-group>
		</b-col>
		<b-col v-show="special_prices.length"
		v-for="special_price in special_prices"
		:key="special_price.id">
			<b-form-group
			:label="`Precio ${special_price.name}`"
			:label-for="`article-price-${special_price.name}`">
				<b-form-input
				type="number"
				min="0"
				:id="`article-price-${special_price.name}`"
				v-model="article[special_price.name]"
				:placeholder="`Ingrese el precio para ${special_price.name}`"></b-form-input>
			</b-form-group>
		</b-col>
	</b-form-row>
</template>
<script>
export default {
	props: ['article', 'user', 'porcentage_for_price', 'special_prices'],
	data() {
		return {

		}
	},
	computed: {
		col() {
			if (this.article.uncontable) {
				return 4
			}
			return 6
		}
	},
	methods: {
		changeToPrice() {
			console.log('cambiando a price')
			document.getElementById('article-price').focus()
		},
		changeToStock() {
			document.getElementById('article-stock').focus()
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
