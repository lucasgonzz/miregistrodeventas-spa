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
            return this.$store.state.sellers.models
        },
	},
}