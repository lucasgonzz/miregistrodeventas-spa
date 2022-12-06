<template>
	<b-row 
	v-if="!sale_details.budget"
	class="p-15">
		<b-col
		cols="12">
			<div>
				<btn-loader
				class="m-r-10"
				text="Actualizar venta"
				:block="false"
				:loader="loading_index"
				@clicked="updateSale(sale_details)" />
				<b-button
				v-b-modal="'update-prices'"
				class="m-r-10"
				variant="outline-primary">
					Actualizar precios
				</b-button>
				<b-button
				class="m-r-10"
				v-if="hasExtencion('acopios')"
				@click="printDeliveredArticles"
				variant="outline-danger">
					<i class="icon-print"></i>
					Imprimir U entregadas
				</b-button>
				<b-btn-group>
					<b-button
					@click="newPdf(sale_details.id, 1)"
					variant="danger">
						<i class="icon-print"></i>
						Con precios
					</b-button>
					<b-button
					@click="newPdf(sale_details.id, 0)"
					variant="outline-danger">
						<i class="icon-print"></i>
						Sin precios
					</b-button>
				</b-btn-group>
			</div>
		</b-col>
		<b-col 
		cols="12">
			<div
			v-if="sale_details.order">
				<p
				class="m-b-0 m-t-15">
					Pertenece al pedido online N° {{ sale_details.order.num }}
				</p>
				<p
				v-if="sale_details.order.cupon"
				class="m-b-0 m-t-15">
					<span
					v-if="sale_details.order.cupon.percetage">
						Cupon del {{ sale_details.order.cupon.percetage }}%
					</span>
					<span
					v-else>
						Cupon de ${{ sale_details.order.cupon.amount }}
					</span>
				</p>
			</div>
			<p
			class="m-b-0 m-t-15 title">
				Total: {{ getTotalSale(sale_details, true, true, false).total }}
			</p>
			<p
			class="m-b-0"
			v-for="discount in sale_details.discounts"
			:key="'dis-'+discount.id">
				- {{ discount.pivot.percentage }}% {{ discount.name }}
			</p>
			<p
			class="m-b-0"
			v-for="surchage in sale_details.surchages"
			:key="'sur-'+surchage.id">
				+ {{ surchage.pivot.percentage }}% {{ surchage.name }}
			</p>
		</b-col>
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
		class="m-15"
		v-if="sale_details.client"
		:client="sale_details.client"></client-info>
	</b-row>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader2'
import ClientInfo from '@/components/common/ClientInfo'
import sales from '@/mixins/sales'
import print_sale from '@/mixins/print_sale'
import previus_sales from '@/mixins/previus_sales'
export default {
	mixins: [print_sale, sales, previus_sales],
	components: {
		BtnLoader,
		ClientInfo,
	},
	data() {
		return {
			loading: false,
			loading_index: false,
		}
	},
	methods: {
		printDeliveredArticles() {
			let link = process.env.VUE_APP_API_URL+'/sale/pdf/delivered-articles/'+this.sale_details.id 
			window.open(link)
		},
		updateSale(sale) {
			this.loading_index = true 
			this.$api.get('sale/get-previus-next-index/'+sale.id)
			.then(res => {
				this.loading_index = false
				this.$store.commit('vender/previus_sales/setIndex', res.data.index)
				this.callPreviusSale()
				this.$router.push({name: 'Vender', params: {view: 'remito'}})
			})
			.catch(err => {
				this.loading_index = false
				console.log(err)
			})
		},	
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
	div
		display: flex
		align-items: center
</style>