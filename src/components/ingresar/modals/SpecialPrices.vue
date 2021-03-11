<template>
<b-modal id="special-prices" title="Precios especiales" hide-footer>
	<b-container fluid>
		<b-row>
			<b-col>
				<b-card header="Agregar precio especial" no-body>
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
						block
						variant="primary"
						@click="saveSpecialPrice">
							<btn-loader text="Guardar" :loader="saving_special_price"></btn-loader>
						</b-button>
					</b-form-group>
				</b-card>
			</b-col>
		</b-row>
		<b-row v-if="special_prices.length">
			<b-col>
				<b-card header="Mis precios especiales" no-body>
					<div>
						<b-list-group>
							<b-list-group-item
							v-for="special_price in special_prices"
							:key="special_price.id">
								{{ special_price.name }}
								<b-button
								variant="danger"
								class="float-right"
								size="sm"
								@click="deleteSpecialPrice(special_price)">
									<i class="icon-trash-3"></i>
								</b-button>
							</b-list-group-item>
						</b-list-group>
					</div>
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
	components: {
		BtnLoader,
		Cargando,
	},
	computed: {
		special_prices() {
			return this.$store.state.special_prices.special_prices
		}
	},
	data() {
		return {
			special_price: {
				name: ''
			},
			saving_special_price: false,
		}
	},
	methods: {
		saveSpecialPrice() {
			this.saving_special_price = true
			this.$api.post('special-prices', this.special_price)
			.then(res => {
				this.saving_special_price = false
				this.$toast.success('Precio guardado correctamente')
				this.$store.commit('special_prices/add', res.data.special_price)
				this.$bvModal.hide('special-prices')
				this.clear()
			})
			.catch(err => {
				console.log(err)
				this.$toast.error('Error al guardad precio especial, intentelo mas tarte')
				this.saving_special_price = false
			})
		},
		clear() {
			this.special_price.name = ''
		},
		deleteSpecialPrice(special_price) {
			this.$store.commit('special_prices/setDelete', special_price)
			this.$bvModal.show('delete-special-price')
		}
	},
}
</script>