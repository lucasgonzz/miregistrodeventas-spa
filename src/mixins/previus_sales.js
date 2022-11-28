import vender from '@/mixins/vender'
export default {
	mixins: [vender],
	computed: {
		updating() {
			return this.$store.state.vender.previus_sales.updating
		},
		client() {
			return this.$store.state.vender.client
		},
		discounts_id() {
			return this.$store.state.vender.discounts_id
		},
		surchages_id() {
			return this.$store.state.vender.surchages_id
		},
		items() {
			return this.$store.state.vender.items
		},
		save_nota_credito() {
			return this.$store.state.vender.save_nota_credito
		},
		nota_credito_description: {
			get() {
				return this.$store.state.vender.nota_credito_description
			},
			set(value) {
				this.$store.commit('vender/setNotaCreditoDescription', value)
			}
		},
		index_previus_sales() {
			return this.$store.state.vender.previus_sales.index
		},
		previus_sale() {
			return this.$store.state.vender.previus_sales.previus_sale
		},
	},
	methods: {
		callPreviusSale() {
			this.$store.dispatch('vender/previus_sales/previusSale')
			.then(() => {
				let items = this.getItemsPreviusSale(this.previus_sale)
				this.$store.commit('vender/setItems', items)
				if (this.previus_sale.discounts.length) {
					let discounts = this.previus_sale.discounts.map(discount => discount.id)
					this.$store.commit('vender/setDiscountsId', discounts)
				} else {
					this.$store.commit('vender/setDiscountsId', [])
				}
				if (this.previus_sale.surchages.length) {
					let surchages = this.previus_sale.surchages.map(discount => discount.id)
					this.$store.commit('vender/setSurchagesId', surchages)
				} else {
					this.$store.commit('vender/setSurchagesId', [])
				}
				if (this.previus_sale.client) {
					this.$store.commit('vender/setClient', this.previus_sale.client)
					this.$store.commit('vender/setPriceType', this.previus_sale.client.price_type)
				} else {
					console.log('se seteo con null')
					this.$store.commit('vender/setClient', null)
					this.$store.commit('vender/setPriceType', null)
				}
				this.checkWithCard()
				this.setItemsPrices(false, true)
				this.$store.commit('vender/setTotal')
			})
		},
		checkWithCard() {
			if (this.previus_sale.percentage_card) {
				this.$store.commit('vender/setWithCard', true)
			} else {
				this.$store.commit('vender/setWithCard', false)
			}
		},
		updatePreviusSale() {
			this.$store.dispatch('vender/previus_sales/updatePreviusSale', {
				client_id: this.client ? this.client.id : null, 
				discounts_id: this.discounts_id, 
				surchages_id: this.surchages_id, 
				items: this.items, 
				save_nota_credito: this.save_nota_credito,
				nota_credito_description: this.nota_credito_description,
			})
			.then(res => {
				this.$toast.success('Venta actualizada')
				this.cancelPreviusSale()
			})
		},
		cancelPreviusSale() {
			this.$store.commit('vender/previus_sales/setIndex', 0)
			this.$store.commit('vender/previus_sales/setPreviusSale', {})
			this.$store.commit('vender/setItems', [])
			this.$store.commit('vender/setDiscountsId', [])
			this.$store.commit('vender/setSurchagesId', [])
			this.$store.commit('vender/setClient', null)
			this.$store.commit('vender/setReturnedArticles', [])
			this.$store.commit('vender/setSaveNotaCredito', 0)
			this.$store.commit('vender/setNotaCreditoDescription', '')
			this.$store.commit('vender/setTotal')
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
				item.returned_amount = Number(article.pivot.returned_amount)
				item.delivered_amount = Number(article.pivot.delivered_amount)
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