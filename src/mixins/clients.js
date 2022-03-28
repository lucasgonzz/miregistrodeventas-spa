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
        },
        ivas() {
            return this.$store.state.ivas.ivas
        },
        options() {
            let options = []
            options.push({text: 'Seleccione iva', value: 0})
            this.ivas.forEach(iva => {
                options.push({text: iva.name, value: iva.id})
            })
            return options
        },
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