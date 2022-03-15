export default {
	computed: {
        seller_options() {
            let options = []
            options.push({
                value: 0,
                text: 'Cliente mio'
            })
            this.sellers.forEach(seller => {
                options.push({
                    value: seller.id,
                    text: seller.name
                })
            })
            return options
        },
        sellers() {
            return this.$store.state.sellers.sellers
        }
	},
    methods: {
        showCurrentAcounts(sale, is_client = false) {
            if (sale.client || is_client) {
                if (is_client) {
                    this.$store.commit('clients/current_acounts/setClient', sale)
                } else {
                    this.$store.commit('clients/current_acounts/setClient', sale.client)
                }
                this.$store.dispatch('clients/current_acounts/getCurrentAcounts')
                this.$store.commit('clients/current_acounts/setSelected', [])
                this.$bvModal.show('current-acounts')
            } 
        },
    }
}