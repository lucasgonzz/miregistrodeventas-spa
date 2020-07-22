<template>
	<b-row v-show="special_prices.length">
		<b-col
		sm="6"
		md="4">
			<b-form-group>
				<b-form-select
				v-model="special_price"
				@change="setSpecialPrice"
				:options="special_prices_options"></b-form-select>
			</b-form-group>
		</b-col>
	</b-row>
</template>
<script>
export default {
	data() {
		return {
			special_price: 0,
		}
	},
	computed: {
		special_prices() {
			return this.$store.state.special_prices
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
	methods: {
		setSpecialPrice() {
			this.$emit('setSpecialPrice', this.special_price)
		}
	}
}
</script>