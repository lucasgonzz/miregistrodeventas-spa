<template>
<b-modal id="special-prices" title="Precios especiales" hide-footer>
	<b-container fluid>
		<b-row>
			<b-col>
				<b-card header="Crear precio especial">
					<b-form-group
					label="Nombre para el precio especial"
					label-for="special-price-price">
						<b-form-input
						id="special-price-price"
						v-model="special_price.name"
						@keydown.enter="saveSpecialPrice"
						placeholder="Ingrese el nombre para el precio especial"></b-form-input>
					</b-form-group>
					<b-form-group>
						<b-button
						variant="primary"
						@click="saveSpecialPrice">
							<btn-loader :loading="saving_special_price"></btn-loader>
							Guardar
						</b-button>
					</b-form-group>
				</b-card>
			</b-col>
		</b-row>
		<b-row>
			<b-col>
				<b-card header="Mis precios especiales">
					<div v-show="!loading_special_prices">
						<b-list-group v-show="special_prices.length">
							<b-list-group-item
							v-for="special_price in special_prices"
							:key="special_price.id">
								{{ special_price.name }}
								<b-button
								variant="danger"
								class="float-right"
								size="sm"
								@click="deleteSpecialPrice(special_price)">
									<i class="icon-trash-3" v-show="deleting_special_price != special_price.id"></i>
									<span class="spinner-border spinner-border-sm" v-show="deleting_special_price == special_price.id"></span>
								</b-button>
							</b-list-group-item>
						</b-list-group>
						<p 
						class="text-center"
						v-show="special_prices.length == 0">
							No hay precios especiales aún
						</p>
					</div>
					<cargando size="sm" :is_loading="loading_special_prices"></cargando>
				</b-card>
			</b-col>
		</b-row>
	</b-container>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
import Cargando from '@/components/common/Cargando'
export default {
	props: ['special_prices', 'loading_special_prices'],
	components: {
		BtnLoader,
		Cargando,
	},
	data() {
		return {
			special_price: {
				name: ''
			},
			saving_special_price: false,
			deleting_special_price: 0
		}
	},
	methods: {
		saveSpecialPrice() {
			this.saving_special_price = true
			this.$api.post('special-prices', this.special_price)
			.then(() => {
				this.special_price.name = ''
				this.saving_special_price = false
				this.$toast.success('Precio guardado correctamente')
				this.$store.dispatch('getSpecialPrices')
				this.$bvModal.hide('special-prices')
			})
			.catch(err => {
				console.log(err)
				this.saving_special_price = false
			})
		},
		deleteSpecialPrice(special_price) {
			this.deleting_special_price = special_price.id
			this.$api.delete(`special-prices/${special_price.id}`)
			.then(() => {
				this.$emit('getSpecialPrices')
				this.$store.dispatch('getSpecialPrices')
				this.deleting_special_price = 0
				this.$toast.success('Precio eliminado correctamente')
			})
			.catch(err => {
				console.log(err)
				this.deleting_special_price = 0
			})
		}
	},
}
</script>