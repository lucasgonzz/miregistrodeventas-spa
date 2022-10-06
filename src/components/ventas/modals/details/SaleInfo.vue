<template>
	<div 
	v-if="!sale_details.budget"
	class="p-15">
		<div class="sale-details-title">
			<p
			class="m-0">
				<strong>
					Total: {{ getTotalSale(sale_details).total }}
				</strong>
			</p>
			<b-button
			@click="printSales(sale_details.id)"
			variant="danger">
				<i class="icon-print"></i>
				Imprimir
			</b-button>
		</div>
		<div 
		class="m-t-15"
		v-if="!sale_details.save_current_acount">
			<p>
				Esta venta no genero movimiento en la cuenta corriente de {{ sale_details.client.name }}
			</p>
			<btn-loader 
			:block="false" 
			@clicked="saveCurrentAcount"
			:loader="loading"
			text="Generar cuenta corriente" />
		</div>
		<client-info
		class="m-t-15"
		v-if="sale_details.client"
		:client="sale_details.client"></client-info>
	</div>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader2'
import ClientInfo from '@/components/common/ClientInfo'
import sales from '@/mixins/sales'
import print_sale from '@/mixins/print_sale'
export default {
	mixins: [print_sale, sales],
	components: {
		BtnLoader,
		ClientInfo,
	},
	data() {
		return {
			loading: false,
		}
	},
	methods: {
		saveCurrentAcount() {
			this.loading = true 
			this.$api.put('sale/save-current-acount/'+this.sale_details.id)
			.then(res => {
				console.log(res)
				this.loading = false 
				this.$toast.success('Cuenta corriente actualizada')
				this.$store.commit('sale/add', res.data.model)
				this.$bvModal.hide('sale-details')
			})
			.catch(err => {
				this.loading = false 
				this.$toast.error('Error al actualizar cuenta corriente')
				console.log(err)
			})
		}
	}
}
</script>
<style lang="sass">
.sale-details-title 
	display: flex
	flex-direction: row
	justify-content: space-between
	p 
		font-size: 1.5em 
</style>