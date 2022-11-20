<template>
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
</template>
<script>
import nav from '@/mixins/nav'
export default {
	mixins: [nav],
	computed: {
		orders_title() {
			let title = this.unconfirmed_orders.length+' '
			if (this.unconfirmed_orders.length == 1) {
				title += ' pedido'
			} else {
				title += ' pedidos'
			}
			title += ' sin responder'
			return title
		},
		questions_title() {
			let title = this.questions.length+' '
			if (this.questions.length == 1) {
				title += ' pregunta'
			} else {
				title += ' preguntas'
			}
			title += ' sin responder'
			return title
		},
		messages_title() {
			let title = this.messages_not_read+' '
			if (this.messages_not_read == 1) {
				title += ' mensaje'
			} else {
				title += ' mensajes'
			}
			title += ' sin responder'
			return title
		},
		calls_title() {
			let title = this.calls.length+' '
			if (this.calls.length == 1) {
				title += ' llamada'
			} else {
				title += ' llamadas'
			}
			title += ' sin responder'
			return title
		},
		unconfirmed_orders() {
			return this.$store.state.online.orders.unconfirmed_orders
		},
		questions() {
			return this.$store.state.online.questions.questions
		},
		calls() {
			return this.$store.state.online.calls.calls
		},
		messages_not_read() {
			return this.$store.state.online.buyers.messages_not_read
		},
		is_online_view() {
			return this.$route.name == 'Online'
		}
	},
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