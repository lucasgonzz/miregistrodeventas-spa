export default {
	methods: {
		imageUrl(article, user) {
			let url = `http://localhost:8000/storage/articles/${user.id}/${this.getFirstImage(article)}`
			return url
		},
		getFirstImage(article) {
			let first_image = article.images[0].url
			if (article.images) {
				article.images.forEach(image => {
					if (image.url.charAt(0) == 'F') {
						first_image = image
					}
				})
			}
			return first_image
		},
	}
}