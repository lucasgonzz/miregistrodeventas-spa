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
		budget_model() {
			if (this.edit) {
				return this.edit
			}
			return this.create
		},
		edit() {
			return this.$store.state.produccion.budgets.edit
		},
		create() {
			return this.$store.state.produccion.budgets.create
		},
	},
	methods: {
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
			if (product.bonus != '') {
				total -= total * this.percentageToMultiply(product.bonus)
			}
			if (formated) {
				return this.price(total)
			}
			return total
		},
		getTotal(budget, formated = true) {
			let total = 0
			budget.products.forEach(product => {
				total += this.getProductTotal(product, false)
			})
			if (formated) {
				return this.price(total)
			}
			return total
		}
	}
}