<template>
	<div>
		<p class="sub-title">
			Agregar productos
		</p>
		<b-form-row>
			<b-col
			md="2">
				<select-component
				full_width
				select_empty
				auto_select
				:id="id_bar_code"
				@setSelected="setSelectedBarCode"
				placeholder="Codigo"
				:model="product"
				model_prop="bar_code"
				:models="articles"></select-component>
			</b-col>
			<b-col
			md="2">
				<b-form-input
				ref="amount"
				@keydown.enter="toName"
				v-model="product.amount"
				type="number"
				placeholder="Cantidad"></b-form-input>
			</b-col>
			<b-col
			md="4">
				<select-component
				full_width
				select_empty
				auto_select
				:id="id_name"
				@setSelected="setSelectedName"
				placeholder="Articulo"
				:model="product"
				:models="articles"></select-component>
			</b-col>
			<b-col
			md="2">
				<b-form-input
				ref="price"
				@keydown.enter="toBonus"
				v-model="product.price"
				type="number"
				placeholder="Precio"></b-form-input>
			</b-col>
			<b-col
			md="2">
				<b-form-input
				ref="bonus"
				@keydown.enter="add"
				v-model="product.bonus"
				placeholder="Bonificacion"></b-form-input>
			</b-col>
		</b-form-row>
	</div>
</template>
<script>
import budgets from '@/mixins/budgets'

import SelectComponent from '@/components/common/SelectComponent'
export default {
	mixins: [budgets],
	components: {
		SelectComponent,
	},
	computed: {
		id_bar_code() {
			return 'select-bar-code-for-budget'
		},
		id_name() {
			return 'select-article-for-budget'
		},
		articles() {
			return this.$store.state.articles.articles
		},
	},
	data() {
		return {
			product: {
				bar_code: '',
				amount: '',
				name: '',
				price: '',
				bonus: '',
			}
		}
	},
	methods: {
		setSelectedBarCode(result) {
			console.log(result)
			let product
			if (result.is_empty) {
				product = {
					bar_code: result.selected,
					name: '',
				}
			} else {
				product = {
					...result.selected,
					bonus: '',
				}
			}
			this.product = product
			this.$refs.amount.focus()
		},
		setSelectedName(result) {
			console.log(result)
			let product
			if (result.is_empty) {
				product = {
					name: result.selected,
					bar_code: '',
				}
			} else {
				product = {
					...result.selected,
					bonus: '',
				}
			}
			this.product = product
			this.$refs.amount.focus()
		},
		add() {
			this.budget_model.products.push(this.product)
			document.getElementById(this.id_bar_code).focus()
			setTimeout(() => {
				this.clear()
			}, 500)
		},
		clear() {
			this.product = {
				bar_code: '',
				amount: '',
				name: '',
				price: '',
				bonus: '',
			}
			console.log('se limpio')
		},
		toAmount() {
			this.$refs['amount'].focus()
		},
		toName() {
			console.log('acaa')
			if (this.product.name == '') {
				document.getElementById('select-article-for-budget').focus()
			} else {
				this.toPrice()
			}
		},
		toPrice() {
			this.$refs['price'].focus()
		},
		toBonus() {
			this.$refs['bonus'].focus()
		},
	}
}
</script>