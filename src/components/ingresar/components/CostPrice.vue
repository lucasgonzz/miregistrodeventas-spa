<template>
	<b-form-row>
		<b-col cols="12" :sm="col">
			<b-form-group
			label="Costo"
			label-for="article-cost">
				<b-form-input
				type="number"
				id="article-cost"
				placeholder="Ingresa el costo del producto"
				v-model="article.cost"
				autocomplete="off"></b-form-input>
			</b-form-group>
		</b-col>
		<b-col cols="12" :sm="col">
			<b-form-group
			label="Precio"
			label-for="article-price">
				<b-form-input
				type="number"
				id="article-price"
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
		col() {
			if (this.article.uncontable) {
				return 4
			}
			return 6
		}
	},
	methods: {
		changeToPrice() {
			if (this.porcentage_for_price == 0) {
				// $('#price').focus()
			} else {
				// $('#stock').focus()
			}
		},
		changeToStock() {
			// $('#stock').focus()
		},
		changeFromPrice() {
			if (this.article.online) {
				// $('#online-price').focus()
			} else {
				// $('#stock').focus()
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
