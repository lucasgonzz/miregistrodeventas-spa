<template>
	<b-col 
	class="j-start"
	cols="12"
	md="6">
		<b-button-group class="btn-group-totales">
			<b-button
			variant="success">
				<span v-show="loading">
					<span class="spinner-border spinner-border-sm"></span>
					Calculando...
				</span>
				<span v-show="!loading">
					Total: {{ price(total) }}
				</span>
			</b-button>
			<b-button
			v-if="total_cost != 0 && can('articles.cost') && !without_cost"
			variant="danger">
				<span v-show="loading">
					<span class="spinner-border spinner-border-sm"></span>
					Calculando...
				</span>
				<span v-show="!loading">
					Total costos: {{ price(total_cost) }}
				</span>
			</b-button>
		</b-button-group>
		<div
		v-if="show"
		class="p-l-15">
			<b-form-checkbox
			v-if="discounts.length"
			:value="true"
			:unchecked-value="false"
			v-model="total_with_discounts">
				Con descuentos
			</b-form-checkbox>
			<b-form-checkbox
			v-if="commissioners.length"
			:value="true"
			:unchecked-value="false"
			v-model="total_with_commissions">
				Con comisiones
			</b-form-checkbox>
		</div>
	</b-col>
	
</template>
<script>
import sales from '@/mixins/sales'
export default {
	mixins: [sales],
	computed: {
		loading() {
			return this.$store.state.sales.loading
		},
		discounts() {
			return this.$store.state.discounts.discounts
		},
		commissioners() {
			return this.$store.state.commissioners.commissioners
		},
		show() {
			return this.discounts.length || this.commissioners.length
		}
	}
}
</script>