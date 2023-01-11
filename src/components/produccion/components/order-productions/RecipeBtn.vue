<template>
	<b-button
	class="m-l-15"
	@click="showRecipe"
	variant="primary">
		Receta
	</b-button>
</template>
<script>
import display from '@/mixins/display'
export default {
	mixins: [display],
	props: {
		model: Object,
	},
	methods: {
		showRecipe() {
			console.log('acaaaaa---')
			console.log(this.model)

			let props = [
				{
					key: 'article_id',
					value: this.model.id	
				},
				{
					key: 'article',
					value: {
						...this.model,
						recipe: null
					} 
				},
			]
			this.setModel(this.model.recipe, 'recipe', null, props)
			setTimeout(() => {
				document.getElementById('recipe-articles').value = ''
			}, 500)
		}
	}
}
</script>