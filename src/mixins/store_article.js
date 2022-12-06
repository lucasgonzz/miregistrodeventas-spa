import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL

const callArticles = page => {
	return axios.get(`/api/article/index/active/?page=${page}`)
	.then(res => {
		return res.data.models.data
	})
	.catch(err => {
		console.log(err)
	})
}
export default {
	methods: {
		getArticles(page) {
			let loaded_models = []
			let models = []
			let per_page = 5
			console.log('page '+page)
			callArticles(page)
			.then(models => {
				if (models.length == per_page) {
					this.getArticles(page + 1)
				} else {
					return 'hola'
				}
			})
			return 'chau'
		},
	}
}