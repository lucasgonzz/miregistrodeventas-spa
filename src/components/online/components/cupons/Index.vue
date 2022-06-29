<template>
	<div
	v-if="view == 'cupones'">
	    <confirm
	    :text="text_delete"
	    :actions="['online/cupons/delete']"
	    id="delete-cupon"
	    toast="Cupon eliminado"></confirm>
		<create-cupon></create-cupon>
		<create-cupon-btn></create-cupon-btn>
		<active-cupons></active-cupons>
	</div>
</template>
<script>
import Confirm from '@/components/common/Confirm'
import CreateCupon from '@/components/online/modals/cupons/create/Index'
import CreateCuponBtn from '@/components/online/components/cupons/CreateCuponBtn'
import ActiveCupons from '@/components/online/components/cupons/ActiveCupons'

import online from '@/mixins/online'
export default {
	mixins: [online],
	components: {
		Confirm,
		CreateCupon,
		CreateCuponBtn,
		ActiveCupons,
	},
	data() {
		return {
			loading: false,
		}
	},
	computed: {
		text_delete() {
			return '¿Seguro que quiere eliminar este cupon?'
		},
		btn_text() {
			return 'Eliminar'
		},
		delete_cupon() {
			return this.$store.state.online.cupons.delete
		},
	},
	methods: {
		deleteCupon() {
			this.loading = true
			this.$api.delete('cupons/'+this.delete_cupon.id)
			.then(() => {
				this.loading = false
				this.$toast.success('Cupon eliminado')
				this.$store.commit('online/cupons/delete')
				this.$bvModal.hide('confirm')
			})
			.catch(err => {
				this.loading = false
				console.log(err)
				this.$toast.error('Error al eliminar cupon')
			})
		}
	}
}
</script>