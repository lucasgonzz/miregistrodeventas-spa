<template>
	<b-row>
		<b-col
		cols="12"
		class="col-nav">
			<b-nav tabs>
				<b-nav-item
				@click="setView('pedidos')"
				:active="isActive('pedidos')">
					Pedidos
					<b-badge
					variant="danger"
					v-show="orders.length">
						{{ orders.length }}
					</b-badge>
				</b-nav-item>
				<b-nav-item
				@click="setView('preguntas')"
				:active="isActive('preguntas')">
					Preguntas
					<b-badge
					variant="danger"
					v-show="questions.length">
						{{ questions.length }}
					</b-badge>
				</b-nav-item>
				<b-nav-item
				@click="setView('clientes')"
				:active="isActive('clientes')">
					Clientes
				</b-nav-item>
				<b-nav-item
				@click="setView('mensajes')"
				:active="isActive('mensajes')">
					Mensajes
					<b-badge
					variant="danger"
					v-show="messages_not_read > 0">
						{{ messages_not_read }}
					</b-badge>
				</b-nav-item>
				<!-- <b-nav-item
				@click="setView('examine')"
				:active="isActive('examine')">
					Examinar
				</b-nav-item> -->
			</b-nav>
		</b-col>
	</b-row>
</template>
<script>
import online from '@/mixins/online'
export default {
	name: 'NavComponentOnline',
	mixins: [online],
	computed: {
		orders() {
			return this.$store.state.online.orders.unconfirmed_orders
		},
		questions() {
			return this.$store.state.online.questions.questions
		},
	},
	methods: {
		setView(view) {
			if (this.view != view) {
				console.log('set view')
				this.$router.push({name: 'Online', params: {view: view}})
			}
			if (view == 'pedidos') {
				this.getOrders()
			} else if (view == 'mensajes') {
				this.$store.commit('online/messages/setSelectedBuyer', null)
			} else if (view == 'preguntas') {
				this.getQuestions()
			} else if (view == 'clientes') {
				this.getBuyers()
			} else if (view == 'examine') {
				this.getExamine()
			}
		},
		isActive(name) {
			return this.view == name
		},
	}
}
</script>
<style scoped lang="sass">
.nav-tabs
	width: 100%
	.nav-item
		margin: 0 .2em
.badge 
	font-size: 1em
</style>