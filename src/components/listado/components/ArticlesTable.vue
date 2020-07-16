<template>
<div class="row" v-show="!is_loading && user">
	<div class="col col-sm-al-borde">
		<div class="table-responsive">						
			<table class="table table-striped text-center">
				<thead class="thead-dark">
					<tr>
						<th scope="col" class="td-checkbox">
							<div class="custom-control custom-checkbox">
								<input class="custom-control-input" 
								v-model="selected_articles.is_all_selected" 
								@change="selectAllArticles"
								type="checkbox" 
								id="is-all-selected">
								<label class="custom-control-label c-p" 
								for="is-all-selected">
								</label>
								<span v-show="loading_select_all_articles" 
								class="spinner-border spinner-border-sm text-primary"></span>
							</div>
						</th>
						<th scope="col">Foto</th>
						<th scope="col" class="d-none d-md-table-cell">Codigo</th>
						<th scope="col">Nombre</th>

						<th scope="col" v-show="hasPermissionTo('article.index.cost', user)">
							Costo
						</th>
						<th scope="col">Precio</th>
						<template v-if="special_prices.length">
							<th scope="col" 
							v-for="special_price in special_prices"
							:key="special_price.id">
								Precio {{ special_price.name }}
							</th>
						</template>
						<th scope="col" class="td-stock d-none d-md-table-cell">Stock</th>
						<th scope="col" class="d-none d-md-table-cell" v-if="!isProvider(user)">Proveedor/es</th>
						<th scope="col" class="d-none d-md-table-cell">Categoria</th>
						<th scope="col">Opciones</th>
					</tr>
				</thead>
				<tbody class="vender-table table-hover"> 
					<tr 
					v-for="article in articles"
					:key="article.id"
					:class="selected_articles.selected_articles.includes(article.id) ? 'bg-warning' : ''">
						<td class="td-checkbox">
							<i v-show="article.online == 1 && canUse('online', user)"
							class="icon-network text-primary"></i>
							<div class="custom-control custom-checkbox">
								<input class="custom-control-input" 
								v-model="selected_articles.selected_articles" 
								:value="article.id"
								type="checkbox" 
								:id="article.id">
								<label class="custom-control-label c-p" 
								:for="article.id">
								</label>
							</div>
						</td>
						<td v-if="article.images.length">
							<img :src="imageUrl(article, user)" :alt="article.name"
								@click="addImage(article)" 
								class="c-p">
						</td>
						<td v-else>
							<button class="btn btn-primary btn-sm"
									@click="addImage(article)">
								<i class="icon-camera"></i>
								<i class="icon-plus"></i>
							</button>
						</td>
						<td class="d-none d-md-table-cell">
							{{ barCode(article) }}
						</td>
						<td>{{ article.name }}</td>

						<!-- Se fija si el usuario tiene
							permiso para ver los costos -->
						<td v-if="hasPermissionTo('article.index.cost', user)">
							{{ price(article.cost) }}
						</td>

						<td class="td-price">
							<strong>
								{{ price(article.price) }}
							</strong>
							<span v-show="article.uncontable == 1">
								el  {{ article.measurement }}
							</span>
						</td> 
						<template v-if="special_prices.length">
							<td
							v-for="(special_price, index) in special_prices"
							:key="special_price.id">
								<span v-if="article.special_prices[index]">
									{{ article.special_prices[index].pivot.price }}
								</span>
								<span v-else>
									No tiene
								</span>
							</td>
						</template>
						<td class="td-stock d-none d-md-table-cell">
							{{ stock(article) }}
						</td>
						<td v-if="!isProvider(user)" class="d-none d-md-table-cell">
							<b-dropdown text="Proveedores">
								<b-dropdown-item
								v-for="provider in article.providers_not_repeated"
								:key="provider.id">
									{{ provider.name }}
								</b-dropdown-item>
								<b-dropdown-item
								@click="providersHistory(article)">
									<i class="icon-eye"></i>
									Historial
								</b-dropdown-item>
							</b-dropdown>
						</td>
						<td class="d-none d-md-table-cell">
							{{ category(article) }}
						</td>
						<td class="td-options">
							<!-- Editar -->
							<b-button 
							variant="primary"
							size="sm"
							@click="editArticle(article)" 
							class="btn-listado btn-listado-edit">
								<i class="icon-edit"></i>
							</b-button>

							<!-- Marcaodres -->
							<button class="btn btn-sm"
									:class="article.marker ? 'btn-warning' : 'btn-primary'"
									data-position="left"
									data-step="5"
									data-intro="Cree un marcador del artículo para un rapido acceso desde la seccion de ventas."
									@click="showAddMarker(article)">
								<i class="icon-star-1"></i>
							</button>

							<!-- Borrar oferta -->
							<button @click="deleteOffer(article)"
								v-show="article.offer_price"
								class="btn btn-danger btn-sm">
								<i class="icon-sale-ticket"></i>
								<i class="icon-cancel"></i>
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
</template>
<script>
export default {
	props: ['is_loading', 'articles', 'article', 'selected_articles', 'pagination', 'user', 'special_prices'],
	data() {
		return {
			loading_select_all_articles: false,
			// asset: document.querySelector('meta[name="asset"]').content
		}
	},
	methods: {
		barCode(article) {
			if (article.bar_code) {
				return article.bar_code
			} else {
				return 'No tiene'
			}
		},
		category(article) {
			if (article.category) {
				return article.category.name
			} else {
				return 'No tiene'
			}
		},
		stock(article) {
			if (article.stock) {
				if (article.uncontable == 0) {
					return article.stock.replace('.00', '')
				} else {
					let measurement = article.measurement
					if (article.stock != '1') {
						measurement = measurement + 's'
					}
					return article.stock + ' ' + measurement
				}
			} else {
				return 'No tiene'
			}
		},
		showAddMarker(article) {
			this.$emit('setArticle', article)
			if (article.marker) {
				this.$bvModal.show('is-marker')
			} else {
				this.$bvModal.show('add-marker')
			}
		},
		providersHistory(article) {
			this.$emit('providersHistory', article)
		},

		/* -----------------------------------------------------------------------------------
			* Setea las propiedades del articulos con las del articulo pasado por parametro
		----------------------------------------------------------------------------------- */
		editArticle(article) {
			this.$emit('setArticle', article)
			this.$bvModal.show('edit-article')
		},
		/* --------------------------------------------------------------------------
			* Es llamado por la casilla de marcar todos los articulos
			* Si esta activada agregar todos los id de los articulos de la pagina actual
			a los id de los articulos seleccionados
		-------------------------------------------------------------------------- */
		selectAllArticles() {
			if (this.selected_articles.is_all_selected) {
				for (var i = this.selected_articles.articles_id.length - 1; i >= 0; i--) {
					if (!this.selected_articles.selected_articles.includes(this.selected_articles.articles_id[i])) {
						this.selected_articles.selected_articles.push(this.selected_articles.articles_id[i])
					}
				}
				this.selected_articles.selected_pages.push(this.pagination.current_page)
			} else {
				this.selected_articles.articles_id.forEach(article_id => {
					var index = this.selected_articles.selected_articles.indexOf(article_id)
					this.selected_articles.selected_articles.splice(index, 1)
				})
				var index = this.selected_articles.selected_pages.indexOf(this.pagination.current_page)
				this.selected_articles.selected_pages.splice(index, 1)
			}
		},
		showImage(article) {
			this.$emit('showImage', article)
		},
		addImage(article) {
			this.$emit('addImage', article)
		}
	},
}
</script>
<style scoped>
.spinner-border-sm.text-primary {
	position: absolute;
	top: 4px;
}
img {
	width: 64px;
}
.td-checkbox {
	position: relative;
}
.icon-network {
	position: absolute;
	right: -5px;
	top: 0px;
	z-index: 500;
	font-size: 1.5em;
}
.td-options {
	position: relative;
	min-width: 130px;
}
.td-options .btn {
	/*display: inline-block;*/
	margin: 0 .3rem;
}
.badge {
	position: absolute;
	top: 5px;
	right: -15px;
	z-index: 500;
}
</style>