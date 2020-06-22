<template>
<div id="ingresar">
	<take-photo :start_video="start_video"></take-photo>
	<categories :categories="categories"
				@getCategories="getCategories"
				:article="article"></categories>
	<providers :providers="providers"
				:saving_provider="saving_provider"
				:deleting_provider="deleting_provider"
				@deleteProvider="deleteProvider" 
				@saveProvider="saveProvider"></providers>
	<edit-article
				:providers="providers"
				:categories="categories"
				:user="user"
				:article="article"
				:actualizando="actualizando"
				@clearArticle="clearArticle"
				@updateArticle="updateArticle"></edit-article>
	<porcentage-for-price @setPorcentageForPrice="setPorcentageForPrice"></porcentage-for-price>
	<print-tickets :articles="articles"
					:articles_id="articles_id_to_print"></print-tickets>
	<bar-codes :article="article"></bar-codes>
	<div class="row justify-content-center">
		<div class="col-lg-7 col-mobile">	
			<div class="card">
				<div class="card-header">
					<h5 class="m-0 d-inline-block">
						<strong>
							Ingresar un nuevo artículo
						</strong>
					</h5>
					<!-- <button class="btn btn-secondary btn-sm float-right"
							@click="showIntro">
						Ayuda
					</button> -->
				</div>
				<div class="card-body">
					<h6 class="h6">
						<strong>Complete con los datos del artículo que quiera ingresar</strong>
					</h6>
	
					<uncontable-date :article="article"
								:user="user"></uncontable-date>
					
					<bar-code-image :article="article"
							:user="user"
							@showCamera="showCamera"
							@setFile="setFile"
							@isRegister="isRegister"></bar-code-image>

					<name :article="article"
						:user="user"
						:categories="categories"
						@setArticle="setArticle"></name>
	
					<cost-price :article="article"
								:user="user"
								:porcentage_for_price="porcentage_for_price"></cost-price>

					<stock-provider :article="article"
									:user="user"
									:providers="providers"
									:categories="categories"
									@saveArticle="saveArticle"></stock-provider>

					<!-- <date-created-at :article="article"></date-created-at> -->
				</div> 
				<div class="card-footer p-0">
					<card-footer :articles_id_to_print="articles_id_to_print"
								:user="user"
								:loading_previus="loading_previus"
								:guardando="guardando"
								@previus="previus"
								@saveArticle="saveArticle"></card-footer>
				</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
// Modals
import Providers from '../components/ingresar/modals/Providers.vue'
import Categories from '../components/ingresar/modals/Categories.vue'
import PorcentageForPrice from '../components/ingresar/modals/PorcentageForPrice.vue'
import EditArticle from '../components/common/EditArticle.vue'
import PrintTickets from '../components/ingresar/modals/PrintTickets.vue'
import BarCodes from '../components/ingresar/modals/BarCodes.vue'
import TakePhoto from '../components/ingresar/modals/TakePhoto.vue'

