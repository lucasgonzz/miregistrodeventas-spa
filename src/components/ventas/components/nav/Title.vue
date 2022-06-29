<template>
<h5 class="m-0">
	<strong
	v-if="date_sale == ''">
		Ventas de hoy
	</strong>
	<strong
	v-else>
		Ventas del {{ date(date_sale) }}
	</strong>
</h5>
</template>
<script>
import moment from 'moment'
export default {
	name: 'HeaderTitle',
	computed: {
		date_sale() {
			return this.$store.state.sales.only_date
		},
	},
	methods: {
		// date(d) {
		// 	return moment(d).format('DD/MM/YY')
		// },
	}
}
</script>
<style scoped lang="sass">
h5
	@media screen and(max-width: 576px)
		text-align: center
</style>