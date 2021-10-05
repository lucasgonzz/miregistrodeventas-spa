<template>
	<b-form-row
	v-if="hasOnline()">
		<b-col>
			<b-form-group
			v-for="(description, index) in article.descriptions"
			:key="index"
			label="Descripcion">
				<b-form-input
				class="m-b-15"
				v-model="description.title"
				placeholder="Titulo">
				</b-form-input>
				<b-form-textarea
				v-model="description.content"
				placeholder="Descripcion para el articulo">
				</b-form-textarea>
			</b-form-group>
			<b-form-group
			v-if="check()"
			class="j-start">
				<b-button
				size="sm"
				variant="primary"
				@click="addDescription">
					<i class="icon-plus"></i>
					Agregar descripcion
				</b-button>
			</b-form-group>
		</b-col>
	</b-form-row>
</template>
<script>
import edit_articles from '@/mixins/edit_articles'
export default {
	props: ['article'],
	mixins: [edit_articles],
	methods: {
		addDescription() {
			if (this.check()) {
				this.article.descriptions.push({
					title: '',
					content: '',
				})
			}
		},
		check() {
			return this.article.descriptions[this.article.descriptions.length-1].content && this.article.descriptions[this.article.descriptions.length-1].content.length
		}
	},
}
</script>
