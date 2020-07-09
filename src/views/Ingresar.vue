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
	<b-row class="justify-content-center">
		<b-col
		cols="12" 
		lg="7">
			<b-card header="Ingresar un nuevo producto" no-body>
				<b-card-body>
					<uncontable 
					:article="article"></uncontable>
					
					<bar-code 
					:article="article"
					@showCamera="showCamera"
					@setFile="setFile"
					@isRegister="isRegister"></bar-code>

					<name 
					:article="article"
					:categories="categories"
					@setArticle="setArticle"></name>
	
					<cost-price :article="article"
								:user="user"
								:porcentage_for_price="porcentage_for_price"></cost-price>

					<stock-provider-category :article="article"
									:user="user"
									:providers="providers_options"
									:categories="categories_options"></stock-provider-category>
				</b-card-body>
				<template v-slot:footer>
					<card-footer
					:articles_id_to_print="articles_id_to_print"
					:guardando="guardando"
					@saveArticle="saveArticle"></card-footer>
				</template>
			</b-card>
		</b-col>
	</b-row>
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
import Uncontable from '../components/ingresar/components/Uncontable.vue'
import BarCode from '../components/ingresar/components/BarCode.vue'
import Name from '../components/ingresar/components/Name.vue'
import CostPrice from '../components/ingresar/components/CostPrice.vue'
import StockProviderCategory from '../components/ingresar/components/StockProviderCategory.vue'
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

		Uncontable,
		BarCode,
		Name,
		CostPrice,
		StockProviderCategory,
		CardFooter,
	},
	data() {
		return {
			article: {
				uncontable: 0,
				online: false,
				bar_code: '',
				category: 0,
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
				providers: [],
				act_fecha: 1,
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
			providers_options: [],
			saving_provider: false,
			deleting_provider: 0,

			// Categorias
			categories: [],
			categories_options: [],
			saving_categorie: false,

			bar_codes: [],
			// names: [],
			names: [],
			generated_bar_codes: [],

			// Previus articles
			previus_next: 0,
			loading_previus: false,
			loading_next: false,

		}
	},
	computed: {
		user() {
			return this.$store.state.auth.user
		}
	},
	created() {
		if (this.user) {
			this.getNames()
			this.getBarCodes()
			this.getGeneratedBarCodes()
			if (!this.isProvider(this.user)) {
				this.getProviders()
			}
			this.getCategories()
		} else {
			console.log('No se llamaron los metodos')
		}
	},
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
		getNames() {
			this.$api.get('articles/names')
			.then(res => {
				this.names = res.data
			})
			.catch(err => {
				// this.getAvailableArticles()
				console.log(err)
			})
		},
		getBarCodes() {
			this.$api.get('/articles/bar-codes')
			.then( res => {
				this.bar_codes = res.data
			})
			.catch( err => {
				console.log(err)
			})
		},

		setPorcentageForPrice(porcentage) {
			this.porcentage_for_price = porcentage
			this.$jQuery('#porcentage-for-price').modal('hide')
		},

		// Codigos de barra
		getGeneratedBarCodes() {
			this.$api.get('bar-codes')
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
					this.$bvModal.show('edit-article')
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
						// toastr.success('Codigo generado por usted, se completo la cantidad')
						this.article.stock = bar_code.amount
						document.getElementById('article-name').focus()
					}
				})

				// Si no esta registrado y no es un codigo creado por nosotros
				// se pasa al campo del nombre
				if (!codigo_ya_creado) {
					document.getElementById('article-name').focus()
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
				// toastr.error('El campo precio es obligatorio')
				this.$jQuery('#price').focus()
			}
			if (this.article.cost == '') {
				ok = false
				// toastr.error('El campo costo es obligatorio')
				this.$jQuery('#cost').focus()
			}
			if (this.article.name == '') {
				ok = false
				// toastr.error('El campo nombre es obligatorio')
				this.$jQuery('#name').focus()
			}

			// Controla que le codigo de barras no este registrado
			if (this.bar_codes.includes(this.article.bar_code)) {
				ok = false
				// toastr.error('Ya hay un artículo con este codigo de barras')
			}

			// Controla que si no tiene codigo de barras no haya otro
			// articulo sin codigo de barras con el mismo nombre
			if (this.article.bar_code == '') {
				if (this.names.length) {
					this.names.forEach(article => {
						if (article.name.toLowerCase() == this.article.name.toLowerCase() && ok) {
							if (article.bar_code === null) {
								ok = false
								// toastr.error('Ya hay un articulo con ese nombre y sin un codigo de barras, cambie el nombre o asignele un codigo de barras');
							}
						}
					})
				}
			}
			return ok
		},

		// Articles
		saveArticle() {
			console.log('guardando')
			var ok = true
			if ( ok ) {
				this.guardando = true
				this.$api.post('articles', this.article)
				.then( res => {
					this.guardando = false
					var article = res.data
					if (this.article.bar_code != '') {
						this.bar_codes.push(this.article.bar_code)
					}
					this.names.push(this.article.name)
					this.articles.push(article)
					this.articles_id_to_print.push(article.id)
					this.clearArticle()
					this.$toast.success('Guardado correctamente')
					document.getElementById('article-bar-code').focus()
				})
				.catch( err => {
					// toastr.error('Error al guardar el artículo, revise sus datos e intentelo nuevamente por favor')
					this.guardando = false
					console.log(err)
				})
			}
		},
		updateArticle() {
			this.actualizando = true
			this.$api.put('articles/'+this.article.id, this.article)
			.then(res => {
				this.actualizando = false
				var article = res.data
				this.articles.push(article)
				this.articles_id_to_print.push(article.id)
				this.clearArticle()
				this.bar_codes.push(article.bar_code)
				this.names.push(article)
				this.$toast.success('Artículo actualizado correctamente')
				this.$bvModal.show('edit-article')
			})
			.catch( err => {
				this.$toast.error('Error al actualizar el artículo, revise sus datos e intentelo nuevamente por favor')
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
			if (article.category_id) {
				this.article.category_id = article.category_id
			} else {
				this.article.category_id = 0
			}
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
				this.article.provider_id = article.providers[article.providers.length - 1].id
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

		// Providers
		getProviders() {
			this.providers = []
			this.providers_options = []
			this.providers_options.push({text: 'Selecciona un proveedor', value: 0})
			this.$api.get('providers')
			.then( res => {
				this.providers = res.data
				this.setProviders()
			})
			.catch( err => {
				console.log(err)
			})
		},
		setProviders() {
			this.providers.forEach(provider => {
				this.providers_options.push({text: provider.name, value: provider.id})
			})
		},
		deleteProvider(provider) {
			this.deleting_provider = provider.id
			this.$api.delete('providers/'+provider.id)
			.then(() => {
				this.deleting_provider = 0
				this.getProviders()
				this.$bvModal.hide('providers')
				// toastr.success('El proveedor ' + provider.name + ' se elimino correctamente')
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
				this.$bvModal.hide('providers')
				// toastr.success('El proveedor ' + provider.name + ' se guardo correctamente')
			})
			.catch( err => {
				console.log(err)
			})
		},

		// Categorias
		getCategories() {
			this.categories = []
			this.categories_options = []
			this.categories_options.push({text: 'Selecciona una categoria', value: 0})
			this.$api.get('categories')
			.then(res => {
				this.categories = res.data
				this.setCategories()
			})
			.catch(err => {
				console.log(err)
				// this.getCategories()
			})
		},
		setCategories() {
			this.categories.forEach(category => {
				this.categories_options.push({text: category.name, value: category.id})
			})
		},

		getUser() {
			this.$api.get('user')
			.then(res => {
				this.user = res.data
			})
			.catch(() => {
				// this.getUser()
			})
		},
	}
}
</script>
<style scoped lang="sass">
.card-footer
	padding: 0
.spinner-anterior 
	margin-bottom: 4px !important
.form-group 
	margin-bottom: .5rem
.spinner-border-sm 
	margin-bottom: 2px

</style>