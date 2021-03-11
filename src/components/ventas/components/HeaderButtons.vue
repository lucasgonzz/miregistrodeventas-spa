<template>
	<div class="j-md-end j-lg-end j-center">
		<button 
		v-intro-step="2"
		v-intro="'Busca las ventas de un dia en especifico'"
		class="btn btn-primary m-l-5 btn-sm-only-sm" 
		v-b-modal="'from-date'">
			<i class="icon-calendar"></i>
			Por fecha
		</button>
	</div>
</template>
<script>
export default {
	methods: {
		today() {
			this.$emit('today')
		},
	},
}
</script>