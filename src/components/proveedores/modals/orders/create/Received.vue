<template>
<b-modal
id="provider-order-article-received"
title="Unidades recibidas"
hide-footer>
	<b-form-group
	:label="'Unidades recibidas de '+article.name">
		<b-form-input
		type="number"
		:min="1"
		:max="article.amount"
		placeholder="¿Cuantas unidades se recibieron?"
		v-model="article.received"
		@keyup.enter="save"></b-form-input>
	</b-form-group>
	<b-button
	block
	variant="primary"
	@click="save">
		<btn-loader
		text="Guardar"
		:loader="saving"></btn-loader>
	</b-button>
</b-modal>
</template>
<script>
import provider_orders from '@/mixins/provider_orders'
import edit_articles from '@/mixins/edit_articles'

import BtnLoader from '@/components/common/BtnLoader'
export default {
	mixins: [provider_orders, edit_articles],
	components: {
		BtnLoader,
	},
	computed: {
		article() {
			return this.$store.state.providers.orders.create.article_received
		},
	},
	data() {
		return { 
			received: '',
			saving: false,
		}
	},
	methods: {
		save() {
			this.saving = true 
			this.$api.post('provider-orders/received', {
				provider_order_id: this.edit_order.id,
				article: this.article,
			})
			.then(res => {
				this.saving = false
				this.$toast.success('Recibo de mercaderia guardado')
				let article = res.data.article
				if (article.status == 'from_provider_order') {
					article.provider_id = this.edit_order.provider_id
					article.stock = this.article.received
					this.$store.commit('articles/addArticle', article)
					this.editArticle(article)
					this.$bvModal.show('edit-article')
					this.$store.commit('articles/setArticlesToShow')
				} else {
					this.$store.commit('articles/update', article)
				}
				this.$bvModal.hide('provider-order-article-received')
			})
			.catch(err => {
				console.log(err)
				this.saving = false
				this.$toast.error('Error al guardar recibo de mercaderia')
			})
		}
	}
}
</script>