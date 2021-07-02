<template>
	<b-button
	variant="primary"
	class="m-b-15"
	@click="getBuyers">
		<btn-loader
		:loader="loading"
		text="Actualizar"></btn-loader>
	</b-button>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	components: {
		BtnLoader,
	},
	computed: {
		loading() {
			return this.$store.state.online.buyers.loading
		},
	},
	methods: {
		getBuyers() {
			this.$store.dispatch('online/buyers/getBuyers')
		}
	}
}
</script>