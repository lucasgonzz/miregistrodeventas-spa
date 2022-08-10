<template>
	<div 
	class="j-start m-t-20">
		<b-button
		variant="primary"
		block
		@click="addModel">
			<i class="icon-plus"></i>
			Nuevo Metodo de Pago
		</b-button>
	</div>
</template>
<script>
export default {
	methods: {
		addModel() {
			this.$store.commit('payment_methods/setModel', null)
			this.$bvModal.show('payment_method')
		},
	}
}
</script>