<template>
	<b-form-row>
		<b-col>
			<b-form-group
			label="Nombre"
			label-for="article-name">
				<b-form-input
				type="text"
				id="article-name"
				@keyup.enter="changeToCost"
				@keyup="setPossiblesArticles"
				placeholder="Ingresa el nombre del producto"
				autocomplete="off"
				v-model="article.name"></b-form-input>
			</b-form-group>
		</b-col>
	</b-form-row>
</template>
<script>
export default {
	props: ['article'],
	data() {
		return {
			possible_articles: [],
			possible_artice_focus_id: -1,
			searching_possibles_names: false,
		}
	},
	methods: {
		changeToCost() {
			this.possible_articles = []
			// $('#cost').focus()
		},
		changePossibleArticleDown(article) {
			// var input_id = ''
			var article_down
			if (article == -1) {
				article_down = this.possible_articles[0]
				// input_id = '#input-possible-article-' + article_down.id
				this.possible_artice_focus_id = article_down.id
			} else {
				var index = this.possible_articles.indexOf(article)
				if (index < this.possible_articles.length - 1) {
					// var article_down_index = index + 1
					article_down = this.possible_articles[index + 1] 
					// input_id = '#input-possible-article-' + article_down.id
					this.possible_artice_focus_id = article_down.id
				} else {
					this.possible_artice_focus_id = -1
				}
			}
		},
		changePossibleArticleUp(article) {
			if (article == -1) {
				var article_up = this.possible_articles[this.possible_articles.length-1]
				// var input_id = '#input-possible-article-' + article_up.id
				this.possible_artice_focus_id = article_up.id
			} else {
				var index = this.possible_articles.indexOf(article)
				if (index > 0) {
					// var input_id = '#input-possible-article-' + article_up.id
					this.possible_artice_focus_id = this.possible_articles[index - 1].id
				} else {
					this.possible_artice_focus_id = -1
				}
			}
		},
		setPossiblesArticles() {
			var codigo = event.which || event.keyCode
			if (codigo != 40 && codigo != 38 && codigo != 37 && codigo != 39 && codigo != 13) {
				if (this.article.bar_code == '') {
					this.possible_articles = []
					if (this.article.bar_code.length == 0 && this.article.name.length >= 2) {
						this.searching_possibles_names = true
						// El 1 hace referencia a que busque solo los articulos sin codigo de barras
						// El otro 1 a que busque con sus proveedores
						this.$api.get('articles/pre-search/'+this.article.name+'/1/1')
						.then(res => {
							this.possible_artice_focus_id = -1
							this.searching_possibles_names = false
							if (res.data.length > 0) {
								this.possible_articles = res.data
							}
						})
						.catch(err => {
							console.log(err)
						})
					}
				}
			}
		},
		selectPossibleArticle(article) {
			this.$emit('setArticle', article)
			this.possible_articles = []
			// $('#edit-article').modal('show')
		},

	},
}
</script>

