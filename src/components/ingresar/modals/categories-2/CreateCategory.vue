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
import Icons from '@/components/ingresar/modals/categories/Icons'
export default {
	components: {
		BtnLoader,
		Icons,
	},
	computed: {
		category() {
			return this.$store.state.categories.create
		},
	},
	data() {
		return {
			loading: false,
		}
	},
	methods: {
		save() {
			if (this.check()) {
				console.log(this.category)
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
			this.category.icon_id = ''
		}
	}
}
</script>