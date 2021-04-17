<template>
<b-modal id="create-category" title="Nueva Categoria" hide-footer>
	<b-form-group>
		<b-form-input
		@keyup.enter="save"
		placeholder="Nombre"
		v-model="category.name"></b-form-input>
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
		BtnLoader
	},
	data() {
		return {
			category: {
				name: ''
			},
			loading: false,
		}
	},
	methods: {
		save() {
			if (this.check()) {
				this.loading = true
				this.$api.post('/categories', this.category)
				.then(res => {
					this.loading = false
					this.$store.commit('categories/addCategory', res.data.category)
					this.$store.commit('categories/orderCategories')
					this.$toast.success('Categoria guardada')
					this.clear()
					this.$bvModal.hide('create-category')
				})
				.catch(err => {
					this.loading = false
					console.log(err)
					this.$toast.error('Error al guardar categoria')
				})
			}
		},
		check() {
			if (this.category.name == '') {
				this.$toast.error('Ingrese un nombre para la categoria, por favor')
				return false
			}
			return true
		},
		clear() {
			this.category.name = ''
		}
	}
}
</script>