<template>
	<btn-loader
	class="m-l-15"
	@clicked="activete"
	:loader="loading"
	text="Activar"></btn-loader>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader2'
export default {
	props: {
		model: Object,
	},
	components: {
		BtnLoader,
	},
	data() {
		return {
			loading: false,
		}
	},
	methods: {
		activete() {
			this.loading = true 
			this.$api.put('/article/update-prop/status', {
				articles_ids: [this.model.id],
				status: 'active',
			})
			.then(res => {
				this.loading = false 
				this.$store.commit('article/add', res.data.models[0])
				this.$store.commit('article/setToShow')
				this.$toast.success('Articulo actualizado')
			})
			.catch(err => {
				console.log(err)
				this.loading = false
				this.$toast.error('Error al actualizar articulo') 
			})
		}
	}
}
</script>