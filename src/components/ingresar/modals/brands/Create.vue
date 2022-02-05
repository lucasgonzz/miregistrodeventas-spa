<template>
<b-modal id="create-brand" title="Nueva marca" hide-footer>
	<b-form-group>
		<b-form-input
		@keyup.enter="save"
		placeholder="Nombre"
		v-model="model.name"></b-form-input>
	</b-form-group>	
	<b-form-group>
		<b-button
		block
		variant="primary"
		@click="save">
			<btn-loader
			:loader="loading"
			text="Guardar"></btn-loader>
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
			model: {
				name: '',
			},
			loading: false,
		}
	},
	methods: {
		save() {
			if (this.check()) {
				this.loading = true
				this.$api.post('/brands', this.model)
				.then(res => {
					this.loading = false
					this.$store.commit('brands/add', res.data.brand)
					this.$toast.success('Marca guardada')
					this.clear()
					this.$bvModal.hide('create-brand')
				})
				.catch(err => {
					this.loading = false
					console.log(err)
					this.$toast.error('Error al guardar marca')
				})
			}
		},
		check() {
			if (this.model.name == '') {
				this.$toast.error('Ingrese un nombre para la marca, por favor')
				return false
			}
			return true
		},
		clear() {
			this.model.name = ''
		}
	}
}
</script>