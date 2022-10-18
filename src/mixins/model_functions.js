import dates from '@/mixins/dates'
export default {
	methods: {
		getFunctionValue(prop, model) {
			return this[prop.function](model)
			console.log('se llamo a '+prop.function)
			console.log('con el modelo')
			console.log(model)
		},
		budgetTotal(budget, formated = true) {
			console.log('se llamo a budgetTotal')
			let total = 0 
			budget.articles.forEach(article => {
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
		}
	}
}