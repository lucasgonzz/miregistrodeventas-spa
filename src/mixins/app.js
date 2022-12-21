export default {
	computed: {
		sub_categories() {
			return this.$store.state.sub_category.models 
		},
		loaded_models() {
			return this.$store.state.article.loaded_models
		},
	},
	methods: {
		checkUpdateFeaturesCookie() {
			let cookie = this.$cookies.get('update_features_watched')
			console.log(cookie)
			if (cookie === null) {
				this.$cookies.set('update_features_watched', false, -1)
				cookie = this.$cookies.get('update_features_watched')
			}
			if (cookie == 'false') {
				this.$store.dispatch('update_feature/getModels')
				setTimeout(() => {
					this.$bvModal.show('update-features')
				}, 3000)
			} 
		},
		getArticles() {
			this.$store.commit('article/setPage', 1)
			this.$store.commit('article/setModels', [])
			this.$store.commit('article/setLoadedModels', [])
			this.callGetArticles()
		},
		callGetArticles() {
			let per_page = 500
			this.$store.dispatch('article/getModels')
			.then(() => {
				if (this.loaded_models.length == per_page) {
					this.callGetArticles()
				} else {
					this.$store.commit('article/setLoading', false)
				}
			})
		},
		setSubCategoriesInVender() {
			let sub_categories = this.sub_categories.filter(cat => {
				return cat.show_in_vender 
			})
			if (sub_categories.length) {
				let ids = []
				sub_categories.forEach(cat => {
					ids.push(cat.id)
				})
				this.$api.get('sub-categories/for-vender/'+ids.join('-'))
				.then(res => {
					this.$store.commit('vender/setSubCategories', res.data.models)
				})
				.catch(err => {
					console.log(err)
				})
			} else {
				this.$store.commit('vender/setSubCategories', [])
			}
		}
	}
}