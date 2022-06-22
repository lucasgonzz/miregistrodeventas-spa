import percentageCard from '@/mixins/percentageCard'
export default {
	mixins: [percentageCard],
	computed: {
		budgets() {
			return this.$store.state.produccion.budgets.models
		},
		loading() {
			return this.$store.state.produccion.budgets.loading
		},
		edit() {
			return this.$store.state.produccion.budgets.create.budget
		},
		client() {
			return this.$store.state.produccion.budgets.create.client
		},
		products() {
			return this.$store.state.produccion.budgets.create.products
		},
		observations() {
			return this.$store.state.produccion.budgets.create.observations
		},
		start_at: {
			get() {
				return this.$store.state.produccion.budgets.create.start_at
			},
			set(value) {
				this.$store.commit('produccion/budgets/create/setStartAt', value)
			}
		},
		finish_at: {
			get() {
				return this.$store.state.produccion.budgets.create.finish_at
			},
			set(value) {
				this.$store.commit('produccion/budgets/create/setFinishAt', value)
			}
		},
		delivery_and_placement: {
			get() {
				return this.$store.state.produccion.budgets.create.delivery_and_placement
			},
			set(value) {
				this.$store.commit('produccion/budgets/create/setDeliveryAndPlacement', value)
			}
		},
		can_edit() {
			return this.$store.state.produccion.budgets.create.can_edit
		},
		show_btn_production() {
			return this.$store.state.produccion.budgets.create.show_btn_production
		},
	},
	methods: {
		setBudgetEdit(budget) {
			this.$store.commit('produccion/budgets/create/setBudget', budget)
			this.$store.commit('produccion/budgets/create/setClient', budget.client)
			this.$store.commit('produccion/budgets/create/setProducts', budget.products)
			this.$store.commit('produccion/budgets/create/setStartAt', budget.start_at)
			this.$store.commit('produccion/budgets/create/setFinishAt', budget.finish_at)
			this.$store.commit('produccion/budgets/create/setDeliveryAndPlacement', budget.delivery_and_placement)
			this.$store.commit('produccion/budgets/create/setObservations', budget.observations)
		},
		numBudget(budget) {
			if (budget && budget.num) {
				let letras_faltantes = 8 - budget.num.toString().length
				let cbte_numero = ''
				for (let i=0; i < letras_faltantes; i++) { 
					cbte_numero += '0'
				}
				cbte_numero += budget.num
				return cbte_numero
			}
		},
		getProductTotal(product, formated = true) {
			let total = Number(product.price) * Number(product.amount)
			if (product.bonus != undefined && product.bonus != '') {
				total -= total * this.percentageToMultiply(product.bonus)
			}
			if (formated) {
				return this.price(total)
			}
			return total
		},
		getTotal(products, formated = true) {
			let total = 0
			products.forEach(product => {
				total += this.getProductTotal(product, false)
			})
			if (formated) {
				return this.price(total)
			}
			return total
		}
	}
}