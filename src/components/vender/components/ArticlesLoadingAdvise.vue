<template>
	<b-alert
	:show="loading">
		Espere a que terminen de descargarse los articulos para el correcto funcionamiento de esta seccion.
		<b-progress 
		class="m-t-15 progress-vender"
		:value="100" 
		variant="success" 
		striped 
		animated></b-progress>
	</b-alert>
</template>
<script>
export default {
	computed: {
		loading() {
			return this.$store.state.article.loading
		},
	},
}
</script>
<style lang="sass">
.progress-vender
	max-width: 700px
	margin: auto
</style>