<template>
	<div class="buttons-listado">
		<!-- Online -->
		<btn-loader
		v-if="has_online"
		@clicked="setArticleOnline(model)"
		:variant="isArticleOnline(model)"
		size="sm"
		icon="not"
		:block="false"
		:loader="loading_online"></btn-loader>

		<btn-loader
		v-if="has_online"
		@clicked="setFeatured(model)"
		:variant="isFeatured(model)"
		size="sm"
		icon="check"
		:block="false" 
		class="m-l-10"
		:loader="loading_featured"></btn-loader>
		
		<!-- Proveedores -->
		<b-button 
		v-if="model.providers"
		@click="providersHistory(model)"
		size="sm"
		class="m-l-10">
			<i class="icon-users"></i>
		</b-button>

		<!-- Editar -->
		<b-button 
		variant="primary"
		size="sm"
		@click="editArticle(model)" 
		class="btn-listado btn-listado-edit m-l-10">
			<i class="icon-edit"></i>
		</b-button>
	</div>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader2'

import edit_articles from '@/mixins/edit_articles'
export default {
	mixins: [edit_articles],
	components: {
		BtnLoader,
	},
	props: {
		model: Object,
	},
	data() {
		return {
			loading_featured: 0,
			loading_online: 0,
		}
	},
	methods: {
		setFeatured() {
			this.loading_featured = true
			this.$api.get(`/article/set-featured/${this.model.id}`)
			.then(res => {
				this.$toast.success('Articulo actualizado')
				this.loading_featured = false 
				this.$store.commit('article/add', res.data.model)
				this.$store.commit('article/setToShow')
			})
			.catch(err => {
				this.$toast.error('Error al agregar articulo en destacados')
				this.loading_featured = false
				console.log(err)
			})
		},
		isFeatured() {
			if (this.model.featured) {
				return 'success'
			}
			return 'outline-success'
		},
		setArticleOnline() {
			this.loading_online = true
			this.$api.get(`/article/set-online/${this.model.id}`)
			.then(res => {
				this.$toast.success('Articulo actualizado')
				this.loading_online = 0
				this.$store.commit('article/add', res.data.model)
				this.$store.commit('article/setToShow')
			})
			.catch(err => {
				this.$toast.error('Error al actualizar articulo')
				this.loading_online = 0
				console.log(err)
			})
		},
		isArticleOnline() {
			if (this.model.online == 1) {
				return 'outline-danger'
			}
			return 'danger'
		},
		providersHistory() {
			// this.orderProvidersHistory(this.model)
			this.$store.commit('article/setModel', {model: this.model, properties: []})
			this.$bvModal.show('providers-history')
		},
	}
}
</script>
<style lang="sass"> 
.buttons-listado
	width: 200px
</style>