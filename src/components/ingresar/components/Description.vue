<template>
	<b-form-row>
		<b-col>
			<b-form-group
			class="col-autocomplete"
			label="Etiquetas">
				<b-form-textarea
				placeholder="Descripcion para el articulo"
				v-model="article.description">
				</b-form-textarea>
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
	},
}
</script>
<style lang="sass">
.tag 
	color: #FFF
	border-radius: 50px
	padding: .3em 1em
	margin: 0 .5em
	.btn-remove
		padding-left: .5em
		cursor: pointer
</style>
