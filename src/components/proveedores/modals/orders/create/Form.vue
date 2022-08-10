<template>
	<b-form-row>
		<b-col
		class="j-start"
		cols="12">
			<p class="">
				Agregar artículos al pedido
			</p>
		</b-col>
		<b-col
		md="3">
			<select-component
			:id="id_bar_code"
			ref="bar_code"
			:model="article"
			:models="articles"
			prop_name="bar_code"
			placeholder="Codigo"
			:prop_title="['bar_code']"
			:props_to_show="['bar_code', 'price']"
			auto_select
			@select="setSelectedBarCode"
			@setSelected="setSelectedBarCode"></select-component>
		</b-col>
		<b-col
		md="3">
			<select-component
			:id="id_name"
			:model="article"
			:models="articles"
			prop_name="name"
			placeholder="Articulo"
			:prop_title="['name']"
			:props_to_show="['bar_code', 'price']"
			auto_select
			@select="setSelectedName"
			@setSelected="setSelectedName"></select-component>
		</b-col>
		<b-col
		md="3">
			<b-form-input
			ref="amount"
			@keydown.enter="toNotes"
			placeholder="Cantidad"
			v-model="article.amount"></b-form-input>
		</b-col>
		<b-col
		md="3">
			<b-form-input
			ref="notes"
			placeholder="Nota"
			@keydown.enter="add"
			v-model="article.notes"></b-form-input>
		</b-col>
	</b-form-row>
</template>
<script>
import SelectComponent from '@/components/common/select/Index'
export default {
	components: {
		SelectComponent,
	},
	computed: {
		articles() {
			return this.$store.state.articles.articles
		},
		bar_codes() {
			return this.$store.state.articles.bar_codes
		},
		id_bar_code() {
			return 'select-article-bar-code'
		},
		id_name() {
			return 'select-article-name'
		},
	},
	data() {
		return {
			article: {
				name: '',
				bar_code: '',
			}
		}
	},
	methods: {
		setSelectedBarCode(result) {
			if (result) {
				let article_to_add = {
					...result,
					from_provider_order: false,
				}
				this.article = article_to_add
				this.$refs.amount.focus()
			} else {
				this.article.from_provider_order = true
				document.getElementById(this.id_name).focus()
			}
		},
		selectEmptyBarCode(result) {
			if (result) {
				this.setSelectedBarCode(result)
			} else {
				this.article.from_provider_order = true
				document.getElementById(this.id_name).focus()
			}
		},
		setSelectedName(result) {
			if (result) {
				let article_to_add = {
					...result,
					from_provider_order: false,
				}
				this.article = article_to_add
				this.$refs.amount.focus()
			} else {
				this.article.from_provider_order = true
				this.$refs.amount.focus()
			}
		},
		selectEmptyName() {
			this.article.from_provider_order = true
			this.$refs.amount.focus()
		},
		toNotes() {
			this.$refs.notes.focus()
		},
		add() {
			console.log(this.article)
			this.article.received = 0
			this.$store.commit('providers/orders/create/addArticle', this.article)
			this.clear()
			document.getElementById(this.id_bar_code).focus()
		},
		clear() {
			this.article = {
				name: '',
				bar_code: '',
				amount: '',
				notes: '',
			}
		}
	}
}
</script>