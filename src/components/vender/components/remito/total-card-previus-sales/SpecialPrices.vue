<template>
	<b-col
	cols="12"
	v-show="special_prices.length"
	lg="3">
		<b-form-group>
			<b-form-select
			v-model="special_price_id"
			:options="special_prices_options"></b-form-select>
		</b-form-group>
	</b-col>
</template>
<script>
export default {
	computed: {
		special_price_id: {
			get() {
				return this.$store.state.vender.special_price_id
			},
			set(value) {
	            this.$store.commit('vender/setSpecialPriceId', value)
			}
		},
		special_prices() {
			return this.$store.state.special_prices.special_prices
		},
		special_prices_options() {
			let options = []
			options.push({text: 'Precio Normal', value: 0})
			this.special_prices.forEach(special_price => {
				options.push({text: `Precio ${special_price.name}` , value: special_price.id})
			})
			return options
		}
	},
}
</script>
<style scoped lang="sass">
.col-12
	align-items: center
</style>