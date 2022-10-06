export default {
	computed: {
		only_one_date() {
			return this.$store.state.sale.only_one_date
		},
		from() {
			return this.$store.state.sale.from
		},
		to() {
			return this.$store.state.sale.to
		},
		last_day_inclusive() {
			return this.$store.state.sale.last_day_inclusive
		},
	},
	methods: {
		onlyOneDate() {
			this.$store.commit('sale/setLoading', true)
			return this.$api.get('/sales/only-one-date/'+this.only_one_date)
            .then(res => {
				this.$store.commit('sale/setLoading', false)
                console.log(res.data.sales)
                this.$store.commit('sale/setSales', res.data.sales)
                this.$store.commit('sale/setSalesToShow')
                this.$store.commit('sale/setTotal')
            })
            .catch(err => {
				this.$store.commit('sale/setLoading', false)
                console.log(err)
            })
		},
		fromDate() {
			this.$store.commit('sale/setLoading', true)
			return this.$api.get('/sales/from-date/'+this.from+'/'+this.to+'/'+this.last_day_inclusive)
            .then(res => {
				this.$store.commit('sale/setLoading', false)
                console.log(res.data.sales)
                this.$store.commit('sale/setSalesToShow', res.data.sales)
                this.$store.commit('sale/setTotal')
            })
            .catch(err => {
				this.$store.commit('sale/setLoading', false)
                console.log(err)
            })
		}
	}
}