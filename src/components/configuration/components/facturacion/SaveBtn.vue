<template>
	<b-button
	@click="save"
	variant="primary"
	block>
		<btn-loader
		:loader="loading"
		text="Guardar cambios"></btn-loader>
	</b-button>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	components: {
		BtnLoader,
	},
	data() {
		return {
			loading: false,
		}
	},
	methods: {
		save() {
			this.loading = true 
			this.$api.put('afip-information', this.user.afip_information)
			.then(() => {
				this.loading = false 
				this.$toast.success('Información actualizada')
			})
			.catch(err => {
				this.loading = false 
				console.log(err)
				this.$toast.error('Error al guardar información')
			})
		}
	}
}
</script>