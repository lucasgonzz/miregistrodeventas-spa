import moment from 'moment'
import online from '@/mixins/online'
export default {
	mixins: [online],
	computed: {
        unconfirmed_orders_questions_calls_length() {
            if (this.has_online) {
                let unconfirmed_orders = this.$store.state.online.orders.unconfirmed_orders
                let questions = this.$store.state.online.questions.questions
                let messages_not_read = this.$store.state.online.buyers.messages_not_read
                let calls = this.$store.state.online.calls.calls
                return unconfirmed_orders.length + questions.length + messages_not_read + calls.length
            }
            return null
        },
        show_nav() {
            return this.current_page != 'Maps' && this.authenticated && this.current_page != 'Home'
        },
        show_nav_content() {
        	return this.user.status != 'super'
        },
	},
	methods: {
        logout() {
            this.$store.dispatch('auth/logout')
            .then(() => {
                this.$router.replace({name: 'Login'})
            })
		},
        activeLink(url) {
            return this.current_page == url ? 'active-link' : ''
            // active-link-mobile
        },
        toProduccion() {
        	if (this.can('budgets.index')) {
	        	this.$router.push({name: 'Produccion', params: {view: 'presupuestos'}})
	        	this.$store.dispatch('produccion/budgets/getModels')
        	} else if (this.can('order_productions.index')) {
	        	this.$router.push({name: 'Produccion', params: {view: 'ordenes-de-produccion'}})
	        	this.$store.dispatch('produccion/order_productions/getModels')
        	}
        },
		toVentas() {
			if (this.$route.name == 'Ventas') {
				this.$store.dispatch('sales/getModels')
				// this.$store.commit('sales/setFrom', '')
				// this.$store.commit('sales/setTo', '')
				// this.$store.commit('sales/setOnlyOneDate', '')
				// this.$store.commit('sales/setSelectedClient', null)
				this.$store.commit('sales/setSelected', [])
				this.$store.commit('sales/previus_days/setIndex', 0)
				this.$store.commit('sales/previus_days/setSelectedDay')
				this.$store.commit('sales/setDate', '')
				this.$store.dispatch('sales/previus_days/getDays')
			} else {
				if (this.user.addresses.length >= 2) {
					this.$router.replace({name: 'Ventas', params: {view: 'todas'}})
					this.$store.commit('sales/setSelectedAddress', {street: 'todas'})
					this.$store.commit('sales/setToShow')
				} else {
					this.$router.replace({name: 'Ventas'})
				}
			}
		},
		toListado() {
			if (this.$route.name == 'Listado') {
				this.$store.dispatch('articles/getArticles')
			} else {
				this.$router.replace({name: 'Listado'})
			}
		},
		toOnline() {
			if (this.$route.name == 'Online') {
				this.getOrdersAndQuestions()
			} else {
				console.log('entro')
				this.$router.replace({name: 'Online', params: {view: 'pedidos'}})
			}
		},
	}
}