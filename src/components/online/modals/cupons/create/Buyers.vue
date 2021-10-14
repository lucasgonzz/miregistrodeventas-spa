<template>
	<div
	class="m-b-20">
		<p>
			Este cupon sera:
		</p>
		<b-form-group>
			<b-button
			size="sm"
			variant="primary"
			@click="setAllBuyers">
				Para todos los clientes
			</b-button>
		</b-form-group>
		<div>
			<b-form-group
			label="O selecciona a los clientes que quieras">
				<autocomplete 
				ref="buyerSearch"
				autoSelect
				placeholder="Buscar un cliente"
				:search="search" 
				:get-result-value="getResultValue"
				@submit="addBuyer"></autocomplete>
			</b-form-group>
			<b-form-group
			v-if="new_cupon.buyers.length">
				<span 
				v-for="buyer in new_cupon.buyers"
				class="buyer-cupon bg-primary">
					{{ buyer.name }} {{ buyer.surname }}
					<span 
					@click="removeBuyer(buyer)"
					class="remove c-p">
						<span class="icon-cancel"></span>
					</span>
				</span>
			</b-form-group>
		</div>
		<hr>
	</div>
</template>
<script>
import cupons from '@/mixins/cupons'
import Autocomplete from '@trevoreyre/autocomplete-vue'
export default {
	mixins: [cupons],
	components: {
		Autocomplete,
	},
	computed: {
		buyers() {
			return this.$store.state.online.buyers.buyers
		},
	},
	methods: {
		search(input) {
			if (input.length > 2) {
				let buyers = this.buyers.filter(buyer => {
					return buyer.name.toLowerCase().includes(input.toLowerCase())
				})
				return buyers
			} 
			return []
		},
		getResultValue(buyer) {
			return buyer.name+' '+buyer.surname
		},
		addBuyer(buyer) {
			this.addBuyerIfNotExist(buyer)
			this.$refs.buyerSearch.value = ''
		},
		addBuyerIfNotExist(buyer) {
			let index = this.new_cupon.buyers.findIndex(b => {
				return b.id == buyer.id
			})
			if (index == -1) {
				this.new_cupon.buyers.push(buyer)
			}
		},
		removeBuyer(buyer) {
			let index = this.new_cupon.buyers.findIndex(b => {
				return b.id == buyer.id
			})
			this.new_cupon.buyers.splice(index, 1)
		},
		setAllBuyers() {
			this.buyers.forEach(buyer => {
				this.addBuyerIfNotExist(buyer)
			})
		}
	}
}
</script>
<style lang="sass">
.buyer-cupon 
	color: #FFF
	padding: .5em 1em
	margin: .5em .5em .5em 0
	border-radius: .5em
	display: inline-block
	.remove 
		padding-left: .5em
</style>