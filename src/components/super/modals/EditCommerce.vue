<template>
<b-modal
id="edit-commerce"
hide-footer>
	<b-form-group
	label="Nombre">
		<b-form-input
		v-model="commerce.name"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Empresa">
		<b-form-input
		v-model="commerce.company_name"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Telefono">
		<b-form-input
		v-model="commerce.phone"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Email">
		<b-form-input
		v-model="commerce.email"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Plan">
		<b-form-select
		:options="plan_options"
		v-model="commerce.plan_id"></b-form-select>
	</b-form-group>
	<b-button
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
		commerce() {
			return this.$store.state.super.commerce_edit
		},
		plans() {
			return this.$store.state.super.plans
		},
		plan_options() {
			let options = []
			this.plans.forEach(plan => {
				options.push({
					text: plan.name,
					value: plan.id,
				})
			})
			return options
		}
	},
	methods: {
		update() {
			this.loading = true 
			this.$api.put('/super/commerces', this.commerce)
			.then(res => {
				this.loading = false
				this.$store.commit('super/updateCommerce', res.data.commerce)
				this.$toast.success('Comercio actualizado')
				this.$bvModal.hide('edit-commerce')
			})
			.catch(err => {
				this.loading = false
				console.log(err)
				this.$toast.error('Error al actualizar Comercio')
			})
		}
	}
}
</script>