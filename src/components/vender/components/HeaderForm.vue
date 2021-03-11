<template>
<b-row>
	<b-col
	class="col-bar-code"
	cols="12"
	lg="5">
		<b-form-input
		v-intro-step="1"
		v-intro="'Ingresa el codigo del producto que quieras agregar a la venta'"
		id="article-bar-code"
		v-model="article.bar_code"
		autocomplete="off" 
		ref="articleBarCode"
		@keydown.shift="vender"
		@keydown.enter="addArticle"
		placeholder="Ingrese el codigo de barras"></b-form-input>
	</b-col>
	<b-col
	cols="12"
	lg="5"
	class="col-autocomplete">
        <autocomplete 
		v-intro-step="2"
		v-intro="'Busca el producto que quieras agregar a la venta'"
        ref="articleName"
        :search="search" 
        @keydown.shift="vender"
		:get-result-value="getResultValue"
        auto-select
        placeholder="Buscar un artículo"
        @submit="addArticle"></autocomplete>
	</b-col>
	<b-col
	class="col-buttons"
	cols="12"
	lg="2">
		<b-form-input
		v-if="isProvider()"
		type="number"
		min="1"
		id="article-amount"
		v-model="article.amount"
		@keydown.enter="addNewArticle"
		placeholder="Cantidad"></b-form-input>
		<b-button-group
		v-if="!isProvider() && index_previus_sale == 0">
			<b-button 
			v-intro-step="4"
			v-intro="'Guarda la venta'"
			variant="primary"
			@click="vender">
				<i class="icon-check" v-show="!vendiendo"></i>
				<span v-show="vendiendo" class="spinner-border spinner-border-sm"></span>
				Vender
			</b-button>
			<b-button 
			v-intro-step="3"
			v-intro="'Selecciona un cliente para la venta (opcional)'"
			v-if="can('client.index')"
			variant="success"
			v-b-modal="'clients'">
				<i class="icon-user"></i>
			</b-button>
		</b-button-group>
		<b-button 
		v-if="!isProvider() && index_previus_sale > 0"
		variant="primary"
		@click="updatePreviusSale">
			<btn-loader :loader="updating_previus_sale" text="Actualizar"></btn-loader>
		</b-button>
	</b-col>
</b-row>
</template>
<script>
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'

import Vender from '@/mixins/vender'
import BtnLoader from '@/components/common/BtnLoader'
export default {
	components: {
		Autocomplete,
		BtnLoader,
	},
	mixins: [Vender],
	computed: {
		articles() {
			return this.$store.state.articles.articles
		},
		articles_for_sale() {
			return this.$store.state.vender.articles
		},
		vendiendo() {
			return this.$store.state.vender.vendiendo
		},
		index_previus_sale() {
			return this.$store.state.vender.previus_sales.index
		},
		updating_previus_sale() {
			return this.$store.state.vender.previus_sales.updating
		},
	},
	data() {
		return  {
			new_article: {},
			article: {
				bar_code: '',
				amount: null,
			},
		}
	},
	methods: {
        search(input) {
            if (input.length < 3) { return [] }
            return this.articles.filter(article => {
                return article.name.toLowerCase().includes(input.toLowerCase())
            })
        },
		getResultValue(article) {
			return `${article.name} | ${this.price(article.price)}`
		},
		addArticle(article) {
			if (this.article.bar_code != '') {
				article = this.articles.find(article => {
					return article.bar_code == this.article.bar_code
				})
			} 
			if (this.isRegister(article)) {
				this.new_article = this.setOriginalPrice(article)
			}
			if (this.isProvider()) {
				document.getElementById('article-amount').focus()
			} else {
				if (!this.isRepeat()) {
					this.new_article.amount = 1
					this.addNewArticle()
				} 
			}
		},
		addNewArticle() {
			console.log(this.new_article)
			if (this.isProvider()) {
				if (!this.isRepeat()) {
					this.new_article.amount = this.article.amount
					this.$store.commit('vender/addArticle', this.new_article)
					this.$store.commit('vender/setTotal')
					this.clearArticle()
				}
			} else {
				this.$store.commit('vender/addArticle', this.new_article)
				this.$store.commit('vender/setTotal')
				this.clearArticle()
			}
		},
		clearArticle() {
			document.getElementById('article-bar-code').focus()
			this.$refs.articleName.setValue('')
			this.article.bar_code = ''
			this.article.name = ''
			this.article.amount = ''
			// this.new_article.amount = ''
		},
		vender() {
			if (!this.isProvider() && this.articles_for_sale.length) {
				this.$store.commit('articles/removeStock', this.articles_for_sale)
				this.$store.dispatch('vender/vender')
				.then(() => {
					this.$refs.articleBarCode.focus()
				})
			}
		},
		isRepeat() {
			let finded = this.articles_for_sale.find(art => {
				return art.id == this.new_article.id
			})
			if (typeof finded == 'undefined') {
				return false
			} else {
				finded.amount = Number(finded.amount)
				if (this.isProvider()) {
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
		updatePreviusSale() {
			this.$store.dispatch('vender/previus_sales/updatePreviusSale', this.articles_for_sale)
			.then(res => {
				this.$toast.success('Venta actualizada')
			})
		},
		isRegister(article) {
			if (typeof article === 'undefined') {
				this.$bvModal.show('article-not-register')
				return false
			}
			return true
		}
	},
}
</script>
<style scoped lang="sass">
.col-12
	// &:first-child
	// 	padding-left: 0
	// &:last-child
	// 	padding-right: 0

.col-bar-code 
	display: flex
	align-items: center
.col-buttons 
	display: flex
	align-items: center
	justify-content: flex-end

.col-btn .btn-primary 
	display: inline-block
	width: auto

.col-btn .btn-success 
	display: inline-block
	width: auto

</style>