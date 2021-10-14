export default {
	computed: {
        user() {
        	return this.$store.state.auth.user
        },
        dolar_blue() {
        	return this.$store.state.coins.dolar_blue
        },
        // articles() {
        // 	return this.$store.state.articles.articles
        // },
	},
	methods: {
		capitalize(str) {
			return str.charAt(0).toUpperCase() + str.slice(1)
		},
		articleCost(article, from_pivot = false) {
			if (this.can('Ver costos de articulos')) {
				let cost
				if (from_pivot) {
					cost = article.pivot.cost
				} else {
					cost = article.cost
				}
				if (this.user.with_dolar) {
					return this.price(cost)+' / '+this.price(cost * this.dolar_blue)
				}
				return this.price(cost)
			}
			return '-'
		},
		articlePrice(article, from_pivot = false, formated = false) {
			let price
			if (from_pivot) {
				price = article.pivot.price
			} else {
				price = article.price
			}
			if (this.user.with_dolar) {
				price = price * this.dolar_blue
			}
			if (formated) {
				return this.price(price)
			}
			return price
		},
		scrollBottom(el) {
			setTimeout(() => {
				let container = document.getElementById(el)
				if (container) {
					container.scrollTop = container.scrollHeight
				}
			}, 1)
		},
		getBarCode(bar_code) {
			return bar_code.replace(/\s+/g, '')
		},
        amount(amount) {
            let punto_index = amount.indexOf('.')
            if (amount.substr(punto_index) == '.00') {
                return amount.substr(0, punto_index)
            }
            return amount
        },
		stock(article, formated = true) {
			if (article.variants && article.variants.length) {
				let stock = 0
				article.variants.forEach(variant => {
					stock += variant.stock
				})
				return stock
			}
			if (article.stock) {
				return article.stock
			}
			if (formated) {
				return '-'
			} else {
				return null
			}
		},
		isMobile() {
			if (this.$vssWidth < '768') {
				return true
			}
			return false
		},
	}
}