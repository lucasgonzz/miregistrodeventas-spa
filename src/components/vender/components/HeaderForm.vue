<template>
<b-container fluid class="p-0">
	<b-row class="m-0">
		<b-col
		class="col-bar-code"
		cols="12"
		lg="4">
			<b-form-input
			v-intro-step="1"
			v-intro="'Ingresa el codigo del producto que quieras agregar a la venta'"
			id="article-bar-code"
			v-model="article.bar_code"
			autocomplete="off" 
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
		lg="3">
			<b-form-input
			v-if="isProvider(user)"
			type="number"
			min="1"
			id="article-amount"
			v-model="article.amount"
			@keydown.enter="addArticleFromAmount"
			placeholder="Cantidad"></b-form-input>
			<b-button-group
			v-else>
				<b-button 
				v-intro-step="4"
				v-intro="'Guarda la venta'"
				variant="primary"
				@click="vender"
				:class="articles_length > 0 ? '' : 'disabled'" >
					<i class="icon-check" v-show="!vendiendo"></i>
					<span v-show="vendiendo" class="spinner-border spinner-border-sm"></span>
					Vender
				</b-button>
				<b-button 
				v-intro-step="3"
				v-intro="'Selecciona un cliente para la venta (opcional)'"
				v-if="canUse('client', user) && hasPermissionTo('client', user)"
				variant="success"
				:class="articles_length > 0 ? '' : 'disabled'"
				v-b-modal="'clients'">
					<i class="icon-user"></i>
				</b-button>
			</b-button-group>
		</b-col>
	</b-row>
</b-container>
</template>
<script>
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'

export default {
	props: [
		'article', 
		'vendiendo',
		'articles_length',
		'user',
	],
	components: {
		Autocomplete
	},
	computed: {
		articles() {
			return this.$store.state.articles.articles
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
			return `${article.name}  |  ${this.price(article.price)}`
		},
		addArticle(article) {
			if (this.article.bar_code != '') {
				let article_finded = this.articles.find(
										article => article.bar_code == this.article.bar_code
									)
				if (typeof article_finded === 'undefined') {
					this.$bvModal.show('article-not-register')
					return
				} else {
					this.article.id = article_finded.id
				}
			} else {
				this.article.id = article.id
			}
			if (this.isProvider(this.user)) {
				document.getElementById('article-amount').focus()
			} else {
				this.$emit('addArticle')
				this.clearArticle()
			}
		},
		clearArticle() {
			this.$refs.articleName.setValue('')
			this.article.bar_code = ''
			this.article.name = ''
			this.article.amount = null
			console.log('se limpio article')
		},
		addArticleFromAmount() {
			this.$emit('addArticle')
			this.clearArticle()
		},
		vender() {
			if (!this.isProvider(this.user)) {
				this.$emit('vender')
			}
		},
	},
}
</script>
<style scoped lang="sass">

.col-12
	@media screen and (max-width: 992px)
		margin-bottom: 1em
		&:last-child
			margin-bottom: 0

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