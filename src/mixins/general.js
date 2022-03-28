import VueScreenSize from 'vue-screen-size'
export default {
	mixins: [VueScreenSize.VueScreenSizeMixin],
	computed: {
        user() {
        	return this.$store.state.auth.user
        },
        dolar_blue() {
        	let dolar = this.$store.state.coins.dolar_blue
        	if (this.user.dolar_plus) {
				dolar += Number(this.user.dolar_plus)
			}
			return dolar
        },
        current_page() {
            return this.$route.name
        },
		is_mobile() {
			if (this.$vssWidth < '992') {
				return true
			}
			return false
		},
		is_commerce() {
			return this.user.status == 'commerce'
		},
		is_super() {
			return this.user.status == 'super'
		},
		variant_color() {
			return '#007bff'
		},
	},
	methods: {
		hasRole(role) {
			let has_role = false
			this.user.roles.forEach(rol => {
		        if (rol.name == role) {
		            has_role = true
		        }
		    })
		    return has_role
		},
		capitalize(str) {
			return str.charAt(0).toUpperCase() + str.slice(1)
		},
		articleCost(article, from_pivot = false) {
			if (this.can('articles.cost') && article.cost) {
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
				if (article.pivot.with_dolar) {
					let dolar = article.pivot.with_dolar
					price = price * dolar
				}
			} else {
				price = article.price
				if (article.with_dolar) {
					let dolar = this.dolar_blue
					price = price * dolar
				}
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
		brand(article) {
			if (article.brand) {
				return article.brand.name
			}
			return '-'
		},
	}
}