// Components
import UncontableDate from '../components/ingresar/components/UncontableDate.vue'
import BarCodeImage from '../components/ingresar/components/BarCodeImage.vue'
import Name from '../components/ingresar/components/Name.vue'
import CostPrice from '../components/ingresar/components/CostPrice.vue'
import StockProvider from '../components/ingresar/components/StockProvider.vue'
import CardFooter from '../components/ingresar/components/CardFooter.vue'
export default {
	components: {
		PorcentageForPrice,
		Providers,
		Categories,
		EditArticle,
		PrintTickets,
		BarCodes,
		TakePhoto,

		UncontableDate,
		BarCodeImage,
		Name,
		CostPrice,
		StockProvider,
		CardFooter,
	},
	data() {
		return {
			article: {
				uncontable: 0,
				online: false,
				bar_code: '',
				category_id: 0,
				new_bar_code: '',
				name: '',
				cost: '',
				price: '',
				online_price: '',
				measurement: 'kilo',
				stock: '',
				new_stock: 0,
				stock_null: false,
				provider: 0,
				act_fecha: true,
				created_at: new Date().toISOString().slice(0,10),
			},
			file: null,
			start_video: false,

			// Spinners
			guardando: false,
			actualizando: false,

			articles: [],
			articles_id_to_print: [],
			porcentage_for_price: 0,
			
			// Provedores
			providers: [],
			saving_provider: false,
			deleting_provider: 0,

			// Categorias
			categories: [],
			saving_categorie: false,

			bar_codes: [],
			// names: [],
			available_articles: [],
			generated_bar_codes: [],

			// Previus articles
			previus_next: 0,
			loading_previus: false,
			loading_next: false,

			// User
			user: {},
		}
	},
	// created() {
	// 	this.getUser()
	// 	this.getAvailableArticles()
	// 	this.getBarCodes()
	// 	// this.getNames()
	// 	this.getGeneratedBarCodes()
	// 	if (!this.isProvider(this.user)) {
	// 		this.getProviders()
	// 	}
	// 	this.getCategories()
	// },
	methods: {
		showIntro() {
			// this.$introJs().setOption('showProgress', true).setOption('hidePrev', true).setOption('hideNext', true).start()
		},
		changeToName() {
			this.$jQuery('#name').focus()
		},
		changeToDate() {
			this.$jQuery('#created_at').focus()
		},
		getAvailableArticles() {
			this.$api.get('articles/availables')
			.then(res => {
				this.available_articles = res.data
			})
			.catch(err => {
				this.getAvailableArticles()
				console.log(err)
			})
		},

		setPorcentageForPrice(porcentage) {
			this.porcentage_for_price = porcentage
			this.$jQuery('#porcentage-for-price').modal('hide')
		},

		// Codigos de barra
		getBarCodes() {
			this.$api.get('articles/bar-codes')
			.then( res => {
				this.bar_codes = res.data
			})
			.catch( err => {
				console.log(err)
			})
		},
		getGeneratedBarCodes() {
			this.$api.get('bar-codes/generated')
			.then( res => {
				this.generated_bar_codes = res.data
			})
			.catch( err => {
				console.log(err)
			})
		},
		isRegister() {
			// Controla que el codigo no este registrado con otro articulo
			if (this.bar_codes.includes(this.article.bar_code)) {
				this.$api.get('articles/get-by-bar-code/'+this.article.bar_code)
				.then( res => {
					this.setArticle(res.data)
					this.$jQuery('#edit-article').modal('show')
				})
				.catch( err => {
					console.log(err)
				})
			} else {
				// Controla que el codigo haya sido creado por nosotros
				var codigo_ya_creado = false
				this.generated_bar_codes.forEach(bar_code => {
					if (bar_code.name == this.article.bar_code) {
						codigo_ya_creado = true
						this.$toastr.success('Codigo generado por usted, se completo la cantidad')
						this.article.stock = bar_code.amount
						this.$jQuery('#name').focus()
					}
				})

				// Si no esta registrado y no es un codigo creado por nosotros
				// se pasa al campo del nombre
				if (!codigo_ya_creado) {
					this.$jQuery('#name').focus()
				}
			}
		},
		showCamera() {
			this.$jQuery('#take-photo').modal('show')
			this.start_video = true
		},
		setFile(file) {
			this.file = file
			this.$jQuery('#name').focus()
		},

		validate() {
			var ok = true
			if (this.article.price == '') {
				ok = false
				this.$toastr.error('El campo precio es obligatorio')
				this.$jQuery('#price').focus()
			}
			if (this.article.cost == '') {
				ok = false
				this.$toastr.error('El campo costo es obligatorio')
				this.$jQuery('#cost').focus()
			}
			if (this.article.name == '') {
				ok = false
				this.$toastr.error('El campo nombre es obligatorio')
				this.$jQuery('#name').focus()
			}

			// Controla que le codigo de barras no este registrado
			if (this.bar_codes.includes(this.article.bar_code)) {
				ok = false
				this.$toastr.error('Ya hay un artículo con este codigo de barras')
			}

			// Controla que si no tiene codigo de barras no haya otro
			// articulo sin codigo de barras con el mismo nombre
			if (this.article.bar_code == '') {
				if (this.available_articles.length) {
					this.available_articles.forEach(article => {
						if (article.name.toLowerCase() == this.article.name.toLowerCase() && ok) {
							if (article.bar_code === null) {
								ok = false
								this.$toastr.error('Ya hay un articulo con ese nombre y sin un codigo de barras, cambie el nombre o asignele un codigo de barras');
							}
						}
					})
				}
			}
			return ok
		},

		// Articles
		saveArticle() {
			var ok = true
			if ( ok ) {
				this.guardando = true
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                    }
                }

                let formData = new FormData()
                // ------------------------------------
                formData.append('file', this.file)
                // ------------------------------------
                formData.append('uncontable', this.article.uncontable)
                formData.append('online', this.article.online)
                formData.append('created_at', this.article.created_at)
                formData.append('bar_code', this.article.bar_code)
                formData.append('name', this.article.name)
                formData.append('cost', this.article.cost)
                formData.append('price', this.article.price)
                formData.append('online_price', this.article.online_price)
                formData.append('measurement', this.article.measurement)
                formData.append('stock', this.article.stock)
                formData.append('provider', this.article.provider)
                formData.append('category_id', this.article.category_id)

				this.$api.post('articles', formData, config)
				.then( res => {
					console.log(res.data)
					this.guardando = false
					var article = res.data
					if (this.article.bar_code != '') {
						this.bar_codes.push(this.article.bar_code)
					}
					// this.names.push(this.article.name)
					this.available_articles.push(article)
					this.articles.push(article)
					this.articles_id_to_print.push(article.id)
					this.clearArticle()
					this.$toastr.success('Artículo guardado correctamente')
					this.$jQuery('#bar_code').focus()
				})
				.catch( err => {
					this.$toastr.error('Error al guardar el artículo, revise sus datos e intentelo nuevamente por favor')
					this.guardando = false
					console.log(err)
				})
			}
		},
		updateArticle() {
			this.actualizando = true
			this.$api.put('articles/'+this.article.id, {
				article: this.article
			})
			.then(res => {
				this.actualizando = false
				var article = res.data
				this.articles.push(article)
				this.articles_id_to_print.push(article.id)
				this.clearArticle()
				this.bar_codes.push(article.bar_code)
				this.available_articles.push(article)
				this.$toastr.success('Artículo actualizado correctamente')
				this.$jQuery('#edit-article').modal('hide')
			})
			.catch( err => {
				this.$toastr.error('Error al actualizar el artículo, revise sus datos e intentelo nuevamente por favor')
				console.log(err)
			})
		},
		toPrintTickets() {
			var link = 'imprimir-precios/'+this.articles_id_to_print.join('-')
			window.open(link)
		},
		setArticle(article) {
			this.article.creado = this.date(article.created_at) + ' ' 
									+ this.since(article.created_at)
			this.article.actualizado = this.date(article.updated_at) + ' ' 
										+ this.since(article.updated_at)
			this.article.id = article.id
			this.article.category_id = article.category_id
			this.article.online = article.online
			this.article.uncontable = article.uncontable
			this.article.bar_code = article.bar_code
			this.article.measurement = article.measurement
			this.article.name = article.name
			this.article.cost = article.cost
			this.article.price = article.price
			this.article.online_price = article.online_price
			this.article.offer_price = article.offer_price
			if (!this.isProvider(this.user)) {
				this.article.provider = article.providers[article.providers.length - 1].id
				this.article.providers = article.providers
			}
			this.article.stock = article.stock
			this.article.stock_null = false
		},
		previus() {
			this.previus_next++
			this.loading_previus = true
			this.$api.get('articles/previus-next/'+this.previus_next)
			.then( res => {
				this.loading_previus = false
				this.setArticle(res.data)
				this.$jQuery('#edit-article').modal('show')
			})
			.catch( err => {
				this.loading_previus = false
				console.log(err)
			})
		},
		next() {
			this.previus_next--
			this.loading_next = true
			this.$api.get('articles/previus-next/'+this.previus_next)
			.then( res => {
				this.loading_next = false
				this.setArticle(res.data)
				this.$jQuery('#edit-article').modal('show')
			})
			.catch( err => {
				this.loading_next = false
				console.log(err)
			})
		},
		clearArticle() {
			this.article.bar_code = ''
			// this.article.category_id = 0
			this.article.name = ''
			this.article.cost = ''
			this.article.price = ''
			this.article.online_price = ''
			this.article.stock = 0
			this.article.new_stock = 0
			this.article.stock_null = false
			this.file = null
			if (!this.remember_date) {
				this.article.created_at = new Date().toISOString().slice(0,10)
			}
			// this.previus_next = 0
		},

		// // Providers
		getProviders() {
			this.$api.get('providers')
			.then( res => {
				if (res.data.length) {
					this.providers = res.data
					this.article.provider = this.providers[0].id
				}
			})
			.catch( err => {
				console.log(err)
			})
		},
		showProviders() {
			this.$jQuery('#providers').modal('show')
		},
		deleteProvider(provider) {
			this.deleting_provider = provider.id
			this.$api.delete('providers/'+provider.id)
			.then(() => {
				this.deleting_provider = 0
				this.getProviders()
				// this.$jQuery('#providers').modal('hide')
				this.$toastr.success('El proveedor ' + provider.name + ' se elimino correctamente')
			})
			.catch( err => {
				this.deleting_provider = 0
				console.log(err)
			})
		},
		saveProvider(provider) {
			this.saving_provider = true
			this.$api.get('providers/'+provider.name)
			.then( res => {
				this.saving_provider = false
				this.getProviders()
				setTimeout(() => {
					this.article.provider = res.data.id
				}, 1000)
				this.$jQuery('#providers').modal('hide')
				this.$toastr.success('El proveedor ' + provider.name + ' se guardo correctamente')
			})
			.catch( err => {
				console.log(err)
			})
		},

		// Categorias
		getCategories() {
			this.$api.get('categories')
			.then(res => {
				this.categories = res.data
				// this.article.category = this.categories[0].id
			})
			.catch(err => {
				console.log(err)
				this.getCategories()
			})
		},

		getUser() {
			this.$api.get('user')
			.then(res => {
				this.user = res.data
			})
			.catch(() => {
				this.getUser()
			})
		},
	}
}
</script>
<style scoped>
.spinner-anterior {
	margin-bottom: 4px !important;
}
.form-group {
	margin-bottom: .5rem;
}
.spinner-border-sm {
	margin-bottom: 2px;
}
</style>