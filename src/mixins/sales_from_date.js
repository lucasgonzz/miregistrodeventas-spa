export default {
	computed: {
		only_one_date() {
			return this.$store.state.sales.only_one_date
		},
		from() {
			return this.$store.state.sales.from
		},
		to() {
			return this.$store.state.sales.to
		},
		last_day_inclusive() {
			return this.$store.state.sales.last_day_inclusive
		},
	},
	methods: {
		onlyOneDate() {
			this.$store.commit('sales/setLoading', true)
			return this.$api.get('/sales/only-one-date/'+this.only_one_date)
            .then(res => {
				this.$store.commit('sales/setLoading', false)
                console.log(res.data.sales)
                this.$store.commit('sales/setSales', res.data.sales)
                this.$store.commit('sales/setSalesToShow')
                this.$store.commit('sales/setTotal')
            })
            .catch(err => {
				this.$store.commit('sales/setLoading', false)
                console.log(err)
            })
		},
		fromDate() {
			this.$store.commit('sales/setLoading', true)
			return this.$api.get('/sales/from-date/'+this.from+'/'+this.to+'/'+this.last_day_inclusive)
            .then(res => {
				this.$store.commit('sales/setLoading', false)
                console.log(res.data.sales)
                this.$store.commit('sales/setSalesToShow', res.data.sales)
                this.$store.commit('sales/setTotal')
            })
            .catch(err => {
				this.$store.commit('sales/setLoading', false)
                console.log(err)
            })
		}
	}
}