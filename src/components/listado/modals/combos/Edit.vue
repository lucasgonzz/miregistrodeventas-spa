<template>
<b-modal
hide-footer
title="Actualizar combo"
id="edit-combo">
	<b-form-group
	label="Nombre">
		<b-form-input
		v-model="edit.name"
		placeholder="Nombre del combo"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Precio">
		<b-form-input
		type="number"
		@keyup.enter="save"
		v-model="edit.price"
		placeholder="Precio del combo"></b-form-input>
	</b-form-group>
	<b-button
	variant="primary"
	block
	@click="save"
	class="m-t-15">
		<btn-loader
		:loader="loading"
		text="Actualizar"></btn-loader>
	</b-button>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
import combos from '@/mixins/combos'
export default {
	mixins: [combos],
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
			if (this.check()) {
				this.loading = true 
				this.$api.put('combos/'+this.edit.id, {
					...this.edit,
					articles: this.selected_articles
				})
				.then(res => {
					this.loading = false
					this.$store.commit('combos/update', res.data.combo)
					this.$bvModal.hide('edit-combo')
					this.$toast.success('Combo actualizado')
				})
				.catch(err => {
					this.$toast.error('Error al actualizar combo')
					this.loading = false
					console.log(err)
				})
			}
		},
		check() {
			if (this.edit.name == '') {
				this.$toast.error('Ingrese un nombre para el combo')
				return false
			}
			if (this.edit.price == '') {
				this.$toast.error('Ingrese un precio para el combo')
				return false
			}
			return true
		},
	}
}
</script>