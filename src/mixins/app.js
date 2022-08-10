export default {
	computed: {
		sub_categories() {
			return this.$store.state.sub_categories.sub_categories
		},
	},
	methods: {
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
					this.$store.commit('vender/setSubCategories', res.data.sub_categories)
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