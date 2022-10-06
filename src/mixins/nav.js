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
        	if (this.can('budget.index')) {
	        	this.$router.push({name: 'Produccion', params: {view: 'presupuestos'}})
	        	this.$store.dispatch('budget/getModels')
        	} else if (this.can('order_production.index')) {
	        	this.$router.push({name: 'Produccion', params: {view: 'ordenes-de-produccion'}})
	        	this.$store.dispatch('produccion/order_productions/getModels')
        	}
        },
		toVentas() {
			if (this.$route.name == 'Ventas') {
				this.$store.dispatch('sale/getModels')
				// this.$store.commit('sale/setFrom', '')
				// this.$store.commit('sale/setTo', '')
				// this.$store.commit('sale/setOnlyOneDate', '')
				// this.$store.commit('sale/setSelectedClient', null)
				this.$store.commit('sale/setSelected', [])
				this.$store.commit('sale/previus_days/setIndex', 0)
				this.$store.commit('sale/previus_days/setSelectedDay')
				this.$store.commit('sale/setDate', '')
				this.$store.commit('sale/setToShow')
				// this.$store.dispatch('sales/previus_days/getDays')
			} else {
				// let params = {}
				// if (this.user.addresses.length >= 2) {
				// 	params.view = 'todas'
				// 	this.$store.commit('sale/setSelectedAddress', {street: 'todas'})
				// } 
				// if (this.modelsStoreFromName('employee').length) {
				// 	params.sub_view = 'todos'
				// 	this.$store.commit('sale/setSelectedEmployee', {street: 'todos'})
				// }
				// this.$router.replace({name: 'Ventas', params})
				this.$router.replace({name: 'Ventas', params: {view: 'todas', sub_view: 'todos'}})
				this.$store.commit('sale/setToShow')
			}
		},
		toListado() {
			if (this.$route.name == 'Listado') {
				this.$store.dispatch('article/getModels')
			} else {
				this.$router.replace({name: 'Listado'})
			}
		},
		toClientes() {
			if (this.$route.name == 'Clientes') {
				this.$store.dispatch('client/getModels')
			} else {
				this.$router.replace({name: 'Clientes'})
			}
		},
		toEmpleados() {
			if (this.$route.name == 'Empleados') {
				this.$store.dispatch('employee/getModels')
			} else {
				this.$router.replace({name: 'Empleados'})
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