<template>
	<div>
		<b-alert
		class="alert-online c-p s apretable"
		show
		v-if="unconfirmed_length >= 1 && !is_online_view"
		variant="danger">
			<div
			@click="toOnline">
				<h4 >
					{{ unconfirmed_length }} pedidos sin confirmar
				</h4>
			</div>
		</b-alert>
		<b-alert
		class="alert-online c-p s apretable"
		show
		v-if="messages_not_read >= 1 && !is_online_view"
		variant="danger">
			<div
			@click="toMessages">
				<h4 >
					{{ messages_not_read }} mensajes sin leer
				</h4>
			</div>
		</b-alert>
	</div>
</template>
<script>
import nav from '@/mixins/nav'
export default {
	mixins: [nav],
	computed: {
		is_online_view() {
			return this.$route.name == 'Online'
		},
        unconfirmed_length() {
            if (this.has_online) {
                let orders = this.$store.state.order.unconfirmed_models
                return orders.filter(model => {
                	return model.order_status.name == 'Sin confirmar'
                }).length 
            }
            return null
        },
        messages_not_read() {
            if (this.has_online) {
                return this.$store.state.buyer.messages_not_read
            }
            return null
        },
	},
	methods: {
		toMessages() {
			this.$router.push({name: 'Online', params: {view: 'mensajes', chat_id: null}})
		}
	}
}
</script>
<style lang="sass">
.alert-online
	margin: 0 15px
	h4
		margin-bottom: 1em
		&:last-child
			margin-bottom: 0
</style>