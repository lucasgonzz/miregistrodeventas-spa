<template>
<b-row
class="row-total-card-previus-sales">
	<total></total>	
	<card-btn></card-btn>	
	<special-prices></special-prices>
	<previus-sales></previus-sales>
</b-row>
</template>
<script>
import Total from '@/components/vender/components/total-card-previus-sales/Total.vue'
import CardBtn from '@/components/vender/components/total-card-previus-sales/CardBtn.vue'
import SpecialPrices from '@/components/vender/components/total-card-previus-sales/SpecialPrices.vue'
import PreviusSales from '@/components/vender/components/total-card-previus-sales/PreviusSales.vue'
export default {
	name: 'MenuDataVender',
	components: {
		Total,
		CardBtn,
		SpecialPrices,
		PreviusSales,
	},
	data() {
		return {
		}
	},
	computed: {
	},
	methods: {
		nextSale() {
			this.$emit('nextSale')
		},
		previusSale() {
			this.$emit('previusSale')
		},
		cancelPreviusSale() {
			this.$emit('cancelPreviusSale')
		},
	},
}
</script>
<style lang="sass">
@import '@/sass/_custom.scss'
.row-total-card-previus-sales
	// .btn 
	// 	&:hover
	// 		background: $blue !important
	// 		color: #FFF !important
	// .btn-outline-primary
	// 	&:hover
	// 		background: #FFF !important
	// 		color: $blue !important
	// .col-12
	// 	align-items: center
		@media screen and (max-width: 992px)
			margin-bottom: 1em
			&:last-child
				margin-bottom: 0
</style>