<template>
<b-container fluid class="p-0">
	<b-row class="m-0">
		<b-col
		class="col-bar-code"
		cols="12"
		lg="4">
			<b-form-input
			id="article-bar-code"
			v-model="article.bar_code"
			autocomplete="off" 
			@keyup.enter="addArticleFromBarCode"
			placeholder="Ingrese el codigo de barras"></b-form-input>
		</b-col>
		<b-col
		cols="12"
		lg="5"
		class="col-autocomplete">
            <autocomplete 
            ref="articleName"
            :search="search" 
			:get-result-value="getResultValue"
            auto-select
            placeholder="Buscar un artículo"
            @submit="addArticleFromName"></autocomplete>
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
				variant="primary"
				@click="vender"
				:class="articles_length > 0 ? '' : 'disabled'" >
					<i class="icon-check" v-show="!vendiendo"></i>
					<span v-show="vendiendo" class="spinner-border spinner-border-sm"></span>
					Vender
				</b-button>
				<b-button 
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
	data() {
		return {
		}
	},
	computed: {
		articles() {
			return this.$store.state.articles.articles_names
		}
	},
	methods: {
        search(input) {
            if (input.length < 1) { return [] }
            return this.articles.filter(article => {
                return article.name.toLowerCase().startsWith(input.toLowerCase())
            })
        },
		getResultValue(article) {
			return article.name
		},
		addArticleFromName(article) {
			this.article.id = article.id
			if (this.isProvider(this.user)) {
				document.getElementById('article-amount').focus()
			} else {
				this.$emit('addArticle')
				this.$refs.articleName.setValue('')
			}
		},
		addArticleFromBarCode() {
			if (this.isProvider(this.user)) {
				document.getElementById('article-amount').focus()
			} else {
				this.$emit('addArticle')
			}
		},
		addArticleFromAmount() {
			this.$emit('addArticle')
		},
		vender() {
			this.$emit('vender')
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