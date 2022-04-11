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
            return this.currentPage != 'Maps' && this.authenticated && this.currentPage != 'Home'
        },
        show_nav_content() {
        	return this.user.status != 'super'
        }
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
		toVentas() {
			if (this.$route.name == 'Ventas') {
				this.$store.dispatch('sales/getSales')
				this.$store.commit('sales/setFrom', '')
				this.$store.commit('sales/setTo', '')
				this.$store.commit('sales/setOnlyOneDate', '')
				this.$store.commit('sales/setSelectedClient', null)
				this.$store.commit('sales/days_previus_sales/setIndex', 0)
				this.$store.commit('sales/days_previus_sales/setDaySelected', moment().format('YYYY/MM/DD'))
				this.$store.dispatch('sales/days_previus_sales/getDaysPreviusSales')
			} else {
				this.$router.replace({name: 'Ventas'})
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