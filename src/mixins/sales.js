export default {
	methods: {
		getTotalSale(sale, formated = true) {
			let total = 0
			sale.articles.forEach(article => {
                if (article.uncontable == 0) {
                    total += parseFloat(article.pivot.price) * article.pivot.amount
                } else {
                    if (article.pivot.measurement == article.measurement) {
                        total += parseFloat(article.pivot.price) * article.pivot.amount
                    } else {
                        total += parseFloat(article.pivot.price) * article.pivot.amount / 1000
                    }               
                }
			})
			if (sale.percentage_card) {
				let percentage_card = this.percentageCardFormated(sale.percentage_card)
				total = total * percentage_card
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
                if (article.uncontable == 0) {
                    total += parseFloat(article.pivot.cost) * article.pivot.amount
                } else {
                    if (article.pivot.measurement == article.measurement) {
                        total += parseFloat(article.pivot.cost) * article.pivot.amount
                    } else {
                        total += parseFloat(article.pivot.cost) * article.pivot.amount / 1000
                    }               
                }
			})
			if (sale.percentage_card) {
				let percentage_card = this.percentageCardFormated(sale.percentage_card)
				total = total * percentage_card
			}
			return this.price(total)
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