<template>
	<b-button
	@click="update"
	variant="primary">
		<i class="icon-undo"></i>
		Actualizar lista
	</b-button>
</template>
<script>
export default {
	methods: {
		update() {
			this.$store.dispatch('article/getInactiveModels')
		}
	}
}
</script>