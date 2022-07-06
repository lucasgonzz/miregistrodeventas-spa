<template>
	<b-button
	@click="create"
	block
	variant="primary">
		<i class="icon-plus"></i>
		Nueva localidad
	</b-button>
</template>
<script>
export default {
	methods: {
		create() {
			this.$store.commit('locations/setModel')
			this.$bvModal.show('location')
		}
	}
}
</script>