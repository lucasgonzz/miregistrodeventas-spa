export default {
	computed: {
        user() {
        	return this.$store.state.auth.user
        },
        // articles() {
        // 	return this.$store.state.articles.articles
        // },
	},
	methods: {
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