<template>
<b-modal id="create-discount" title="Crear descuento" hide-footer>
	<b-form-group>
		<b-form-input
		placeholder="Nombre del descuento"
		@keydown.enter="save"
		v-model="discount.name"></b-form-input>
	</b-form-group>
	<b-form-group>
		<b-form-input
		type="number"
		placeholder="Porcentaje de descuento"
		@keydown.enter="save"
		v-model="discount.percentage"></b-form-input>
	</b-form-group>
	<b-form-group>
		<b-button
		variant="primary"
		block
		@click="save">
			<btn-loader
			:loader="loading"
			text="Guardar"></btn-loader>
		</b-button>
	</b-form-group>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	name: 'CreateDiscount',
	components: {
		BtnLoader,
	},
	data() {
		return {
			discount: {
				name: '',
				percentage: ''
			},
			loading: false
		}
	},
	methods: {
		save() {
			if (this.check()) {
				this.loading = true
				this.$api.post('/discounts', this.discount)
				.then(res => {
					this.loading = false
					this.$toast.success('Descuento guardado')
					this.$store.commit('discounts/add', res.data.discount)
					this.$bvModal.hide('create-discount')
					this.clear()
				})
				.catch(err => {
					console.log(err)
					this.loading = false
					this.$toast.error('Error al crear descuento')
				})
			}
		},
		check() {
			if (this.discount.name == '') {
				this.$toast.error('Ingrese un nombre para el descuento')
				return false
			}
			if (this.discount.discount == '') {
				this.$toast.error('Ingrese un descuento para el descuento')
				return false
			}
			return true
		},
		clear() {
			this.discount.name = ''
			this.discount.discount = ''
		}
	}
}
</script>