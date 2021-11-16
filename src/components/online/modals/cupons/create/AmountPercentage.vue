<template>
	<div
	class="m-b-20">
		<b-form-group
		:disabled="amount_disabled"
		label="Cantidad en pesos del descuento">
			<b-form-input
			v-model="new_cupon.amount"
			placeholder="Ingresar cantidad"></b-form-input>
		</b-form-group>
		<b-form-group
		:disabled="percentage_disabled"
		label="Porcentaje del descuento">
			<b-form-input
			v-model="new_cupon.percentage"
			placeholder="Ingresar el porcentaje"></b-form-input>
		</b-form-group>
		<b-form-group
		label="Monto minimo para usar el cupon">
			<b-form-input
			v-model="new_cupon.min_amount"
			placeholder="Ingresar el monto minimo"></b-form-input>
		</b-form-group>
		<hr>
	</div>
</template>
<script>
import cupons from '@/mixins/cupons'
export default {
	mixins: [cupons],
	computed: {
		amount_disabled() {
			return this.new_cupon.percentage != ''
		},
		percentage_disabled() {
			return this.new_cupon.amount != ''
		},
	}
}
</script>