import online from '@/mixins/online'
import model_functions from '@/mixins/model_functions'
export default {
	mixins: [online],
	computed: {
        sale_details() {
            return this.$store.state.sale.details
        },
        total_with_discounts: {
        	get() {
        		return this.$store.state.sale.total_with_discounts
        	},
        	set(value) {
        		this.$store.commit('sale/setTotalWithDiscounts', value)
        		this.$store.commit('sale/setTotal')
        	},
        },
        total_with_commissions: {
        	get() {
        		return this.$store.state.sale.total_with_commissions
        	},
        	set(value) {
        		this.$store.commit('sale/setTotalWithCommissions', value)
        		this.$store.commit('sale/setTotal')
        	},
        },
        total: {
        	get() {
        		return this.$store.state.sale.total
        	},
        	set(value) {
        		this.$store.commit('sale/setTotal', value)
        	}
        },
        total_cost() {
        	return this.$store.state.sale.total_cost
        },
        without_cost() {
        	return this.$store.state.sale.without_cost
        },
	},
	methods: {
        amount(amount) {
            let punto_index = amount.indexOf('.')
            if (amount.substr(punto_index) == '.00') {
                return amount.substr(0, punto_index)
            }
            return amount
        },
		getSubTotalPriceArticle(article) {
			let total
			let amount = Number(article.pivot.amount)
			let price = this.articlePrice(article, true, false)
            if (article.uncontable == 0) {
                total = price*amount
            } else {
                if (article.pivot.measurement == article.measurement) {
                    total = price*amount
                } else {
                    total = price*amount / 1000
                }               
            }
            return total
		},
		getSubTotalCostArticle(article) {
			let total = null
			let amount = Number(article.pivot.amount)
			let cost = Number(article.pivot.cost)
			if (cost) {
				if (article.uncontable == 0) {
					total = cost*amount
				} else {
					if (article.pivot.measurement == article.measurement) {
						total = cost*amount
					} else {
						total = cost*amount / 1000
					}               
				}
			}
			return total
		},
		getTotalSale(sale, formated = true, with_discounts = null, with_commissions = null) {
			if (!with_discounts) {
				with_discounts = this.total_with_discounts
			}
			if (!with_commissions) {
				with_commissions = this.total_with_commissions
			}
			let without_cost = false
			let total_cost = 0
			let total = 0
			let total_article = 0
			let total_service = 0
			let total_articles = 0
			let amount = 0
			let returned_amount = 0 
			sale.articles.forEach(article => {
				if (article.pivot.cost) {
					total_cost += Number(article.pivot.cost) * Number(article.pivot.amount)			
				} else {
					without_cost = true
				}

				amount = Number(article.pivot.amount)
				returned_amount = Number(article.pivot.returned_amount)
				if (returned_amount > 0) {
					amount -= returned_amount
				}
				total_article = Number(article.pivot.price) * amount	
				if (article.pivot.discount && article.pivot.discount != '') {
					total_article -= total_article * Number(article.pivot.discount) / 100
				}
				total += total_article 
				total_articles += article.pivot.amount			
			})
			sale.combos.forEach(combo => {
				total += combo.pivot.price * combo.pivot.amount		
			})
			sale.services.forEach(service => {
				total_service = Number(service.pivot.price) * Number(service.pivot.amount)
				if (service.pivot.discount && service.pivot.discount != '') {
					total_service -= total_service * Number(service.pivot.discount) / 100
				}
				total += total_service		
			})
			if (sale.percentage_card) {
				let percentage_card = this.percentageCardFormated(sale.percentage_card)
				total = total*percentage_card
			}
			if (sale.order) {
				total = online.methods.discountCupon(sale.order, total)
			}
			if (sale.budget) {
				total = model_functions.methods.budgetTotal(sale.budget, false)
			}
			if (with_discounts && sale.discounts.length) {
				sale.discounts.forEach(dis => {
					total -= total * Number(dis.pivot.percentage) / 100
				})
			}
			if (sale.surchages.length) {
				sale.surchages.forEach(surchage => {
					total += total * Number(surchage.pivot.percentage) / 100
				})
			}
			if (with_commissions && sale.commissions.length) {
				sale.commissions.forEach(com => {
					total -= com.monto
				})
			}

			if (formated) {
				return {
					without_cost: without_cost,
					total_articles: total_articles,
					cost: this.price(total_cost),
					total: this.price(total),
				}
			} else {
				return {
					without_cost: without_cost,
					total_articles: total_articles,
					cost: total_cost,
					total: total,
				}
			}
		},
		getTotalCostSale(sale) {
			let total = 0
			sale.articles.forEach(article => {
				total += this.getSubTotalCostArticle(article)
			})
			if (sale.percentage_card) {
				let percentage_card = this.percentageCardFormated(sale.percentage_card)
				total = total*percentage_card
			}
			if (total != 0) {
				return this.price(total)
			} 
			return '-'
		},
		percentageCardFormated(p) {
			let percentage_card = Number(p)
			if (percentage_card < 10) {
				return Number('1.0'+percentage_card)
			} 
			return Number('1.'+percentage_card)
		},
		percentageFormated(p) {
			let percentage_card = Number(p)
			if (percentage_card < 10) {
				return Number('0.0'+percentage_card)
			} 
			return Number('0.'+percentage_card)
		},
	}
}