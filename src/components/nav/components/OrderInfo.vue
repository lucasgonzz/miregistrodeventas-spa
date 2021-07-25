<template>
	<b-alert
	class="alert-online c-p"
	show
	v-if="unconfirmed_orders_questions_length >= 1 && !is_online_view"
	variant="danger">
		<div
		@click="toOnline">
			<h4 
			v-if="unconfirmed_orders.length">
				Hay pedidos
			</h4>
			<h4 
			v-if="questions.length">
				Hay preguntas
			</h4>
			<h4 
			v-if="messages_not_read">
				Hay mensajes
			</h4>
		</div>
	</b-alert>
</template>
<script>
import nav from '@/mixins/nav'
export default {
	mixins: [nav],
	computed: {
		unconfirmed_orders() {
			return this.$store.state.online.orders.unconfirmed_orders
		},
		questions() {
			return this.$store.state.online.questions.questions
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