export default {
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
		getTotalSale(sale, formated = true) {
			let total = 0
			sale.articles.forEach(article => {
				total += this.getSubTotalPriceArticle(article)				
			})
			if (sale.percentage_card) {
				let percentage_card = this.percentageCardFormated(sale.percentage_card)
				total = total*percentage_card
			}
			if (sale.discounts.length) {
				sale.discounts.forEach(dis => {
					total -= total * this.percentageFormated(dis.pivot.percentage)
				})
			}
			if (sale.commissions.length) {
				sale.commissions.forEach(com => {
					total -= com.monto
				})
			}
			if (formated) {
				return this.price(total)
			} else {
				return total
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