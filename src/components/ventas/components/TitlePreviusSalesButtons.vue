<template>
<b-row class="m-t-25 m-b-20">
	<!-- Titulos del header -->
	<b-col 
	cols="12"
	:lg="lg_header_title"
	class="col-header-title">
		<header-title></header-title>
	</b-col>

	<!-- Navegar entre las ventas anteriores -->
	<b-col 
	cols="12"
	lg="6">
		<pervius-sales 
		:is_from_only_one_date="is_from_only_one_date" 
		:only_one_date="only_one_date"
		@getSales="getSales"
		@onlyOneDate="onlyOneDate"></pervius-sales>
	</b-col>

	<!-- Botones del header -->
	<b-col
	class="col-header-buttons"
	cols="12"
	lg="3">
		<header-buttons></header-buttons>
	</b-col>
</b-row>
</template>
<script>
import HeaderTitle from './HeaderTitle.vue'
import PerviusSales from './PerviusSales.vue'
import HeaderButtons from './HeaderButtons.vue'
export default {
	props: ['is_from_date', 'from', 'to', 'is_from_only_one_date', 'only_one_date', 'sales_from_client', 'client', 'showing_statistics'],
	components: {
		HeaderTitle,
		PerviusSales,
		HeaderButtons
	},
	computed: {
		lg_header_title() {
			if (this.is_from_date) {
				return 9
			}
			return 3
		}
	},
	methods: {
		removeSalesFromClient() {
			this.$emit('removeSalesFromClient')
		},
		getSales() {
			this.$emit('getSales')
		},
		onlyOneDate(date) {
			this.$emit('onlyOneDate', date)
		},
		today() {
			this.$emit('today')
		}
	}
}
</script>
<style scoped lang="sass">
.row
	@media screen and (min-width: 992px)
		margin-bottom: 10px
	@media screen and (max-width: 992px)
		margin-bottom: 0
.col-12
	@media screen and (max-width: 992px)
		margin-bottom: 1.4em
		&:last-child
			margin-bottom: 0

.container-fluid
	padding: 0
	@media screen and (min-width: 992px)
		margin-top: 15px

.col-header-title
	@media screen and (min-width: 992px)
		display: flex
		justify-content: flex-start
		align-items: center

.col-header-buttons
	@media screen and (min-width: 992px)
		display: flex
		justify-content: flex-end
</style>