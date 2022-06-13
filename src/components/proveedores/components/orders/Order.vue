<template>
	<div
	@click="edit"
	class="model card-moderna b-r-1 c-p apretable">
		<div
		class="title">
			<p>
				{{ order.provider.name }}
			</p>
		</div>
		<div class="data">
			<p>
				N° {{ order.num }}
			</p>
			<p class="sice"> 
				{{ date(order.created_at) }}
			</p>
		</div>
	</div>
</template>
<script>
import provider_orders from '@/mixins/provider_orders'
export default {
	mixins: [provider_orders],
	props: ['order'],
	methods: {
		edit() {
			this.$store.commit('providers/orders/create/setOrder', this.order)
			this.$store.commit('providers/orders/create/setProvider', this.order.provider)
			this.$store.commit('providers/orders/create/setArticles', this.order.articles)
			this.$bvModal.show('provider-order')
			// setTimeout(() => {
			// 	this.$bvModal.show('budget-details')
			// }, 100)
		}
	}
}
</script>