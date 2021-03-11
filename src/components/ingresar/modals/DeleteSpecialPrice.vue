<template>
<b-modal id="delete-special-price" hide-footer hide-header size="sm">
	<b-container>
		<b-row
		class="m-b-0">
			<b-col>
				<p
				class="text-center">¿Seguro que quiere eliminar el precio especial {{ special_price.name }}?</p>
				<b-button
				block
				class="m-b-0"
				@click="deleteSpecialPrice"
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
	name: 'DeleteSpecialPrice',
	components: {
		BtnLoader
	},
	data() {
		return {
			loading: false
		}
	},
	computed: {
		special_price() {
			return this.$store.state.special_prices.special_price_to_delete
		}
	},
	methods: {
		deleteSpecialPrice() {
			this.loading = true
			this.$api.delete('special-prices/'+this.special_price.id)
			.then(() => {
				this.loading = false
				this.$store.commit('special_prices/delete')
				this.$bvModal.hide('delete-special-price')
				this.$toast.success('Precio especial eliminado')
			})
			.catch((err) => {
				this.$toast.error('Error al eliminar precio especial, intentelo mas tarde')
				this.loading = false
				console.log(err)
			})
		},
	}
}
</script>