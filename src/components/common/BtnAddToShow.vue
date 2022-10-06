<template>
	<b-button
	v-if="show"
	class="m-t-15"
	variant="primary"
	@click="add">
		<i class="icon-plus"></i>
		Ver mas
	</b-button>
</template>
<script>
export default {
	props: {
		model_name: String,
	},
	computed: {
		models() {
			return this.$store.state[this.model_name].models
		},
		to_show() {
			return this.$store.state[this.model_name].to_show
		},
		show() {
			return this.to_show.length < this.models.length
		},
	},
	methods: {
		add() {
			this.$store.commit(this.model_name+'/addToShow')
		}
	}
}
</script>