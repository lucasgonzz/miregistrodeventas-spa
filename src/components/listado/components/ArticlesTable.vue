<template>
<div>
	<div class="row" v-if="!is_loading && user && articles.length">
		<div class="col al-borde">
			<div class="table-responsive" v-if="articles.length">						
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
									{{ special_price.name }}
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
						v-for="(article, i) in articles"
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
								<vue-load-image>
									<div slot="image" :data-src="imageUrl(article, user)"></div>
									<img slot="preloader" src="@/assets/spinner.gif" />
									<div slot="error">Error al cargar la imagen</div>
								</vue-load-image>
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
							<td>{{ article.name }} {{ article.id }} | {{ i }}</td>

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
								v-for="special_price in special_prices"
								:key="special_price.id">
									{{ getSpecialPrice(article, special_price) }}
								</td>
							</template>
							<td class="td-stock d-none d-md-table-cell">
								{{ stock(article) }}
							</td>
							<td v-if="!isProvider(user)" class="d-none d-md-table-cell">
								<b-dropdown text="Proveedores"
								v-intro-step="6"
								v-intro-position="'left'"
								v-intro="'Mira los proveedores de un producto, los costos y precios que se pagaron en cada fecha'">
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
							<!-- Opciones -->
							<td class="td-options">
								<!-- Editar -->
								<b-button 
								variant="primary"
								v-intro-step="7"
								v-intro-position="'left'"
								v-intro="'Actualiza los datos de un producto'"
								size="sm"
								@click="editArticle(article)" 
								class="btn-listado btn-listado-edit">
									<i class="icon-edit"></i>
								</b-button>

								<!-- Marcaodres -->
								<!-- <button class="btn btn-sm"
								v-intro-step="8"
								v-intro-position="'left'"
								v-intro="'Crea un marcador de tu producto para un rapido acceso en la seccion VENDER'"
								:class="article.marker ? 'btn-warning' : 'btn-primary'"
								@click="showAddMarker(article)">
									<i class="icon-star-1"></i>
								</button> -->
								
								<b-button
								@click="setFeatured(article)"
								v-if="user.online"
								:variant="isFeatured(article)"
								size="sm">
									<span 
									class="spinner-border spinner-border-sm" 
									v-show="loading_featured == article.id"></span>
									<i 
									v-show="loading_featured != article.id"
									class="icon-check"></i>
								</b-button>
							</td>
						</tr>
						<infinite-loading 
						spinner="spiral"
						@infinite="infiniteHandler">
							<div slot="no-more" class="not-results">
								<!-- No hay mas artículos -->
							</div>
							<div slot="no-results">
							</div>
						</infinite-loading>
					</tbody>
				</table>
			</div>
			<p v-else 
			class="text-center">
				<span
				v-if="is_filter">
					No hay coincidencias				
				</span>
				<span
				v-else>
					Todavia no has ingresado ningun producto
				</span>
			</p>
		</div>
	</div>
	<b-row v-else>
		<b-col>
			<b-skeleton-table
			:rows="10"
			:columns="7"
			:table-props="{ bordered: true, striped: true }"
			></b-skeleton-table>
		</b-col>
	</b-row>
</div>
</template>
<script>
import VueLoadImage from 'vue-load-image'
import InfiniteLoading from 'vue-infinite-loading'
export default {
	props: ['is_filter', 'article', 'selected_articles', 'pagination', 'user', 'special_prices'],
	components: {
		InfiniteLoading,
		VueLoadImage,
	},
	data() {
		return {
			loading_select_all_articles: false,
			loading_featured: 0,
			// asset: document.querySelector('meta[name="asset"]').content
		}
	},
	computed: {
		is_loading() {
			return this.$store.state.articles.loading
		},
		articles() {
			return this.$store.state.articles.articles_listado
		},
		current_page() {
			return this.$store.state.articles.current_page
		}
	},
	methods: {
		infiniteHandler($state) {
			let max_length = this.$store.state.articles.articles.length
			console.log('max_length '+max_length)
			console.log('page '+this.$store.state.articles.current_page)
			if (this.articles.length >= 10 && this.articles.length < max_length) {
				console.log('entrado')
				setTimeout(() => {
					this.$store.dispatch('articles/setArticlesListado')
					$state.loaded()
					console.log('ahora hay '+this.articles.length)
				}, 3000)
			} else {
				console.log('acabados')
				$state.complete()
			}
		},
		isFeatured(article) {
			if (article.featured === null) {
				return 'outline-success'
			} 
			return 'success'
		},
		setFeatured(article) {
			this.loading_featured = article.id
			this.$api.get(`/articles/set-featured/${article.id}`)
			.then(res => {
				if (article.featured === null) {
					this.$toast.success('Se agrego a destacados correctamente')
				} else {
					this.$toast.success('Se quito de destacados correctamente')
				}
				this.loading_featured = 0
				this.$emit('updateArticlesList')
				console.log(res)
			})
			.catch(err => {
				this.loading_featured = 0
				console.log(err)
			})
		},
		barCode(article) {
			if (article.bar_code) {
				return article.bar_code
			} else {
				return '-'
			}
		},
		category(article) {
			if (article.category) {
				return article.category.name
			} else {
				return '-'
			}
		},
		getSpecialPrice(article, special_price_) {
			if (article.special_prices && article.special_prices.length) {
				let s_price = 0
				article.special_prices.forEach(special_price => {
					if (special_price.pivot.special_price_id == special_price_.id && special_price.pivot.price) {
						s_price = special_price
					}
				})
				if (s_price != 0) {
					return this.price(s_price.pivot.price)
				} else {
					return '-'
				}
			} else {
				return '-'
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
				return '-'
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
.table-responsive {
	max-height: 65vh;
}
.table-responsive::-webkit-scrollbar  {
	display: none;
}
.infinite-loading-container {
	width: 100%; 
	height: 30px;
}
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
	min-width: 170px;
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