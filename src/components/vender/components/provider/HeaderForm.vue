<template>
<div class="form-row">	
	<div class="col-5" data-step="1" data-intro="Marque el codigo de barras del artículo para agregarlo a la nueva venta.">	
		<div class="input-group mb-2 mr-sm-2">
			<div class="input-group-prepend d-none d-md-block">
			  	<div class="input-group-text">
			  		Codigo de barras
			  	</div>
			</div>
			<input type="text" 
					v-model="article.bar_code"
					id="article-bar-code"
					class="form-control" 
					placeholder="Escaneé el codigo de barras"
					@keyup.enter="changeToCantidad">
		</div>
	</div>	
	<div class="col-5" data-step="2" data-intro="Busque un artículo por su nombre y seleccionelo entre las opciones que apareceran debajo." data-position="left">	
		<buscador model="articles" placeholder="Nombre del artículo" @selectPossibleResult="selectPossibleResult"></buscador>
		
	</div>
	<div class="col-2">	
		<div class="input-group mb-2 mr-sm-2">
			<div class="input-group-prepend">
			  	<div class="input-group-text">
					<span v-show="loading_cantidad"
							class="spinner-border spinner-border-sm m-r-5" role="status" aria-hidden="true"></span>
			  		Cantidad
			  	</div>
			</div>
			<input type="number" 
					v-model="article.amount"
					@keyup.enter="addArticle"
					id="cantidad"
					min="1"
					class="form-control" >
		</div>
	</div>
</div>
</template>
<script>
import Buscador from '../../../common/Buscador.vue'
export default {
	props: ['article', 'loading_cantidad'],
	components: {
		Buscador,
	},
	data() {
		return {
			possible_articles: [],
			loading_possible_articles: false,
			possible_artice_focus_id: -1,
			possible_article_selected: false,
		}
	},
	methods: {
		addArticle() {
			let input_focus = '#result-name'
			if (this.article.bar_code != '') {
				input_focus = '#article-bar-code'
			}
			this.$emit('addArticle', input_focus)
		},
		selectPossibleResult(result) {
			if (result.bar_code === null) {
				this.article.bar_code = ''
				this.article.name = result.name
			} else {
				this.article.bar_code = result.bar_code
				this.article.name = ''
			}
			$('#cantidad').focus()
		},

		/*
		|----------------------------------------------------------------
		| Cambiar a cantidad
		|----------------------------------------------------------------
		|
		|	* Cambia al campo a cantidad verificando que los datos	
		|
		*/
		changeToCantidad() {
			$('#cantidad').focus()
		},
		changeToCantidadFromName() {
			var disponible = false
			this.available_articles.forEach(article => {
				if (article.name == this.article.name) {
					if (article.uncontable == 0) {
						$('#cantidad').focus()
						disponible = true
					} else {
						this.addArticle()
						disponible = true
					}
				}
			})
			if (!disponible) {
				$('#article-not-register').modal('show')
				this.article.name = ''
			}
		},
		changeToCantidadFromBarCode() {
			var disponible = false
			this.available_articles.forEach(article => {
				if (article.bar_code == this.article.bar_code) {
					if (article.uncontable == 0) {
						$('#cantidad').focus()
						disponible = true
					} else {
						this.addArticle()
						disponible = true
					}
				}
			})

			if (!disponible) {
				$('#article-not-register').modal('show')
				this.article.bar_code = ''
			}
		},
	},
}
</script>
<style scoped>
</style>