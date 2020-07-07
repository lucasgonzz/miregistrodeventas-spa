<template>
<h5 class="m-0">
	<strong v-show="!is_from_date && !is_from_only_one_date  && !sales_from_client && !showing_statistics">
		Ventas de hoy 
	</strong>
	<strong v-show="is_from_date && !showing_statistics">
		Desde {{ date(from) }} hasta {{ date(to) }} 
	</strong>
	<strong v-show="is_from_only_one_date && !showing_statistics">
		Ventas del {{ date(only_one_date) }}
	</strong>
	<strong v-if="sales_from_client && !showing_statistics">
		Ventas a {{ client.name }}
		<button class="btn btn-primary m-l-5"
				@click="removeSalesFromClient">
			<i class="icon-undo"></i>
		</button>
	</strong>
	<strong v-if="showing_statistics">
		Estadisticas
	</strong>
</h5>
</template>
<script>
import moment from 'moment'
export default {
	props: [
		'is_from_date', 'from', 'to', 
		'is_from_only_one_date', 'only_one_date',
		'sales_from_client', 'client', 'showing_statistics',
	],
	methods: {
		date(d) {
			return moment(d).format('DD/MM/YY')
		},
		removeSalesFromClient() {
			this.$emit('removeSalesFromClient')
		},
	}
}
</script>
<style scoped lang="sass">
h5
	@media screen and(max-width: 576px)
		text-align: center
</style>