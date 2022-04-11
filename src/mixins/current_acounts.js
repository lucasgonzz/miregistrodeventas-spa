export default {
	computed: {
        client() {
            return this.$store.state.clients.current_acounts.client
        },
        current_acounts() {
            return this.$store.state.clients.current_acounts.current_acounts
        },
        delete() {
            return this.$store.state.clients.current_acounts.delete
        },
        loading() {
            return this.$store.state.clients.current_acounts.loading
        },
	}
}