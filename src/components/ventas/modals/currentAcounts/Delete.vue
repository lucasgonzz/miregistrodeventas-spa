<template>
<b-modal id="delete-current-acount" size="sm" hide-footer hide-header>
	<p>
		¿Seguro que quiere eliminar la cuenta corriente?
	</p>
	<b-button
	block
	variant="danger"
	@click="deleteCurrentAcount">
		<btn-loader
		:loader="deleting"
		text="Eliminar"></btn-loader>
	</b-button>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	components: {
		BtnLoader,
	},
	data() {
		return {
			deleting: false,
		}
	},
	computed: {
		current_acount() {
			return this.$store.state.clients.current_acounts.delete
		}
	},
	methods: {
		deleteCurrentAcount() {
			this.deleting = true
			this.$api.delete('current-acounts/'+this.current_acount.id)
			.then(res => {
				this.deleting = false
				this.$bvModal.hide('delete-current-acount')
				this.$store.dispatch('clients/current_acounts/getCurrentAcounts')
			})
			.catch(err => {
				this.deleting = false
				console.log(err)
			})
		}
	}
}
</script>