<template>
	<div class="j-between m-b-15">
		<select-component
		@setSelected="setSelected"
		placeholder="Buscar pedidos de un proveedor"
		:models="orders"></select-component>
		<!-- <b-button
		b-v-modal="'create-provider'"
		variant="primary">
			<i class="icon-plus"></i>
			Nuevo proveedor
		</b-button> -->
	</div>
</template>
<script>
import SelectComponent from '@/components/common/SelectComponent'
export default {
	components: {
		SelectComponent,
	},
	computed: {
		orders() {
			return this.$store.state.providers.orders.models
		},
	},
	methods: {
		setSelected(result) {
			if (result.is_list) {
				this.$store.commit('providers/setToShow', result.selected)
			} else {
				let orders = this.orders.filter(order => {
					return order.provider_id == result.selected.id
				})
				this.$store.commit('providers/orders/setToShow', orders)
			}
		}
	}
}
</script>