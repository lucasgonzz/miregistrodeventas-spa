<template>
<b-row
v-if="view == 'tienda-online'">
	<b-col
	lg="8">
		<general></general>	
		<title-image></title-image>	
		<addresses></addresses>	
		<workdays></workdays>	
	</b-col>
</b-row>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
import General from '@/components/configuration/components/online/General'
import TitleImage from '@/components/configuration/components/online/TitleImage'
import Addresses from '@/components/configuration/components/online/Addresses'
import Workdays from '@/components/configuration/components/online/Workdays'
import configuration from '@/mixins/configuration'
export default {
	mixins: [configuration],
	components: {
		BtnLoader,
		General,
		TitleImage,
		Addresses,
		Workdays,
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