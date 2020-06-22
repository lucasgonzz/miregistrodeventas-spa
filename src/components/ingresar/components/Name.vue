<template>
	<div class="form-group">
		<!-- Clase buscador para que tenga posicion relativa 
				y el cuadro con los posibles articulos se
				posicione correctamente-->
		<div class="buscador" data-step="5" data-intro="Aca va el nombre con el que quieras guardar el articulo, si el articulo no tiene un codigo de barras vas a ver las coincidencias entre tus articulos que tampoco tengan uno para que en el caso de ya haberlo ingresado lo selecciones para actualizar sus datos. Precione ENTER para cambiar al siguiente campo.">
			<label for="name">Nombre</label>
			<div class="input-group mb-2 mr-sm-2">
				<input type="text" 
						@keyup.enter="changeToCost"
						@keyup="setPossiblesArticles"
						@keyup.down="changePossibleArticleDown(-1)"
						@keyup.up="changePossibleArticleUp(-1)"
						required 
						autocomplete="off" 
						class="form-control focus-red" 
						placeholder="Ingrese el nombre"
						id="name"
						v-model="article.name">
			</div>
			<div class="results m-t-10">
				<ul class="list-group" v-show="article.name.length >= 2">
					<li v-show="!searching_possibles_names && possible_articles.length" 
						class="list-group-item active p-t-5 p-b-5">
						Selecciona tu artículo si aparece en esta lista
					</li>
					<li v-show="!searching_possibles_names && possible_articles.length" 
						v-for="possible_article in possible_articles"
						class="list-group-item p-0 c-p" 
						@click="selectPossibleArticle(possible_article)">
						<input type="text" 
								class="form-control form-control-li" 
								:class="possible_artice_focus_id == possible_article.id ? 'buscador-active' : ''"
								v-model="possible_article.name"
								readonly
								@keyup.enter="selectPossibleArticle(possible_article)"
								@keyup.down="changePossibleArticleDown(possible_article)"
								@keyup.up="changePossibleArticleUp(possible_article)"
								:id="'input-possible-article-'+possible_article.id">
						<p v-if="!isProvider(user)"
							class="m-0 text-right p-r-10 p-b-5"
							:class="possible_artice_focus_id == possible_article.id ? 'buscador-p-active' : ''">
							ult proveedor: {{ possible_article.providers[possible_article.providers.length - 1].name }}
							&nbsp;
							costo: {{ price(possible_article.cost) }}
							&nbsp;
							precio: {{ price(possible_article.price) }}
						</p>
					</li>
					<li v-show="searching_possibles_names"
						class="list-group-item justify-center p-30">
				  		<span class="spinner-border text-primary"></span>
					</li>
				</ul>
			</div>
		</div>		
	</div>
</template>
<script>
export default {
	props: ['article', 'user'],
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
			$('#cost').focus()
		},
		changePossibleArticleDown(article) {
			if (article == -1) {
				var article_down = this.possible_articles[0]
				var input_id = '#input-possible-article-' + article_down.id
				this.possible_artice_focus_id = article_down.id
				$(input_id).focus()
			} else {
				var index = this.possible_articles.indexOf(article)
				var possible_articles_length = this.possible_articles.length - 1
				if (index < possible_articles_length) {
					var article_down_index = index + 1
					var article_down = this.possible_articles[index + 1]
					var input_id = '#input-possible-article-' + article_down.id
					this.possible_artice_focus_id = article_down.id
					$(input_id).focus()
				} else {
					this.possible_artice_focus_id = -1
					$('#name').focus()
				}
			}
		},
		changePossibleArticleUp(article) {
			if (article == -1) {
				var article_up = this.possible_articles[this.possible_articles.length-1]
				var input_id = '#input-possible-article-' + article_up.id
				this.possible_artice_focus_id = article_up.id
				$(input_id).focus()
			} else {
				var index = this.possible_articles.indexOf(article)
				var possible_articles_length = this.possible_articles.length - 1
				if (index > 0) {
					var article_up_index = index - 1
					var article_up = this.possible_articles[index - 1]
					var input_id = '#input-possible-article-' + article_up.id
					this.possible_artice_focus_id = article_up.id
					$(input_id).focus()
				} else {
					this.possible_artice_focus_id = -1
					$('#name').focus()
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
						axios.get('articles/pre-search/'+this.article.name+'/1/1')
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
			$('#edit-article').modal('show')
		},

	},
}
</script>

