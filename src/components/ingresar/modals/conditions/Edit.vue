<template>
<b-modal id="edit-condition" title="Editar Condicion" hide-footer>
	<b-form-group
	label="Nombre">
		<b-form-input
		v-model="condition.name"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Descripcion">
		<b-form-input
		v-model="condition.description"></b-form-input>
	</b-form-group>
	<b-form-group>
		<b-button
		block
		@click="update"
		variant="primary">
			<btn-loader
			text="Actualizar"
			:loader="loading"></btn-loader>
		</b-button>
	</b-form-group>
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
			loading: false
		}
	},
	computed: {
		condition() {
			return this.$store.state.conditions.edit
		}
	},
	methods: {
		update() {
			this.loading = true
			this.$api.put('/conditions', this.condition)
			.then(res => {
				this.loading = false
				this.$store.commit('conditions/update', res.data.condition)
				this.$toast.success('Condicion actualizada')
				this.$bvModal.hide('edit-condition')
			})
			.catch(err => {
				this.loading = false
				this.$toast.error('Error al actualizar condicion')
				console.log(err)
			})
		}
	}
}
</script>