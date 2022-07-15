import clients from '@/mixins/clients'
import sale_ticket from '@/mixins/sale_ticket'
export default {
	mixins: [clients, sale_ticket],
	computed: {
		items() {
			return this.$store.state.vender.items
		},
		combos() {
			return this.$store.state.vender.combos
		},
		articles() {
			return this.$store.state.articles.articles
		},
		article() {
			return this.$store.state.vender.article
		},
		vendiendo() {
			return this.$store.state.vender.vendiendo
		},
		client() {
			return this.$store.state.vender.client
		},
		col_header_lg() {
			if (this.hasExtencion('combos')) {
				return 3
			}
			return 5
		},
        maked_sale() {
            return this.$store.state.vender.sale
        },
		discounts() {
			return this.$store.state.discounts.discounts
		},
		sale_types() {
			return this.$store.state.sale_types.sale_types
		},
		client_discounts() {
			return this.discounts.filter(discount => {
				return this.client && (discount.client_id == this.client.id)
			})
		},
		common_discounts() {
			return this.discounts.filter(discount => {
				return !discount.client_id
			})
		},
		has_discounts_or_sale_types() {
            return this.discounts.length || this.sale_types.length
		},
	},
	methods: {
		callVender() {
			if (!this.is_provider) {
				this.vender()
			}
		},
		vender(print_ticket = false) {
			if (this.items.length) {
				this.$store.commit('articles/removeStock', this.items)
				this.$store.dispatch('vender/vender', {
					dolar_blue: this.dolar_blue, 
					selected_address: this.selected_address
				})
				.then(() => {
					this.$bvModal.hide('clients')
					this.$store.commit('vender/clients/setView', 0)
					if (this.is_provider) {
						this.$bvModal.show('successful-sale')
					} else {
						document.getElementById('article-bar-code').focus()
					}
					if (this.client) {
						this.updateClient(this.client)
					}
					this.$store.commit('vender/previus_sales/setIndex', 0)
					this.$store.commit('vender/previus_sales/setPreviusSale', {})
					if (print_ticket) {
						this.printTicket(this.maked_sale)
					}
				})
			}
		},
		setArticleForSale(article) {
			// this.articles.slice(0,33).forEach(art => {
			// 	this.addArticleForSale(art)
			// })
			if (typeof article == 'undefined' && this.article.bar_code != '') {
				article = this.articles.find(article => {
					return article.bar_code == this.getBarCode(this.article.bar_code)
				})
			} 
			if (this.checkRegister(article)) {
				console.log(article)
				let article_to_add = {
					...article,
					is_article: true,
					amount: '',
				}
				console.log(article_to_add)
				this.$store.commit('vender/setArticle', article_to_add)
				if (this.is_provider) {
					document.getElementById('article-amount').focus()
				} else {
					if (!this.isRepeat()) {
						this.article.amount = 1
						this.addArticleToArticlesSale()
					} 
				} 
			}
		},
		addArticleToArticlesSale() {
			if (!this.isRepeat()) {
				this.addArticleAndSetTotal()
			}
		},
		addArticleAndSetTotal() {
			let item = {
				...this.article
			}
			this.$store.commit('vender/addItem', item)
			this.$store.commit('vender/setTotal')
			this.clearArticle()
		},
		checkRegister(article) {
			console.log('checkRegister')
			console.log(article)
			if (typeof article == 'undefined') {
				let bar_code = this.getBarCode(this.article.bar_code)
				if (bar_code != '') {
					this.$store.commit('vender/setNewArticle', {bar_code})
					this.$bvModal.show('new-article')
					setTimeout(() => {
        				document.getElementById('new-article-price').focus()
					}, 500)
				}
				return false
			}
			return true
		},
		isRepeat() {
			let finded = this.items.find(item => {
				return item.id == this.article.id
			})
			if (typeof finded == 'undefined') {
				console.log('No esta repetido')
				return false
			} else {
				console.log('Esta repetido')
				finded.amount = Number(finded.amount)
				if (this.is_provider) {
					finded.amount += Number(this.article.amount)
				} else {
					finded.amount++
				}
				this.$store.commit('vender/updateItem', finded)
				this.$store.commit('vender/setTotal')
				this.clearArticle()
				return true
			}
		},
		clearArticle() {
			this.$store.commit('vender/setArticle', null)
			document.getElementById('article-bar-code').focus()
		},
		getItemsPreviusSale(sale) {
			let items = []
			let item = {}
			let item_to_add 
			sale.articles.forEach(article => {
				item.id = article.id
				item.name = article.name
				item.cost = Number(article.pivot.cost)
				item.price = Number(article.pivot.price)
				item.discount = Number(article.pivot.discount)
				item.amount = Number(article.pivot.amount)
				item_to_add = {
					...item,
					is_article: true,
				}
				console.log(item_to_add)
				items.push(item_to_add)
			})
			sale.combos.forEach(combo => {
				item.id = combo.id
				item.name = combo.name
				item.price = Number(combo.pivot.price)
				item.amount = Number(combo.pivot.amount)
				item_to_add = {
					...item,
					is_combo: true,
				}
				console.log(item_to_add)
				items.push(item_to_add)
			})
			console.log(items)
			return items
		},
	}
}