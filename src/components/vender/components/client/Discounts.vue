<template>
	<div
	class="m-b-15"
	v-if="client_discounts.length || common_discounts.length">
		<p
		class="title">
			Seleccionar descuentos
		</p>
		<b-form-group
		v-if="client_discounts.length"
		:label="'Descuentos del cliente '+client.name">
			<b-form-checkbox
			v-for="discount in client_discounts"
			:key="discount.id"
			:value="discount.id"
			v-model="sale_discounts">
				{{ discount.name }} {{ discount.percentage }}%
			</b-form-checkbox>
		</b-form-group>
		<b-form-group
		v-if="common_discounts.length"
		label="Descuentos comunes">
			<b-form-checkbox
			v-for="discount in common_discounts"
			:key="discount.id"
			:value="discount.id"
			v-model="sale_discounts">
				{{ discount.name }} {{ discount.percentage }}%
			</b-form-checkbox>
		</b-form-group>
	</div>
</template>
<script>
import vender from '@/mixins/vender'
export default {
	mixins: [vender],
	computed: {
		discounts() {
			return this.$store.state.discount.models
		},
		client_discounts() {
			return this.discounts.filter(discount => {
				return this.client && (discount.client_id == this.client.id)
			})
		},
		common_discounts() {
			return this.discounts.filter(discount => {
				return !discount.client_id
			})
		},
		sale_discounts: {
			get() {
				return this.$store.state.vender.discounts
			},
			set(value) {
				this.$store.commit('vender/setDiscounts', value)
			}
		}
	}
}
</script>