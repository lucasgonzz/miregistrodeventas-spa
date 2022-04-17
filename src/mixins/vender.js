import clients from '@/mixins/clients'
export default {
	mixins: [clients],
	computed: {
		articles_for_sale() {
			return this.$store.state.vender.articles
		},
		article_for_sale() {
			return this.$store.state.vender.article_for_sale
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
	},
	methods: {
		// Se setea el precio especial del articulo para que ya le quede
		// asignado en el objeto y se envie a salecontroller@store
		setArticlesPrice() {
			this.articles_for_sale.forEach(article => {
				if (this.special_price_id != 0) {
					if (article.special_prices.length) {
						article.special_prices.forEach(special_price => {
							if (special_price.id == this.special_price_id) {
								// article = Object.assign(article, {price_for_sale: special_price.pivot.price})
								this.$set(article, 'price_for_sale', Number(special_price.pivot.price))
								this.$store.commit('vender/updateArticle', article)
							} 
						})
					}
				} else { 
					// article = Object.assign(article, {price_for_sale: article.original_price})
					this.$set(article, 'price_for_sale', article.original_price)
					this.$store.commit('vender/updateArticle', article)
				}
			})
		},
		callVender() {
			if (!this.is_provider) {
				this.vender()
			}
		},
		vender() {
			if (this.articles_for_sale.length) {
				this.$store.commit('articles/removeStock', this.articles_for_sale)
				this.$store.dispatch('vender/vender', this.dolar_blue)
				.then(() => {
					this.$store.commit('vender/setDiscounts', [])
					this.$store.commit('vender/setSaleType', 1)
					this.$store.commit('vender/setSpecialPriceId', 0)
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
					this.$store.commit('vender/setClient', null)
				})
			}
		},
		setArticleForSale(article) {
			// this.articles.slice(0,33).forEach(art => {
			// 	this.addArticleForSale(art)
			// })
			if (this.article.bar_code != '') {
				article = this.articles.find(article => {
					return article.bar_code == this.getBarCode(this.article.bar_code)
				})
			} 
			if (this.isRegister(article)) {
				this.addArticleForSale(article)
			}
		},
		addArticleForSale(article) {
			// this.$store.commit('vender/setArticleForSale', this.setOriginalPrice(article)) 
			// this.article_for_sale.amount = 1
			// this.addArticleToArticlesSale()
			this.$store.commit('vender/setArticleForSale', this.setOriginalPrice(article)) 
			if (this.is_provider) {
				document.getElementById('article-amount').focus()
			} else {
				if (!this.isRepeat()) {
					this.article_for_sale.amount = 1
					this.addArticleToArticlesSale()
				} 
			} 
        },
		addArticleToArticlesSale() {
			// if (this.hasVariants()) {
			// 	this.$bvModal.show('select-variant')
			// 	this.clearArticle()
			// } else {
			// 	if (this.is_provider && !this.isRepeat()) {
			// 		// this.article_for_sale.amount = this.article.amount
			// 		this.addArticleAndSetTotal()
			// 	} else if (!this.isRepeat()) {
			// 		this.addArticleAndSetTotal()
			// 	}
			// 	this.clearArticle()
			// }
			if (this.hasVariants()) {
				this.$bvModal.show('select-variant')
				this.clearArticle()
			} else {
				if (this.is_provider && !this.isRepeat()) {
					this.article_for_sale.amount = this.article.amount
					this.addArticleAndSetTotal()
				} else if (!this.isRepeat()) {
					this.addArticleAndSetTotal()
				}
				this.clearArticle()
			}
		},
		addArticleAndSetTotal() {
			this.$store.commit('vender/addArticle')
			this.$store.commit('vender/setTotal')
		},
		isRegister(article) {
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
		hasVariants() {
			return this.article_for_sale.variants && this.article_for_sale.variants.length
		},
		isRepeat() {
			let finded = this.articles_for_sale.find(art => {
				return art.id == this.article_for_sale.id
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
				this.$store.commit('vender/updateArticle', finded)
				this.$store.commit('vender/setTotal')
				this.clearArticle()
				return true
			}
		},
		clearArticle() {
			console.log('clearArticle')
			// document.getElementById('article-bar-code').value = ''
			// document.getElementById('article-amount').value = ''
			this.$store.commit('vender/setArticle')
			// document.getElementsByClassName('autocomplete-input')[0].value = ''
			// console.log(document.getElementsByClassName('autocomplete-input')[0])
			this.$store.commit('vender/setClearArticleName')
			document.getElementById('article-bar-code').focus()
		},
		setPreviusSaleArticles(articles) {
			articles.forEach(article => {
				article.amount = Number(article.pivot.amount)
				article.original_price = Number(article.pivot.price)
				article.price_for_sale = Number(article.pivot.price)
			})
			return articles
		},
		getSpecialPrice(article, special_price_id) {
			let special_price_ = article.original_price
			article.special_prices.forEach(special_price => {
				if (special_price.pivot.special_price_id == special_price_id) {
					special_price_ = Number(special_price.pivot.price)
				}
			})
			return special_price_
		},
		setOriginalPrice(article) {
			article.original_price = this.articlePrice(article, false, false)
			article.price_for_sale = this.articlePrice(article, false, false)
			return article
		},
		clearVender() {
			this.$store.commit('vender/setArticles', [])
			this.$store.commit('vender/setDebt', null)
			this.$store.commit('vender/setTotal', 0)
			this.$store.commit('vender/setWithCard', false)
			this.$store.commit('vender/previus_sales/setIndex', 0)
			this.$store.commit('vender/previus_sales/setPreviusSale', {})
		},
	}
}