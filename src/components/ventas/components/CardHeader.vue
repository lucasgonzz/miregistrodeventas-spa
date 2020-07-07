<template>
<b-container fluid>
	<b-row>
		<b-col 
		cols="12"
		lg="3"
		class="col-header-title">
			<!-- Titulos del header -->
			<header-title   
			:is_from_date="is_from_date"
			:from="from"
			:to="to" 
			:is_from_only_one_date="is_from_only_one_date" 
			:only_one_date="only_one_date"
			:sales_from_client="sales_from_client" 
			:client="client"
			:showing_statistics="showing_statistics"
			@removeSalesFromClient="removeSalesFromClient"></header-title>
		</b-col>

		<b-col 
		v-if="!hasPermissionTo('sale.index.only_day', user, true)"
		cols="12"
		lg="6">
			<!-- Navegar entre las ventas anteriores -->
			<pervius-sales v-show="!is_from_date"
			:is_from_only_one_date="is_from_only_one_date" 
			:only_one_date="only_one_date"
			@getSales="getSales"
			@onlyOneDate="onlyOneDate"></pervius-sales>
		</b-col>

		<b-col
		class="col-header-buttons"
		cols="12"
		lg="3">
			<!-- Botones del header -->
			<header-buttons :user="user"
			:is_from_date="is_from_date" 
			:is_from_only_one_date="is_from_only_one_date"
			:showing_statistics="showing_statistics"
			@today="today"></header-buttons>
		</b-col>
	</b-row>
</b-container>
</template>
<script>
import HeaderTitle from './HeaderTitle.vue'
import PerviusSales from './PerviusSales.vue'
import HeaderButtons from './HeaderButtons.vue'
export default {
	props: ['is_from_date', 'from', 'to', 'is_from_only_one_date', 'only_one_date', 'sales_from_client', 'client', 'showing_statistics', 'user'],
	components: {
		HeaderTitle,
		PerviusSales,
		HeaderButtons
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
.col-12
	@media screen and (max-width: 992px)
		margin-bottom: 1.4em
		&:last-child
			margin-bottom: 0

.container-fluid
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