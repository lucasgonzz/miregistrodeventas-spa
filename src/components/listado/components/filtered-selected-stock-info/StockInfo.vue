<template>
	<b-list-group 
	class="colors"
	horizontal>
		<b-list-group-item
		class="p-10 c-p apretable border-danger"
		v-if="stock_0.length"
		@click="stock0">
			<strong
			class="text-danger">
				Sin stock {{ stock_0.length }}
			</strong>
		</b-list-group-item>
		<b-list-group-item
		class="p-10 c-p apretable border-success"
		v-if="stock_min.length"
		@click="stockMin">
			<strong
			class="text-success">
				Stock minimo {{ stock_min.length }}
			</strong>
		</b-list-group-item>
	</b-list-group>
</template>
<script>
import articles_stock from '@/mixins/articles_stock'
export default {
	mixins: [articles_stock],
	methods: {
		stock0() {
			this.$bvModal.show('stock-0')
		},
		stockMin() {
			this.$bvModal.show('stock-min')
		},
	}
}
</script>