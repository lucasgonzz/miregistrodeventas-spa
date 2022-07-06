export default {
    methods: {
        createClient() {
            this.$store.commit('clients/setModel', null)
            this.$bvModal.show('client')
        },
        editClient(client) {
            this.$store.commit('clients/setModel', client)
            this.$bvModal.show('client')
        },
        updateClient(client) {
            this.$api.get('clients/'+client.id)
            .then(res => {
                this.$store.commit('clients/update', res.data.client)
            })
            .catch(err => {
                console.log(err)
            })
        },
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