<template>
<b-modal
hide-footer
size="lg"
title="Nuevo combo"
id="combo">
	<b-form-group
	label="Nombre">
		<b-form-input
		v-model="model.name"
		placeholder="Nombre del combo"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Precio">
		<b-form-input
		@keyup.enter="save"
		type="number"
		v-model="model.price"
		placeholder="Precio del combo"></b-form-input>
	</b-form-group>
	<articles></articles>	
	<b-button
	variant="primary"
	block
	@click="save"
	class="m-t-15">
		<btn-loader
		:loader="loading"
		text="Guardar"></btn-loader>
	</b-button>
</b-modal>
</template>
<script>
import Articles from '@/components/listado/modals/combos/Articles'
import BtnLoader from '@/components/common/BtnLoader'

import combos from '@/mixins/combos'
export default {
	mixins: [combos],
	components: {
		Articles,
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
				if (this.model.id) {
					this.$api.put('combos/'+this.model.id, {
						...this.model,
						articles: this.model_articles
					})
					.then(res => {
						this.loading = false
						this.$store.commit('combos/update', res.data.combo)
						this.$bvModal.hide('combo')
						this.$toast.success('Combo actualizado')
						this.clear()
					})
					.catch(err => {
						this.$toast.error('Error al actualizar combo')
						this.loading = false
						console.log(err)
					})

				} else {
					this.$api.post('combos', {
						...this.model,
						articles: this.model_articles
					})
					.then(res => {
						this.loading = false
						this.$store.commit('combos/add', res.data.combo)
						this.$bvModal.hide('combo')
						this.$toast.success('Combo creado')
						this.clear()
					})
					.catch(err => {
						this.$toast.error('Error al crear combo')
						this.loading = false
						console.log(err)
					})
				}
			}
		},
		check() {
			if (this.model.name == '') {
				this.$toast.error('Ingrese un nombre para el combo')
				return false
			}
			if (this.model.price == '') {
				this.$toast.error('Ingrese un precio para el combo')
				return false
			}
			if (!this.model_articles.length) {
				this.$toast.error('Ingrese al menos un articulo al combo')
				return false
			}
			this.model_articles.forEach(article => {
				if (article.amount == '') {
					this.$toast.error('Ingrese la cantidad del articulo '+article.name)
					return false
				}
			})
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