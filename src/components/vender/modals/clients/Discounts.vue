<template>
	<b-card no-body>
		<p>Seleccionar tipo de venta</p>
		<b-form-group
		v-for="sale_type in sale_types"
		:key="'sale-type-'+sale_type.id">
			<b-form-radio
			:value="sale_type.id"
			v-model="sale_sale_type">
				{{ sale_type.name }}
			</b-form-radio>
		</b-form-group>
		<p>Seleccionar descuentos</p>
		<b-form-group
		v-for="discount in discounts"
		:key="discount.id">
			<b-form-checkbox
			:value="discount.id"
			v-model="sale_discounts">
				{{ discount.name }} {{ discount.percentage }}%
			</b-form-checkbox>
		</b-form-group>
		<div
		class="j-between">
			<b-button
			variant="primary"
			class="w-49"
			@click="toClient">
				Atras
			</b-button>
			<b-button
			variant="primary"
			class="w-49"
			@click="vender">
				<btn-loader
				text="Vender"
				:loader="vendiendo"></btn-loader>
			</b-button>
		</div>
	</b-card>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	name: 'Discounts',
	components: {
		BtnLoader
	},
	computed: {
		vendiendo() {
			return this.$store.state.vender.vendiendo
		},
		discounts() {
			return this.$store.state.discounts.discounts
		},
		sale_types() {
			return this.$store.state.sale_types.sale_types
		},
		sale_discounts: {
			set(value) {
				this.$store.commit('vender/setDiscounts', value)
			},
			get() {
				return this.$store.state.vender.discounts
			}
		},
		sale_sale_type: {
			set(value) {
				this.$store.commit('vender/setSaleType', value)
			},
			get() {
				return this.$store.state.vender.sale_type
			}
		},
	},
	methods: {
		toClient() {
			this.$store.commit('vender/clients/decrementView')
		},
        vender() {
            this.$store.dispatch('vender/vender')
            .then(() => {
	            this.$store.commit('vender/setClient', null)
	            this.$store.commit('vender/setDiscounts', [])
	            this.$store.commit('vender/setSaleType', 1)
	            this.$bvModal.hide('clients')
	            if (this.isProvider()) {
	                this.$bvModal.show('successful-sale')
	            }
	            this.without_debt = true
	            this.$store.commit('vender/clients/setView', 0)
            })
        },
	}
}
</script>