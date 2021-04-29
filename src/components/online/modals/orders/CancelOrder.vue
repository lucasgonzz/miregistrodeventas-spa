<template>
<b-modal id="cancel-order" title="Cancelar pedido" hide-footer>
	<p
	class="m-0">Selecciona los articulos faltantes</p>
	<div class="cont-cards m-b-15">
		<b-card
		@click="selectArticle(article)"
		class="card-article-variant border-radius c-p"
		:class="isSelectedArticle(article) ? 'shadow-4' : 'shadow-3'"
		v-for="article in order.articles"
		:key="article.key"
		:img-src="imgUrl(article)">
			<p class="m-0">
				{{ articleName(article) }}
			</p>
		</b-card>
	</div>
	<b-form-group
	v-show="!articulos_faltantes.length"
	label="O escribi la razon de cancelar el pedido">
		<b-form-textarea
		placeholder="Ingresa la razon por la cual no podes cumplir con el pedido"
		v-model="order.description"></b-form-textarea>
	</b-form-group>
	<b-form-group>
		<b-button
		@click="cancel"
		block
		variant="danger">
			<btn-loader
			text="Cancelar Pedido"
			:loader="loading">
			</btn-loader>
		</b-button>
	</b-form-group>
</b-modal>
</template>
<script>
import Mixin from '@/mixins/online'
import BtnLoader from '@/components/common/BtnLoader'
export default {
	components: {
		BtnLoader
	},
	mixins: [Mixin],
	data() {
		return {
			articulos_faltantes: [],
			loading: false,
		}
	},
	computed: {
		order() {
			return this.$store.state.online.orders.unconfirmed_order_details
		}
	},
	methods: {
		imgUrl(article) {
			if (article.variants.length) {
				return this.imageCropedUrlfromImage(this.getVariant(article))
			} else {
				return this.articleImageUrl(article)
			}
		},
		selectArticle(article) {
			if (!this.isSelectedArticle(article)) {
				this.articulos_faltantes.push(article)
			} else {
				let index = this.articulos_faltantes.findIndex(art => {
					return art.key == article.key
				})
				this.articulos_faltantes.splice(index, 1)
			}
			console.log(this.articulos_faltantes)
		},
		isSelectedArticle(article) {
			let index = this.articulos_faltantes.findIndex(art => {
				return art.key == article.key
			})
			if (index != -1) {
				return true
			}
			return false
		},
		cancel() {
			if (this.check()) {
				this.loading = true
				this.$api.put(`/orders/cancel`, {
					order: this.order,
					articulos_faltantes: this.articulos_faltantes
				})
				.then(() => {
					this.loading = false
					this.$toast.success('Pedido cancelado')
					this.clear()
					this.getOrders()
					this.$bvModal.hide('cancel-order')
					this.$bvModal.hide('unconfirmed-order-details')
				})
				.catch(err => {
					this.$toast.error('Error al cancelar pedido')
					this.loading = false
					console.log(err)
				})
			}
		},
		check() {
			if (!this.articulos_faltantes.length && this.order.description == '') {
				this.$toast.error('Seleccione los articulos que faltan o ingrese una razon para cancelar el pedido')
				return false
			}
			return true
		},
		clear() {
			this.articulos_faltantes = []
		}
	}
}
</script>
<style scoped lang="sass">
.img-cont
	display: flex
	img 
		width: 300px
</style>