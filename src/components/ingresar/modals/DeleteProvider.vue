<template>
<b-modal id="delete-provider" hide-footer hide-header size="sm">
	<b-container>
		<b-row>
			<b-col>
				<p
				class="text-center">¿Seguro que quiere eliminar el proveedor {{ provider.name }}?</p>
				<b-button
				class="m-b-0"
				block
				@click="deleteProvider"
				variant="danger">
					<btn-loader
					text="Eliminar"
					:loader="loading"></btn-loader>
				</b-button>
			</b-col>
		</b-row>
	</b-container>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	name: 'DeleteProvider',
	components: {
		BtnLoader
	},
	data() {
		return {
			loading: false
		}
	},
	computed: {
		provider() {
			return this.$store.state.providers.provider_to_delete
		}
	},
	methods: {
		deleteProvider() {
			this.loading = true
			this.$api.delete('providers/'+this.provider.id)
			.then(() => {
				this.loading = false
				this.$store.commit('providers/delete')
				this.$bvModal.hide('delete-provider')
				this.$toast.success('Proveedor eliminado')
			})
			.catch((err) => {
				this.loading = false
				console.log(err)
			})
		},
	}
}
</script>