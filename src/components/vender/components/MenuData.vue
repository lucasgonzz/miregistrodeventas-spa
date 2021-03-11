<template>
<b-row>
	<b-col
	cols="12"
	lg="3"
	class="col-total">
		<p class="m-0">
			<strong class="total">
				Total: {{ price(total) }}
			</strong>
		</p>
		<p class="m-0">
			{{ articles.length }} artículos, {{ cantidad_unidades }} unidades
		</p>
	</b-col>
	<b-col
	cols="12"
	lg="3"
	class="col-credit-card">
		<b-button-group>
			<b-button 
			:variant="with_card ? 'primary' : 'outline-primary'"
			size="sm"
			@click="changeWithCard">
				<i class="icon-credit-card"></i>
			</b-button>
			<b-button 
			variant="outline-success" 
			size="sm"
			@click="showChangePercentageCard">
				<i class="icon-refresh"></i>
				{{ percentage_card }}%
			</b-button>
		</b-button-group>
	</b-col>
	<special-prices></special-prices>
	<b-col
	:offset-lg="offset"
	cols="12"
	lg="3"
	class="j-end">
		<previus-sales></previus-sales>
	</b-col>
</b-row>
</template>
<script>
import SpecialPrices from '@/components/vender/components/SpecialPrices.vue'
import PreviusSales from '@/components/vender/components/PreviusSales.vue'
export default {
	name: 'MenuDataVender',
	components: {
		SpecialPrices,
		PreviusSales,
	},
	data() {
		return {
		}
	},
	computed: {
		offset() {
			if (this.special_prices.length) {
				return 0
			}
			return 3
		},
		special_prices() {
			return this.$store.state.special_prices.special_prices
		},
		user() {
			return this.$store.state.auth.user
		},
		percentage_card : {
			set(percentage_card) {
				if (this.user) {
					this.user.percentage_card = percentage_card
				}
			},
			get() {
				if (this.user) {
					return this.user.percentage_card
				}
			}
		},
		total() {
			return this.$store.state.vender.total
		},
		articles() {
			return this.$store.state.vender.articles
		},
		cantidad_unidades() {
			let cant = 0
			this.articles.forEach(article => {
				cant += Number(article.amount)
			})
			return cant
		},
		with_card() {
			return this.$store.state.vender.with_card
		},
	},
	methods: {
		nextSale() {
			this.$emit('nextSale')
		},
		previusSale() {
			this.$emit('previusSale')
		},
		updatePreviusSale() {
			this.$emit('updatePreviusSale')
		},
		cancelPreviusSale() {
			this.$emit('cancelPreviusSale')
		},
		changeWithCard() {
			if (this.with_card) {
				this.$store.commit('vender/setWithCard', false)
			} else {
				this.$store.commit('vender/setWithCard', true)
			}
			this.$store.commit('vender/setTotal')
		},
		showChangePercentageCard() {
			this.$bvModal.show('change-percentage-card')
		},
	},
}
</script>
<style scoped lang="sass">
.btn 
	&:hover
		background: #4a2c82 !important
		color: #FFF !important
.btn-outline-primary
	&:hover
		background: #FFF !important
		color: #4a2c82 !important
.col-12
	align-items: center
	@media screen and (max-width: 992px)
		margin-bottom: 1em
		&:last-child
			margin-bottom: 0

.col-total
	display: flex
	flex-direction: column
	align-items: flex-start
	justify-content: flex-start
	@media screen and (min-width: 768px)
		p 
			text-align: left
.col-credit-card
	display: flex
	align-items: center
	@media screen and (max-width: 992px)
		justify-content: flex-end
	.btn 
		&:hover
			background: #fff
			color: #007bff
.icon-credit-card 
	font-size: 1.5rem

.p-price 
	display: block

.total 
	font-size: 1.5rem

</style>