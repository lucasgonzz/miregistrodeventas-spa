export default {
	computed: {
		categories() {
			return this.$store.state.categories.categories
		},
		sub_categories() {
			return this.$store.state.sub_categories.sub_categories
		},
		categories_options() {
			let options = []
			options.push({text: 'Seleccione una categoria', value: 0})
			this.categories.forEach(category => {
				options.push({text: category.name, value: category.id})
			})
			return options
		},
	},
	methods: {
		sub_categories_options(article) {
			let sub_categories = this.sub_categories.filter(sub_cat => {
				return sub_cat.category_id == article.category_id
			})
			let options = []
			options.push({text: 'Seleccione una subcategoria', value: 0})
			sub_categories.forEach(sub_cate => {
				options.push({text: sub_cate.name, value: sub_cate.id})
			})
			let has_sub_category = sub_categories.find(sub_cat => {
				return sub_cat.id == article.sub_category_id
			})
			if (typeof has_sub_category == 'undefined') {
				article.sub_category_id = 0
			}
			return options
		}
	}
}