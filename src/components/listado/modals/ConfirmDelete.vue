<template>
<b-modal id="delete-articles" hide-footer hide-header size="sm">
	<b-container>
		<b-row>
			<b-col>
				<p
				class="text-center">¿Seguro que quiere eliminar los articulos seleccionados?</p>
				<b-button
				class="m-b-0"
				block
				@click="deleteArticles"
				variant="danger">
					<btn-loader
					text="Eliminar"
					:loader="loading"></btn-loader>
				</b-button>
			</b-col>
		</b-row>
	</b-container>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	name: 'DeleteArticles',
	components: {
		BtnLoader
	},
	data() {
		return {
			loading: false
		}
	},
	computed: {
		article() {
			return this.$store.state.articles.article_to_delete
		},
        selected_articles() {
            return this.$store.state.articles.selected_articles
        },
	},
	methods: {
		deleteArticles() {
			this.loading = true
			let articles_id = []
			this.selected_articles.forEach(selected_article => {
				articles_id.push(selected_article.id)
			})
			this.$api.delete('/articles/'+articles_id.join('-'))
			.then(() => {
				this.loading = false
				this.$store.commit('articles/delete')
				this.$bvModal.hide('delete-articles')
				this.$toast.success('Articulo eliminado')
			})
			.catch((err) => {
				this.loading = false
				console.log(err)
			})
		},
	}
}
</script>