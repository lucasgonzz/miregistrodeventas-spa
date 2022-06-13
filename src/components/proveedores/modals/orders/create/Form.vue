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
			full_width
			select_empty
			auto_select
			id="select-bar-code-for-privider-order"
			@setSelected="setSelectedBarCode"
			placeholder="Codigo"
			:model="article"
			model_prop="bar_code"
			:models="articles"></select-component>
		</b-col>
		<b-col
		md="3">
			<select-component
			full_width
			select_empty
			auto_select
			id="select-article-for-privider-order"
			@setSelected="setSelectedName"
			placeholder="Articulo"
			:model="article"
			:models="articles"></select-component>
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
import SelectComponent from '@/components/common/SelectComponent'
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
	},
	data() {
		return {
			article: {
				name: '',
			}
		}
	},
	methods: {
		setSelectedBarCode(result) {
			console.log(result)
			let article
			if (result.is_empty) {
				article = {
					from_provider_order: true,
					bar_code: result.selected,
					name: '',
				}
			} else {
				article = {
					...result.selected,
					from_provider_order: false,
				}
				// article = result.selected
				// article.from_provider_order = false
			}
			this.article = article
			this.$refs.amount.focus()
		},
		setSelectedName(result) {
			console.log(result)
			let article
			if (result.is_empty) {
				article = {
					from_provider_order: true,
					name: result.selected,
					bar_code: ''
				}
			} else {
				article = {
					...result.selected,
					from_provider_order: false,
				}
				// article = result.selected
				// article.from_provider_order = false
			}
			this.article = article
			this.$refs.amount.focus()
		},
		toNotes() {
			this.$refs.notes.focus()
		},
		add() {
			console.log(this.article)
			this.article.received = 0
			this.$store.commit('providers/orders/create/addArticle', this.article)
			let input_name = document.getElementById('select-article-for-privider-order')
			let input_bar_code = document.getElementById('select-bar-code-for-privider-order')
			input_name.value = ''
			input_bar_code.value = ''
			input_bar_code.focus()
			setTimeout(() => {
				this.clear()
			}, 500)
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