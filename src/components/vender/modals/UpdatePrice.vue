<template>
<b-modal
title="Actualizar precio"
id="update-price"
hide-footer>
	<b-form-group
	label="Nuevo precio">
		<b-form-input
		v-model="article.price"></b-form-input>
	</b-form-group>
	<b-form-group v-slot="{ ariaDescribedby }">
		<b-form-radio 
		v-model="only_this_sale" 
		name="only-this-sale" 
		:value="true">		
			Solo en esta venta
		</b-form-radio>
		<b-form-radio 
		v-model="only_this_sale"
		name="only-this-sale" 
		:value="false">
			En todo el sistema
		</b-form-radio>
	</b-form-group>
	<b-button
	variant="primary"
	block
	@click="update">
		<btn-loader
		:loader="loading"
		text="Actualizar"></btn-loader>
	</b-button>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
import vender from '@/mixins/vender'
export default {
	mixins: [vender],
	components: {
		BtnLoader,
	},
	data() {
		return {
			loading: false,
			only_this_sale: true,
		}
	},
	computed: {
		article() {
			return this.$store.state.vender.update_price
		}
	},
	methods: {
		update() {
			if (!this.only_this_sale) {
				this.loading = true
				this.$api.put('articles/price', this.article)
				.then(res => {
					this.loading = false
					this.$toast.success('Precio actualizado')
					this.$store.commit('articles/update', res.data.article)
					this.updateInSale()
					this.$bvModal.hide('update-price')
				})
				.catch(err => {
					console.log(err)
					this.$toast.error('Error al actualizar articulo')
					this.loading = false
				})
			} else {
				this.updateInSale()
			}
		},
		updateInSale() {
			this.$store.commit('vender/removeArticleFromSale', this.article)
			this.article.original_price = parseFloat(this.article.price)
			this.article.price_for_sale = parseFloat(this.article.price)
			this.$store.commit('vender/setArticleForSale', this.article) 
            this.article_for_sale.amount = this.article.amount
            this.addArticleAndSetTotal()
			this.$bvModal.hide('update-price')
		}
	}
}
</script>