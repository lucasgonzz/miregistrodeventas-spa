<template>
	<b-form-group>
		<b-form-input
		v-model="query"
		placeholder="Buscar un cliente"
		@keyup="search"></b-form-input>
	</b-form-group>
</template>
<script>
export default {
	data() {
		return {
			query: '',
		}
	},
	computed: {
		buyers() {
			return this.$store.state.online.buyers.buyers
		}
	},
	methods: {
		search() {
			if (this.query.length >= 2) {
				let buyers = this.buyers.filter(buyer => {
					return buyer.name.toLowerCase().includes(this.query.toLowerCase())
				})
				this.$store.commit('online/buyers/setBuyersToShow', buyers)
			} else {
				this.$store.commit('online/buyers/setBuyersToShow')
			}
		}
	}
}
</script>