<template>
<b-modal id="edit-article" :title="`Editar ${this.article.name}`" hide-footer>
	<div>
		<b-form-group
		v-if="article.images && article.images.length">
			<img 
			class="article-image"
			:src="articleImageUrl(article, false)">
		</b-form-group>
		<b-form-group
		label="Creado"
		label-for="creado">
			<b-form-input
			id="creado"
			type="text"
			v-model="article.creado"
			disabled></b-form-input>
		</b-form-group>
		<b-form-group
		label="Actualizado"
		label-for="actualizado">
			<b-form-input
			id="actualizado"
			type="text"
			v-model="article.actualizado"
			disabled></b-form-input>
		</b-form-group>

		<!-- Codigo de barras -->
		<b-form-group
		label="Codigo de barras"
		label-for="article-bar-code">
			<b-form-input
			id="article-bar-code"
			type="text"
			:placeholder="`Ingresa un codigo de barras para ${this.article.name}`"
			v-model="article.bar_code"></b-form-input>
		</b-form-group>

		<!-- Categoria -->
		<b-form-group
		label="Categoría"
		label-for="article-category">
			<b-form-select
			id="article-category"
			@keydown.enter="updateArticle"
			:options="categories_options"
			v-model="article.category_id"></b-form-select>
		</b-form-group>

		<!-- SubCategoria -->
		<b-form-group
		label="Subcategoría"
		label-for="article-sub-category">
			<b-form-select
			id="article-sub-category"
			@keydown.enter="updateArticle"
			:options="sub_categories_options(article)"
			v-model="article.sub_category_id"></b-form-select>
		</b-form-group>

		<!-- Costo y precio -->
		<b-form-group
		v-if="can('article.index.cost')"
		label="Costo"
		label-for="article-cost">
			<b-form-input
			id="article-cost"
			@keydown.enter="updateArticle"
			type="number"
			min="0"
			v-model="article.cost"></b-form-input>
		</b-form-group>
		<b-form-group
		label="Precio"
		label-for="article-price">
			<b-form-input
			id="article-price"
			@keydown.enter="updateArticle"
			type="number"
			min="0"
			v-model="article.price"></b-form-input>
		</b-form-group>
		
		<!-- Precios especiales -->
		<b-form-group v-show="special_prices.length"
		v-for="(special_price, index) in special_prices"
		:key="special_price.id"
		:label="`Precio ${special_price.name}`"
		:label-for="`article-price-${special_price.name}`">
			<b-form-input
			type="number"
			min="0"
			@keydown.enter="updateArticle"
			:id="`article-special-price-${special_price.id}`"
			v-model="article[special_price.name]"
			:placeholder="`Ingrese el precio para ${special_price.name}`"></b-form-input>
		</b-form-group>
		<b-form-group
		v-show="article.previus_price"
		label="Precio anterior"
		label-for="article-previus-price">
			<b-form-input
			id="article-previus-price"
			disabled
			type="number"
			v-model="article.previus_price"></b-form-input>
		</b-form-group>

		<!-- Stock -->
		<b-form-group
		v-if="article.variants && article.variants.length"
		label="Stock"
		label-for="article-stock">
			<b-button
			size="sm"
			variant="primary"
			@click="showVariants()">
				Ver stock
			</b-button>
		</b-form-group>
		<b-form-group
		v-else
		label="Stock"
		label-for="article-stock">
			<b-form-input
			id="article-stock"
			@keydown.enter="updateArticle"
			min="0"
			type="number"
			v-model="article.stock"></b-form-input>
		</b-form-group>
		<b-form-group
		v-show="article.stock && article.variants && !article.variants.length"
		label="Cantidad para agregar"
		label-for="article-new-stock">
			<b-form-input
			id="article-new-stock"
			@keydown.enter="updateArticle"
			min="0"
			type="number"
			v-model="article.new_stock"></b-form-input>
		</b-form-group>
		<b-form-group>
			<b-form-checkbox
			v-model="article.stock_null"
			id="article-stock-null">
				Dejar de controlar stock
			</b-form-checkbox>
		</b-form-group>

		<!-- Proveedor -->
		<b-form-group
		v-if="!isProvider()"
		label="Proveedor"
		label-for="article-provider">
			<b-form-select
			id="article-provider"
			:options="providers_options"
			v-model="article.provider_id"></b-form-select>
		</b-form-group>
		<b-form-group
		v-if="!isProvider()">
			<b-form-checkbox
			v-model="article.provider_null"
			id="article-stock-null">
				No usar proveedor
			</b-form-checkbox>
		</b-form-group>
		<b-form-group
		v-if="!isProvider()">
			<b-button
			@click="show_providers ? show_providers = false : show_providers = true"
			variant="secondary"
			size="sm">
				<i class="icon-eye" v-show="!show_providers"></i>
				<i class="icon-eye-slash" v-show="show_providers"></i>
				Proveedores anteriores
			</b-button>
			<b-table striped hover
			class="m-t-10"
			v-show="show_providers"
			:items="table_providers_items"
			></b-table>
		</b-form-group>

		<!-- Nombre -->
		<b-form-group
		label="Nombre"
		label-for="article-name">
			<b-form-input
			id="article-name"
			@keydown.enter="updateArticle"
			type="text"
			v-model="article.name"></b-form-input>
		</b-form-group>
		<b-form-checkbox
		class="m-b-10"
		id="article-act-fecha"
		v-model="article.act_fecha"
		:value="true"
		:unchecked-value="false">
			Actualizar fecha
		</b-form-checkbox>
		<b-form-group
		class="m-b-0">
			<b-button
			block
			variant="primary"
			@click="updateArticle">
				<i class="icon-check" v-show="!loading"></i>
				<span v-show="loading" class="spinner-border spinner-border-sm"></span>
				Actualizar
			</b-button>
		</b-form-group>	
	</div>
