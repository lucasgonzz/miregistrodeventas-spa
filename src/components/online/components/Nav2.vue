<template>
	<b-row>
		<b-col
		cols="12"
		class="col-nav">
			<b-nav tabs>
				<b-nav-item
				v-if="can('online.orders')"
				@click="setView('pedidos')"
				:class="isActive('pedidos')">
					Pedidos
					<b-badge
					variant="danger"
					v-show="orders.length">
						{{ orders.length }}
					</b-badge>
				</b-nav-item>
				<b-nav-item
				v-if="can('online.questions')"
				@click="setView('preguntas')"
				:class="isActive('preguntas')">
					Preguntas
					<b-badge
					variant="danger"
					v-show="questions.length">
						{{ questions.length }}
					</b-badge>
				</b-nav-item>
				<b-nav-item
				v-if="can('online.buyers')"
				@click="setView('clientes')"
				:class="isActive('clientes')">
					Clientes
				</b-nav-item>
				<b-nav-item
				v-if="can('online.messages')"
				@click="setView('mensajes')"
				:class="isActive('mensajes')">
					Mensajes
					<b-badge
					variant="danger"
					v-show="messages_not_read > 0">
						{{ messages_not_read }}
					</b-badge>
				</b-nav-item>
				<b-nav-item
				v-if="can('online.cupons')"
				@click="setView('cupones')"
				:class="isActive('cupones')">
					Cupones
				</b-nav-item>
				<!-- <b-nav-item
				@click="setView('examine')"
				:class="isActive('examine')">
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
			}else if (view == 'cupones') {
				this.getActiveCupons()
			}
		},
		isActive(name) {
			if (this.view == name) {
				return 'active'
			}
		},
	}
}
</script>
<style scoped lang="sass">
@import '@/sass/_custom'
.nav-tabs
	width: 100%
	border: none 
	.nav-item
		// margin: 0 .2em
		background: $blue
		// border-radius: 5px 5px 0 0 
		.nav-link
			color: #FFF
		&:focus
			border: none !important
			text-decoration: none
	.active 
		font-weight: bold
		background: #FFF
		// border-top: 2px solid $blue
		// border-left: 2px solid $blue
		// border-right: 2px solid $blue
		// box-shadow: 0px 3px 7px rgb(0 0 0 / 15%) !important
		.nav-link
			color: #000
.badge 
	font-size: 1em
</style>