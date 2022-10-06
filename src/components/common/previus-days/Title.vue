<template>
<h5>
	<strong
	v-if="from_date == today">
		{{ model_name_spanish }} de hoy
	</strong>
	<strong
	v-else-if="until_date == ''">
		{{ model_name_spanish }} del {{ date(from_date) }}
	</strong>
	<strong
	v-else>
		Del {{ date(from_date) }} a {{ date(until_date) }}
	</strong>
</h5>
</template>
<script>
export default {
    props: {
    	model_name: String,
    	model_name_spanish: String,
    },
	computed: {
		from_date() {
			return this.$store.state[this.model_name].from_date
		},
		until_date() {
			return this.$store.state[this.model_name].until_date
		},
	},
}
</script>
<style scoped lang="sass">
h5
	margin-bottom: 0
	@media screen and(max-width: 768px)
		text-align: center
	@media screen and(min-width: 768px)
		text-align: left
</style>