export default {
	methods: {
		getIds(models) {
			let models_id = []
			models.forEach(model => {
				models_id.push(model.id)
			})
			return models_id
		}
	}
}