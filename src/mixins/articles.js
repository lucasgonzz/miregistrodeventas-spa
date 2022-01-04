export default {
	data() {
		return {
			loading_featured: 0,
			loading_online: 0,
		}
	},
	methods: {
		setFeatured(article) {
			this.loading_featured = article.id
			this.$api.get(`/articles/set-featured/${article.id}`)
			.then(res => {
				this.$toast.success('Articulo actualizado')
				this.loading_featured = 0
				this.$store.commit('articles/update', res.data.article)
			})
			.catch(err => {
				this.$toast.error('Error al agregar articulo en destacados')
				this.loading_featured = 0
				console.log(err)
			})
		},
		isFeatured(article) {
			if (article.featured) {
				return 'success'
			}
			return 'outline-success'
		},
		setArticleOnline(article) {
			this.loading_online = article.id
			this.$api.get(`/articles/set-online/${article.id}`)
			.then(res => {
				this.$toast.success('Articulo actualizado')
				this.loading_online = 0
				this.$store.commit('articles/update', res.data.article)
			})
			.catch(err => {
				this.$toast.error('Error al actualizar articulo')
				this.loading_online = 0
				console.log(err)
			})
		},
		isArticleOnline(article) {
			if (article.online == 1) {
				return 'outline-danger'
			}
			return 'danger'
		},
	}
}