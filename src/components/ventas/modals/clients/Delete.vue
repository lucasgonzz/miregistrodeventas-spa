<template>
<b-modal id="delete-client" hide-header hide-footer size="sm">
	<p class="text-center">
		¿Seguro quiere eliminar el cliente {{ client.name }}?
	</p>
	<b-button
	@click="deleteClient"
	block
	variant="danger">
		<btn-loader
		text="Eliminar"
		:loader="deleting"></btn-loader>
	</b-button>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	name: 'DeleteClient',
	components: {
		BtnLoader,
	},
	data() {
		return {
			deleting: false,
		}
	},
	computed: {
		client() {
			return this.$store.state.clients.client_to_delete
		}
	},
	methods: {
		deleteClient() {
			this.deleting = true
			this.$api.delete('/clients/'+this.client.id)
			.then(res => {
				this.deleting = false
				this.$store.commit('clients/delete')
				this.$toast.success('Cliente eliminado')
				this.$bvModal.hide('delete-client')
			})
			.catch(err => {
				console.log(err)
				this.deleting = false
			})
		}
	}
}
</script>