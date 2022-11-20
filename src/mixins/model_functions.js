import dates from '@/mixins/dates'
export default {
	methods: {
		getFunctionValue(prop, model) {
			return this[prop.function](model)
		},
		budgetTotal(model, formated = true) {
			let total = 0 
			model.articles.forEach(article => {
				let total_article = article.pivot.price * article.pivot.amount
				if (article.pivot.bonus) {
					total_article = total_article - (total_article * article.pivot.bonus / 100)
				}
				total += total_article
			})
			if (formated) {
				return dates.methods.price(total)
			} 
			return total  
		},
		providerOrderTotal(model, formated = true) {
			let total = 0 
			model.articles.forEach(article => {
				let total_article = article.pivot.cost * article.pivot.amount
				if (article.pivot.bonus) {
					total_article = total_article - (total_article * article.pivot.bonus / 100)
				}
				total += total_article
			})
			if (formated) {
				return dates.methods.price(total)
			} 
			return total  
		},
	}
}