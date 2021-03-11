<template>
	<div class="m-b-10">
		<b-button
		@click="updateClients"
		variant="primary">
			<btn-loader
			text="Actualizar lista de clientes"
			:loader="loading"></btn-loader>
		</b-button>
	</div>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	name: 'UpdateClients',
	components: {
		BtnLoader,
	},
	computed: {
		loading() {
			return this.$store.state.clients.loading
		}
	},
	methods: {
		updateClients() {
			this.$store.dispatch('clients/getClients')
		}
	}
}
</script>