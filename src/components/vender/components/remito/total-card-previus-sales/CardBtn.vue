<template>
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
</template>
<script>
export default {
	computed: {
		percentage_card : {
			set(percentage_card) {
				this.user.percentage_card = percentage_card
			},
			get() {
				return this.user.percentage_card
			}
		},
		with_card() {
			return this.$store.state.vender.with_card
		},
	},
	methods: {
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
	}
}
</script>
<style lang="sass">
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
</style>