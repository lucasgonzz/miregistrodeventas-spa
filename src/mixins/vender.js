import clients from '@/mixins/clients'
import previus_sales from '@/mixins/previus_sales'
import sale_ticket from '@/mixins/sale_ticket'
export default {
	mixins: [clients, previus_sales, sale_ticket],
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
			let col = 5
			if (this.hasExtencion('combos')) {
				col -= 2 
			}
			if (this.hasExtencion('services')) {
				col -= 2 
			}
			return col
		},
        maked_sale() {
            return this.$store.state.vender.sale
        },
		sale_types() {
			return this.$store.state.sale_types.sale_types
		},
		has_discounts_or_sale_types() {
            return this.discounts.length || this.sale_types.length
		},
		save_current_acount: {
			get() {
				return this.$store.state.vender.save_current_acount
			},
			set(value) {
				this.$store.commit('vender/setSaveCurrentAcount', value)
			}
		},
		make_current_acount_pago: {
			get() {
				return this.$store.state.vender.make_current_acount_pago
			},
			set(value) {
				this.$store.commit('vender/setMakeCurrentAcountPago', value)
			}
		},
	},
	methods: {
		setItemsPrices(only_the_last = false, from_pivot = false) {
			if (only_the_last) {
				let last_item = this.items[0] 
				last_item.price_vender = this.getPriceVender(last_item) 
			} else {
				this.items.forEach(item => {
					item.price_vender = this.getPriceVender(item, from_pivot) 
				})
			}
		},
		callVender() {
			if (!this.is_provider) {
				this.vender()
			}
		},
		vender(print_ticket = false) {
			if (this.items.length) {
				this.$store.commit('article/removeStock', this.items)
				this.$store.dispatch('vender/vender', {
					dolar_blue: this.dolar_blue, 
					selected_address: this.selected_address
				})
				.then(() => {
					// this.$bvModal.hide('clients')
					// this.$store.commit('vender/clients/setView', 0)
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
		setVenderArticle(article) {
			// this.articles.slice(0,33).forEach(art => {
			// 	this.addArticleForSale(art)
			// })
			// if (typeof article == 'undefined' && this.article.bar_code != '') {
			// 	article = this.articles.find(article => {
			// 		return article.bar_code == this.getBarCode(this.article.bar_code)
			// 	})
			// } 
			console.log(article)
			if (this.checkRegister(article)) {
				let article_to_add = {
					...article,
					amount: '',
				}
				this.$store.commit('vender/setArticle', article_to_add)
				if (this.is_provider) {
					setTimeout(() => {
						document.getElementById('article-amount').focus()
					}, 500)
				} else {
					if (!this.isRepeat()) {
						this.article.amount = 1
						this.addArticleToSale()
					} 
				} 
			}
		},
		addArticleToSale() {
			if (!this.isRepeat()) {
				this.addArticleAndSetTotal()
			} 
		},
		addArticleAndSetTotal() {
			if (this.article.amount == '') {
				console.log
				this.article.amount = 1
			} 
			let item = {
				...this.article,
				is_article: true,
			}
			this.$store.commit('vender/addItem', item)
			if (this.index_previus_sales > 0) {
				this.setItemsPrices(true, false)
			} else {
				this.setItemsPrices()
			}
			this.$store.commit('vender/setTotal')
			console.log('Se agrego item')
			this.clearArticle()
		},
		checkRegister(article) {
			if (!article || typeof article == 'undefined') {
				let bar_code = this.getBarCode(this.article.bar_code)
				console.log(this.article)
				if (bar_code != '') {
					this.setNewArticle({name: '', bar_code})
				} else {
					this.setNewArticle({name: this.article.name})
				}
				return false
			}
			return true
		},
		setNewArticle(article) {
			this.$store.commit('vender/setNewArticle', article)
			this.$bvModal.show('new-article')
			setTimeout(() => {
				document.getElementById('new-article-price').focus()
			}, 500)
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
			document.getElementById('search-article').value = ''
			console.log('Se limpio articulo')
		},
		getItemsPreviusSale(sale) {
			let items = []
			let item = {}
			let item_to_add 
			sale.articles.forEach(article => {
				item.id = article.id
				item.name = article.name
				item.pivot = article.pivot
				item.cost = Number(article.pivot.cost)
				item.price = Number(article.price)
				item.discount = Number(article.pivot.discount)
				item.amount = Number(article.pivot.amount)
				item_to_add = {
					...item,
					is_article: true,
				}
				items.push(item_to_add)
			})
			sale.combos.forEach(combo => {
				item.id = combo.id
				item.name = combo.name
				item.pivot = article.pivot
				// item.price = Number(combo.pivot.price)
				item.amount = Number(combo.pivot.amount)
				item_to_add = {
					...item,
					is_combo: true,
				}
				items.push(item_to_add)
			})
			sale.services.forEach(service => {
				item.id = service.id
				item.name = service.name
				item.pivot = service.pivot
				// item.price = Number(service.pivot.price)
				item.discount = Number(service.pivot.discount)
				item.amount = Number(service.pivot.amount)
				item_to_add = {
					...item,
					is_service: true,
				}
				items.push(item_to_add)
			})
			console.log(items)
			return items
		},
	}
}