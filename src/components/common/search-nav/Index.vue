<template>
	<b-form-input
	@keyup="restart"
	@keyup.enter="search"
	v-model="query"
	placeholder="Buscar"></b-form-input>
</template>
<script>
export default {
	props: {
		models: Array,
		model_name: String,
	},
	data() {
		return {
			query: '',
			results: [],
		}
	},
	computed: {
		properties_to_filter() {
			return this.propsToFilter(this.model_name)
		},
	},
	methods: {
		restart() {
			if (this.query.length == 0) {
				this.$store.commit(this.model_name+'/setToShow')
			}
		},
		search() {
			this.results = []
			this.$store.commit(this.model_name+'/setLoading', true)
			setTimeout(() => {
				this.properties_to_filter.forEach(prop => {
					let coincidences = this.models.filter(model => {
						if (model[prop.key]) {
							let value
							if (this.isRelationKey(prop)) {
								let relation_name = this.modelNameFromRelationKey(prop, false, false)
								value = model[relation_name].name
							} else {
								value = model[prop.key]
							}
							console.log('value para '+prop.text)
							console.log(value)
							value = ''+value
							value = value.toLowerCase()
							return value.includes(this.query.toLowerCase())
						}
						return false
					})
					coincidences = coincidences.filter(model => {
						let index = this.results.findIndex(result => {
							return result.id == model.id 
						})
						return index == -1
					})
					this.results = this.results.concat(coincidences)
					// console.log('filtrando por '+prop.text+' hubo '+coincidences.length+' coincidencias')
					// results = results.concat(coincidences)
					// console.log('results tiene ahora '+results.length+' elementos')
				})
				this.$store.commit(this.model_name+'/setToShow', this.results)
				this.$store.commit(this.model_name+'/setLoading', false)
			}, 200)
		}
	}
}
</script>