</b-modal>
</template>
<script>
import categories from '@/mixins/categories'
import edit_articles from '@/mixins/edit_articles'
export default {
	name: 'EditArticle',
	mixins: [categories, edit_articles],
	data() {
		return {
			show_providers: false,
			loading: false,
		}
	},
	watch: {
		show_providers() {
			if (this.show_providers) {
				this.orderProvidersHistory(this.article)
			}
		},
	},
	computed: {
		article() {
			return this.$store.state.articles.article_to_edit
		},
		special_prices() {
			return this.$store.state.special_prices.special_prices
		},
		stock_description() {
			let description = `Actualmente hay ${this.article.stock}`
			if (this.article.uncontable == 1) {
				description += ` ${this.article.measurement}`
			}
			return description
		},
		table_providers_items() {
			let items = [] 
			if (this.article.providers) {
				this.article.providers.forEach(provider => {
					let item = {}
					item.fecha 		= this.date(provider.pivot.created_at)
					item.nombre 	= provider.name 
					item.costo 		= this.price(provider.pivot.cost)
					item.precio 	= this.price(provider.pivot.price)
					item.cantidad 	= provider.pivot.amount ? provider.pivot.amount : 'Sin uso'
					items.push(item)
				})
			}
			return items
		}
	},
	methods: {
		showVariants() {
			this.$store.commit('articles/setImagesToShow', this.article)
			this.$bvModal.show('article-variants')
		},
		showProviders() {
			if (this.show_providers) {
				this.show_providers = false
			} else {
				this.show_providers = true
			}
		},
		clearArticle() {
			console.log(1)
			this.$emit('clearArticle')
		},
		updateArticle() {
			if (this.check()) {
				this.loading = true
				this.$api.put('/articles', this.article)
				.then(res => {
					console.log(res.data.article)
					this.loading = false
					this.$store.commit('articles/update', res.data.article)
					this.$toast.success('Articulo actualizado')
					this.$bvModal.hide('edit-article')
					this.clearArticle()
				})
				.catch(err => {
					this.loading = false
					this.$toast.error('Error al actualizar articulo, intentelo mas tarde')
					console.log(err)
				})
			}
		},
		check() {
			var ok = true
			if (this.article.price == '') {
				ok = false
				this.$toast.error('No puede dejar el precio vacio')
				document.getElementById("article-price").focus()
				return ok
			}
			if (this.article.cost == '') {
				ok = false
				this.$toast.error('No puede dejar el costo vacio')
				document.getElementById("article-cost").focus()
				return ok
			}
			if (this.article.name == '') {
				ok = false
				this.$toast.error('No puede dejar el nombre vacio')
				document.getElementById("article-name").focus()
				return ok
			}
			return ok
		},
		createBarCode() {
			window.open('codigos-de-barra')
		},
	}
}
</script>
<style scoped lang="sass">
.container-fluid 
	margin: 0

.form-group 
	margin-bottom: 1rem
.article-image
	width: 100%
article-image
</style>