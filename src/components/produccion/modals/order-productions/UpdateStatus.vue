<template>
<b-modal
id="update-status"
title="Actualizar estado"
hide-footer>
    <b-form-radio
    v-for="status in statuses"
    :value="status.id"
    v-model="edit.order_production_status_id">
        {{ status.name }}
    </b-form-radio>
    <b-button
    class="m-t-15"
    @click="update"
    block 
    variant="primary">
    	<btn-loader
    	text="Actualizar"
    	:loader="updating"></btn-loader>
    </b-button>
</b-modal>
</template>
<script>
import order_productions from '@/mixins/order_productions'
import BtnLoader from '@/components/common/BtnLoader'
export default{
	mixins: [order_productions],
	components: {
		BtnLoader,
	},
	data() {
		return {
			updating: false
		}
	},
	methods: {
		update() {
			this.updating = true 
			this.$api.put('order-productions', this.edit)
			.then(res => {
				this.updating = false
				this.$toast.success('Estado actualizado')
				this.$bvModal.hide('update-status')
				this.$bvModal.hide('order-production-details')
				this.$store.dispatch('produccion/order_productions/getModels')
			})
			.catch(err => {
				this.updating = false
				console.log(err)
				this.$toast.error('Error al actualizar Estado')
			})
		}
	}
}
</script>