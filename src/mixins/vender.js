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
		}
	},
	methods: {
		callVender() {
			if (!this.is_provider) {
				this.vender()
			}
		},
		vender() {
			if (this.articles_for_sale.length || this.combos.length) {
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
					this.clearVender()
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
			// this.$store.commit('vender/setArticleForSale', this.setOriginalPrice(article)) 
			this.$store.commit('vender/setArticleForSale', article) 
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
			if (this.is_provider && !this.isRepeat()) {
				this.article_for_sale.amount = this.article.amount
				this.addArticleAndSetTotal()
			} else if (!this.isRepeat()) {
				this.addArticleAndSetTotal()
			}
			this.clearArticle()
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
			this.$store.commit('vender/setArticle')
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
		clearVender() {
			this.$store.commit('vender/setArticles', [])
			this.$store.commit('vender/setCombos', [])
			this.$store.commit('vender/setItems', [])
			this.$store.commit('vender/setTotal', 0)
			this.$store.commit('vender/setWithCard', false)
			this.$store.commit('vender/previus_sales/setIndex', 0)
			this.$store.commit('vender/previus_sales/setPreviusSale', {})
		},
	}
}