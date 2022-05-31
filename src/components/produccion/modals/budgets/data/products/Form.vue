<template>
	<div>
		<p class="sub-title">
			Agregar productos
		</p>
		<b-form-row>
			<b-col
			md="2">
				<b-form-input
				ref="code"
				@keyup.enter="toAmount"
				v-model="product.code"
				placeholder="Codigo"></b-form-input>
			</b-col>
			<b-col
			md="2">
				<b-form-input
				ref="amount"
				@keyup.enter="toName"
				v-model="product.amount"
				type="number"
				placeholder="Cantidad"></b-form-input>
			</b-col>
			<b-col
			md="4">
				<b-form-input
				ref="name"
				@keyup.enter="toPrice"
				v-model="product.name"
				placeholder="Nombre"></b-form-input>
			</b-col>
			<b-col
			md="2">
				<b-form-input
				ref="price"
				@keyup.enter="toBonus"
				v-model="product.price"
				type="number"
				placeholder="Precio"></b-form-input>
			</b-col>
			<b-col
			md="2">
				<b-form-input
				ref="bonus"
				@keyup.enter="add"
				v-model="product.bonus"
				placeholder="Bonificacion"></b-form-input>
			</b-col>
		</b-form-row>
	</div>
</template>
<script>
import budgets from '@/mixins/budgets'
export default {
	mixins: [budgets],
	data() {
		return {
			product: {
				code: '',
				amount: '',
				name: '',
				price: '',
				bonus: '',
			}
		}
	},
	methods: {
		add() {
			this.budget_model.products.push(this.product)
			// this.$store.commit('produccion/budgets/create/addProduct', this.product)
			this.clear()
			this.$refs['code'].focus()
		},
		clear() {
			this.product = {
				code: '',
				amount: '',
				name: '',
				price: '',
				bonus: '',
			}
		},
		toAmount() {
			this.$refs['amount'].focus()
		},
		toName() {
			this.$refs['name'].focus()
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