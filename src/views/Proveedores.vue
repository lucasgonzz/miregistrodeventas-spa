<template>
<div id="proveedores">
	<!-- <order></order> -->

	<nav-component></nav-component>

	<providers></providers>

	<orders></orders>
</div>
</template>
<script>
import NavComponent from '@/components/proveedores/components/Nav'
import Providers from '@/components/proveedores/components/providers/Index'
import Orders from '@/components/proveedores/components/orders/Index'
export default {
	components: {
		NavComponent,
		Providers,
		Orders,
	},
	computed: {
		model_name() {
			return 'provider_order'
		},
		model_name_spanish() {
			return 'pedido'
		},
		model() {
			return this.$store.state[this.model_name].model
		},
		delete() {
			return this.$store.state[this.model_name].delete
		},
		text_delete() {
			if (this.delete) {
				return 'el pedido N° '+this.delete.num
			}
			return ''
		},
		properties() {
			return require(`@/models/${this.model_name}`).default.properties 
		}
	}
}
</script>
<style scoped lang="sass">
</style>