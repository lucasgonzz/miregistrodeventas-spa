<template>
<b-modal
title="Suscripciones activas"
id="plan-subscriptions"
hide-footer>
	<b-table
	v-if="!loading"
	responsive
	head-variant="dark" 
	striped
	:fields="fields"
	:items="items">
	</b-table>
	<b-skeleton-table
	v-else
	:hide-header="false"
	:rows="10"
	:columns="4"
	:table-props="{ bordered: true, striped: true }"
	></b-skeleton-table>
</b-modal>
</template>
<script>
export default {
	computed: {
		loading() {
			return this.$store.state.super.loading_subscriptions_from_plan
		},
		subscriptions() {
			return this.$store.state.super.subscriptions_from_plan
		},
		fields() {
			return [
				{ key: 'date_created', label: 'Alta' },
				{ key: 'payment_method_id', label: 'Metodo' },
				{ key: 'payer_first_name', label: 'Nombre' },
				{ key: 'status', label: 'Estado' },
			]
		},
		items() {
			let items = []
			this.subscriptions.forEach(item => {
				items.push({
					date_created: this.date(item.date_created),
					payment_method_id: item.payment_method_id,
					payer_first_name: item.payer_first_name,
					status: item.status,
				})
			})
			return items
		}
	}
}
</script>