import dates from '@/mixins/dates'
export default {
	methods: {
		getFunctionValue(prop, model) {
			return this[prop.function](model)
		},
		orderTotal(model, formated = true) {
			let total = 0 
			model.articles.forEach(article => {
				let total_article = article.pivot.price * article.pivot.amount
				total += total_article
			})
			if (model.cupon) {
				if (model.cupon.percentage) {
					total -= total * model.cupon.percentage / 100
				} else if (model.cupon.amount) {
					total -= model.cupon.amount
				}
			}
			if (formated) {
				return dates.methods.price(total)
			} 
			return total  
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
				if (article.pivot.iva_id && article.pivot.iva_id != 0) {
					let iva = this.modelsStoreFromName('iva').find(model => {
						return model.id == article.pivot.iva_id
					})
					if (typeof iva != 'undefined') {
						total_article += total_article * iva.percentage / 100		
					}
				}
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