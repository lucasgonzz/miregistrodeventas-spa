<template>
	<b-button
	block 
	variant="primary"
	@click="save">
		<btn-loader
		text="Crear cupon"
		:loader="saving">
		</btn-loader>
	</b-button>
</template>
<script>
import cupons from '@/mixins/cupons'
import BtnLoader from '@/components/common/BtnLoader'
export default {
	mixins: [cupons],
	components: {
		BtnLoader,
	},
	data() {
		return {
			saving: false,
		}
	},
	methods: {
		save() {
			if (this.check()) {
				this.saving = true 
				this.$api.post('cupons', this.new_cupon)
				.then(res => {
					this.saving = false
					this.$toast.success('Cupon creado')
					this.$store.commit('online/cupons/addActiveCupon', res.data.cupon)
					this.$store.commit('online/cupons/clear')
					this.$bvModal.hide('create-cupon')
				})
				.catch(err => {
					this.saving = false
					console.log(err)
					this.$toast.error('Error al crear el cupon')
				})
			}
		},
		check() {
			if (this.new_cupon.amount == '' && this.new_cupon.percentage == '') {
				this.$toast.error('Ingrese un monto para el cupon')
				return false 
			}
			if (this.new_cupon.code == '') {
				this.$toast.error('Ingrese un codigo para el cupon')
				return false 
			}
			return true
		}
	}
}
</script>