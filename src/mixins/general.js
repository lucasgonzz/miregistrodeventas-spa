import VueScreenSize from 'vue-screen-size'
import moment from 'moment'
export default {
	mixins: [VueScreenSize.VueScreenSizeMixin],
	computed: {
        user() {
        	return this.$store.state.auth.user
        },
        today() {
        	return moment().format('YYYY-MM-DD')
        },
        dolar_blue() {
        	let coins_dolar = this.$store.state.coins.dolar
        	let dolar 
        	if (this.user.dolar == 'compra') {
        		dolar = coins_dolar.compra
        	} else if (this.user.dolar == 'venta') {
        		dolar = coins_dolar.venta
        	} else if (this.user.dolar == 'promedio') {
        		dolar = coins_dolar.promedio
        	} else if (this.user.dolar) {
        		dolar = Number(this.user.dolar)
        	}
        	if (this.user.dolar_plus) {
				dolar += Number(this.user.dolar_plus)
			}
			return dolar
        },
		view() {
			return this.$route.params.view
		},
		sub_view() {
			return this.$route.params.sub_view
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
		price_types() {
			return this.$store.state.price_type.models
		},
		price_types_with_position() {
			return this.price_types.filter(model => model.position != null)
		},
		client_vender() {
			return this.$store.state.vender.client
		},
		price_type_vender() {
			return this.$store.state.vender.price_type
		},
	},
	methods: {
		getPriceVender(item, from_pivot = false) {
			console.log('getPriceVender item')
			console.log(item)
			let price 
			if (from_pivot) {
				price = item.pivot.price 
			} else {
				price = item.price
				if (this.price_types_with_position.length && this.checkService(item)) {
					console.log(this.price_types_with_position)
					let limit 
					if (this.price_type_vender) {
						limit = this.price_type_vender
						console.log('position limit de vender: '+limit.position)
					} else {
						let last_position = 0
						this.price_types_with_position.forEach(price_type => {
							if (price_type.position > last_position) {
								limit = price_type
								last_position = price_type.position
							}
						})
					}
					console.log('precio arranca en: '+price)
					console.log('posision limite: '+limit.position)
					this.price_types_with_position.forEach(price_type => {
						if (price_type.position <= limit.position) {
							console.log('sumando el '+price_type.percentage)
							price = Number(price) + Number(price * price_type.percentage / 100) 
							console.log('quedo en: '+price)
						}
					})
				}
			}
			console.log('return price: '+price)
			return price
		},
		checkService(item) {
			if (item.is_service) {
				return this.user_configuration.apply_price_type_in_services
			}
			return true
		},
		getTotalArticle(article, from_pivot = false) {
			let price 
			let amount 
			let discount
			let returned_amount = 0
			if (from_pivot) {
				price = article.pivot.price
				amount = article.pivot.amount
				discount = article.pivot.discount
				returned_amount = article.pivot.returned_amount
			} else {
				price = article.price_vender 
				amount = article.amount
				discount = article.discount
				returned_amount = article.returned_amount
			}
			if (returned_amount > 0) {
				amount -= returned_amount
			}
			let total = price * amount
			if (discount && discount != '') {
				total -= total * Number(discount) / 100
			}
			return total
		},
		modelPlural(model, replace_guion = false) {
			if (model.charAt(model.length-1) == 'y') {
				return model.substring(0, model.length-1)+'ies'
			}
			model += 's'
			if (replace_guion) {
				model = model.replace('_', '-')
			}
			return model
		},
		// getOptions(options_store, model_name, prop_name = 'name') {
		// 	let store = options_store.substring(0, options_store.length-3)
		// 	console.log(store)
		// 	store = this.modelPlural(store)
		// 	console.log(store)
		// 	let models = this.$store.state[store].models

		// 	let options = []
		// 	options.push({
		// 		value: 0, text: 'Seleccione '+model_name
		// 	})
		// 	models.forEach(item => {
		// 		options.push({value: item.id, text: item[prop_name]})
		// 	})
		// 	return options
		// },
		routeString(value) {
			return value.toLowerCase().replaceAll(' ', '-')
		},
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
		articlePrice(article, from_pivot = false, formated = true, in_dolars = false) {
			let price
			if (from_pivot) {
				price = article.pivot.price
			} else {
				price = article.price
			}
			if (!from_pivot && !in_dolars && article.with_dolar) {
				price = price * this.dolar_blue
			}
			if (from_pivot && !in_dolars && article.pivot.with_dolar) {
				price = price * article.pivot.with_dolar
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