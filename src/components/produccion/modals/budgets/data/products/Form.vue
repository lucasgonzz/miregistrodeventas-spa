<template>
	<div>
		<p class="sub-title">
			Agregar productos
		</p>
		<b-form-row>
			<b-col
			md="2">
				<select-component
				:id="id_bar_code"
				:model="product"
				:models="articles"
				prop_name="bar_code"
				placeholder="Codigo"
				:prop_title="['name']"
				:props_to_show="['bar_code', 'price']"
				auto_select
				@setSelected="setSelectedBarCode"></select-component>
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
			md="3">
				<select-component
				:id="id_name"
				:model="product"
				:models="articles"
				placeholder="Nombre"
				:props_to_show="['bar_code', 'price']"
				auto_select
				@setSelected="setSelectedName"></select-component>
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
			md="1">
				<b-form-input
				ref="bonus"
				@keydown.enter="toLocation"
				v-model="product.bonus"
				placeholder="Bonificacion"></b-form-input>
			</b-col>
			<b-col
			md="2">
				<b-form-input
				ref="location"
				@keydown.enter="add"
				v-model="product.location"
				placeholder="Ubicacion"></b-form-input>
			</b-col>
		</b-form-row>
	</div>
</template>
<script>
import budgets from '@/mixins/budgets'

import SelectComponent from '@/components/common/select/Index'
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
				location: '',
			},
		}
	},
	methods: {
		setSelectedBarCode(result) {
			if (result) {
				let product = {
					...result,
					bonus: '',
					location: '',
				}
				this.product = product
			}
			this.$refs.amount.focus()
		},
		setSelectedName(result) {
			if (result) {
				let product = {
					...result,
					bonus: '',
					location: '',
				}
				this.product = product
			}
			console.log(this.product.amount)
			if (!this.product.amount || this.product.amount == '') {
				this.$refs.amount.focus()
			} else {
				this.$refs.price.focus()
			}
		},
		add() {
			this.$store.commit('produccion/budgets/create/addProduct', this.product)
			// this.budget_model.products.push(this.product)
			this.clear()
			document.getElementById(this.id_bar_code).focus()
		},
		clear() {
			this.product = {
				bar_code: '',
				amount: '',
				name: '',
				price: '',
				bonus: '',
				location: '',
			}
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
		toLocation() {
			this.$refs['location'].focus()
		},
	}
}
</script>