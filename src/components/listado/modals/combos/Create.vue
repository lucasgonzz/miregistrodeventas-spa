<template>
<b-modal
hide-footer
title="Nuevo combo"
id="create-combo">
	<b-form-group
	label="Nombre">
		<b-form-input
		v-model="form.name"
		placeholder="Nombre del combo"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Precio">
		<b-form-input
		@keyup.enter="save"
		type="number"
		v-model="form.price"
		placeholder="Precio del combo"></b-form-input>
	</b-form-group>
	<b-button
	variant="primary"
	block
	@click="save"
	class="m-t-15">
		<btn-loader
		:loader="loading"
		text="Crear combo"></btn-loader>
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
			form: {
				name: '',
				price: '',
			},
		}
	},
	methods: {
		save() {
			if (this.check()) {
				this.loading = true 
				this.$api.post('combos', {
					...this.form,
					articles: this.selected_articles
				})
				.then(res => {
					this.loading = false
					this.$store.commit('combos/add', res.data.combo)
					this.$bvModal.hide('create-combo')
					this.$toast.success('Combo creado')
					this.clear()
				})
				.catch(err => {
					this.$toast.error('Error al crear combo')
					this.loading = false
					console.log(err)
				})
			}
		},
		check() {
			if (this.form.name == '') {
				this.$toast.error('Ingrese un nombre para el combo')
				return false
			}
			if (this.form.price == '') {
				this.$toast.error('Ingrese un precio para el combo')
				return false
			}
			return true
		},
		clear() {
			this.form = {
				name: '',
				price: '',
			}
		},
	}
}
</script>