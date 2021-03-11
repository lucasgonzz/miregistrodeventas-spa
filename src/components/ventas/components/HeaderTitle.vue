<template>
<h5 class="m-0">
	<strong
	v-show="from == '' && to == '' && only_one_date == '' && !client">
		Ventas de hoy
	</strong>
	<strong
	v-show="from != '' && to != '' && only_one_date == '' && !client">
		Ventas desde {{ date(from) }} a {{ date(to) }}
	</strong>
	<strong
	v-show="only_one_date != '' && !client">
		Ventas del {{ date(only_one_date) }}
	</strong>
	<strong
	v-if="client">
		Ventas de {{ client.name }}
	</strong>
	<!-- <strong v-show="!is_from_date && !is_from_only_one_date  && !sales_from_client && !showing_statistics">
		Ventas de hoy 
	</strong>
	<strong v-show="is_from_date">
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
	</strong> -->
</h5>
</template>
<script>
import moment from 'moment'
export default {
	name: 'HeaderTitle',
	computed: {
		from() {
			return this.$store.state.sales.from
		},
		to() {
			return this.$store.state.sales.to
		},
		only_one_date() {
			return this.$store.state.sales.only_one_date
		},
		client() {
			return this.$store.state.sales.selected_client
		},
	},
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