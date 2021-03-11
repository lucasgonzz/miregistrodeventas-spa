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
        showCurrentAcounts(client) {
            this.$store.dispatch('clients/getClientCurrentAcounts', client)
            this.$bvModal.show('current-acounts')
        },
    }
}