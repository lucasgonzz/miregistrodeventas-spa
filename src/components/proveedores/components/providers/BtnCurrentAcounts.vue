<template>
	<b-button
	class="m-l-15"
	@click="showCurrentAcounts(model)"
	variant="success">
		C/C
	</b-button>
</template>
<script>
export default {
	props: {
		model: Object,
	},
	methods: {
		showCurrentAcounts(model) {
			this.$store.commit('current_acount/setFromModelName', 'provider')
			this.$store.commit('current_acount/setFromModel', model)
			this.$store.dispatch('current_acount/getModels')
			this.$bvModal.show('current-acounts')
		},
	},
}
</script>