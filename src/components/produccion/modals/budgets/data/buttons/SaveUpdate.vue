<template>
	<div
	v-if="can_edit && (!edit || (edit && edit.status == 'unconfirmed'))">
		<b-form-group
		v-if="client && client.email && !edit">
			<b-form-checkbox
			v-model="send_mail"
			:value="1"
			:uncheck-value="0">
				Enviar correo al cliente ({{ client.email }})
			</b-form-checkbox>
		</b-form-group>
		<b-button
		block
		variant="primary"
		@click="save">
			<btn-loader
			:text="btn_text"
			:loader="loading_save"></btn-loader>
		</b-button>
	</div>
</template> 
<script>
import budgets from '@/mixins/budgets'
import BtnLoader from '@/components/common/BtnLoader'
export default {
	mixins: [budgets],
	props: ['budget'],
	components: {
		BtnLoader,
	},
	computed: {
		btn_text() {
			if (this.edit) {
				return 'Actualizar'
			}
			return 'Guardar'
		},
	},
	data() {
		return {
			loading_save: false,
			send_mail: 1,
		}
	},
	methods: {
		save() {
			if (this.check()) {
				if (this.edit) {
					this.loading_save = true 
					this.$api.put('budgets', {
						budget: this.edit,
						client: this.client,
						products: this.products,
						start_at: this.start_at,
						finish_at: this.finish_at,
						observations: this.observations,
						delivery_and_placement: this.delivery_and_placement,
						send_mail: this.send_mail,
					})
					.then(res => {
						this.loading_save = false
						this.$toast.success('Presupuesto actualizado')
						this.$store.commit('produccion/budgets/update', res.data.budget)
						this.$bvModal.hide('create-budget')
					})
					.catch(err => {
						this.loading_save = false
						this.$toast.error('Error al actualizar presupuesto')
						console.log(err)
					})
				} else {
					this.loading_save = true 
					this.$api.post('budgets', {
						client: this.client,
						products: this.products,
						start_at: this.start_at,
						finish_at: this.finish_at,
						observations: this.observations,
						delivery_and_placement: this.delivery_and_placement,
						send_mail: this.send_mail,
					})
					.then(res => {
						this.loading_save = false
						this.$toast.success('Presupuesto creado')
						this.$store.commit('produccion/budgets/add', res.data.budget)
						this.$bvModal.hide('create-budget')
					})
					.catch(err => {
						this.loading_save = false
						this.$toast.error('Error al guardar presupuesto')
						console.log(err)
					})
				}
			}
		},
		check() {
			if (!this.client) {
				this.$toast.error('Seleccione un cliente')
				return false
			}
			if (!this.products.length) {
				this.$toast.error('Agregue al menos un producto')
				return false
			}
			return true
		},
	}
}
</script>