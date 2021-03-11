import moment from 'moment'
export default {
	methods: {
		toVentas() {
			if (this.$route.name == 'Ventas') {
				this.$store.dispatch('sales/getSales')
				this.$store.commit('sales/setFrom', '')
				this.$store.commit('sales/setTo', '')
				this.$store.commit('sales/setOnlyOneDate', '')
				this.$store.commit('sales/setSelectedClient', null)
				this.$store.commit('sales/days_previus_sales/setIndex', 0)
				this.$store.commit('sales/days_previus_sales/setDaySelected', moment().format('YYYY/MM/DD'))
				this.$store.dispatch('sales/days_previus_sales/getDaysPreviusSales')
			} else {
				this.$router.replace({name: 'Ventas'})
			}
		},
		toListado() {
			if (this.$route.name == 'Listado') {
				this.$store.dispatch('articles/getArticles')
			} else {
				this.$router.replace({name: 'Listado'})
			}
		},
	}
}