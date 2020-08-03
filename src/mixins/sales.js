export default {
	methods: {
		getSubTotalPriceArticle(article) {
			let total
			let amount = Number(article.pivot.amount)
			let price = Number(article.pivot.price)
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
		}
	}
}