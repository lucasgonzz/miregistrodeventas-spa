<template>
<b-modal
title="Editar Plan"
id="plan-permissions"
hide-footer>
	<b-form-checkbox
	v-for="permission in permissions"
	:value="permission.id"
	v-model="plan.permissions_id">
		{{ permission.name }}
	</b-form-checkbox>
	<b-button
	class="m-t-15"
	block 
	@click="update"
	variant="primary">
		<btn-loader
		:loader="loading"
		text="Actualizar"></btn-loader>
	</b-button>
</b-modal>
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
	computed: {
		plan() {
			return this.$store.state.super.plan_permissions
		},
		permissions() {
			return this.$store.state.super.permissions
		}
	},
	methods: {
		update() {
			this.loading = true 
			this.$api.put('super/plans', this.plan)
			.then(res => {
				this.loading = false
				this.$store.commit('super/updatePlan', res.data.plan)
				this.$toast.success('Plan actualizado')
				this.$bvModal.hide('plan-permissions')
			})
			.catch(err => {
				this.loading = false
				console.log(err)
				this.$toast.error('Error al actualizar Plan')
			})
		}
	}
}
</script>