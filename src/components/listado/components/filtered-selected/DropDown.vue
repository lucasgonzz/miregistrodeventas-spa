<template>
	<b-dropdown
	class="selected-drop-down"
	right
	variant="primary"
	v-show="show"
	:text="text">
		<b-dropdown-item
		@click="ticketsPdf">
			<i class="icon-print"></i>
			Tickets
		</b-dropdown-item>
		<b-dropdown-item
		@click="updateProps">
			<i class="icon-redo"></i>
			Actualizar propiedades
		</b-dropdown-item>
		<b-dropdown-item
		v-if="can('article.delete')"
		@click="deleteArticles">
			<i class="icon-trash"></i>
			Eliminar
		</b-dropdown-item>
	</b-dropdown>
</template>
<script>
import selected_articles from '@/mixins/selected_articles'
export default {
	mixins: [selected_articles],
	props: {
		from_filter: {
			type: Boolean,
			default: false
		},
	},
	computed: {
		show() {
			if (this.from_filter) {
				return this.filtered.length
			}
			return this.selected_articles.length
		},
		text() {
			if (this.from_filter) {
				return this.filtered.length+' artículos filtrados'
			}
			return this.selected_articles.length+' artículos seleccionados'
		},
		filtered() {
			return this.$store.state.article.filtered
		},
	},
	methods: {
		ticketsPdf() {
			console.log(this.selected_articles_id)
			let link = process.env.VUE_APP_API_URL+'/api/articles/pdf/'+this.selected_articles_id.join('-')
			window.open(link)
		},
		updateProps() {
			this.$store.commit('article/setFromFilter', this.from_filter)
			this.$bvModal.show('update-article-props')
		},
		deleteArticles() {
			this.$store.commit('articles/setFromFilter', this.from_filter)
			this.$bvModal.show('delete-articles')
		}
	}
}
</script>
<style lang="sass">
.selected-drop-down
	@media screen and (max-width: 768px)
		width: 100%
		margin: 0 !important
</style>