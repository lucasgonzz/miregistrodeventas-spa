<template>
<div>
	<b-row
	v-if="view == 'facturacion'">
		<b-col
		lg="8">
			<general></general>	
		</b-col>
	</b-row>
</div>
</template>
<script>
import General from '@/components/configuration/components/facturacion/General'
export default {
	components: {
		General,
	},
	computed: {
		text_delete() {
			return '¿Seguro que quiere eliminar el titulo?'
		}
	},
	data() {
		return {
			loading: false,
		}
	},
	methods: {
		updateUser() {
			this.loading = true
			this.$api.put('/user', this.user)
			.then(res => {
				this.$toast.success('Actualizado')
				this.loading = false
			})
			.catch(err => {
				this.$toast.error('Error al actualizar')
				console.log(err)
				this.loading = false
			})
		}
	}
}
</script>