<template>
<b-modal id="edit-article" title="Editar artículo" scrollable>
	<b-container fluid>
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
			:options="categories_options"
			v-model="article.category_id"></b-form-select>
		</b-form-group>

		<!-- Costo y precio -->
		<b-form-group
		v-if="hasPermissionTo('article.index.cost', user)"
		label="Costo"
		label-for="article-cost">
			<b-form-input
			id="article-cost"
			type="number"
			v-model="article.cost"></b-form-input>
		</b-form-group>
		<b-form-group
		label="Precio"
		label-for="article-price">
			<b-form-input
			id="article-price"
			type="number"
			v-model="article.price"></b-form-input>
		</b-form-group>
		<b-form-group
		v-if="canUse('online', user) && article.online == 1"
		label="Precio online"
		label-for="article-online-price">
			<b-form-input
			id="article-online-price"
			type="number"
			v-model="article.online_price"></b-form-input>
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
		v-show="article.stock"
		label="Cantidad para agregar"
		label-for="article-stock"
		:description="stock_description">
			<b-form-input
			id="article-stock"
			min="0"
			type="number"
			v-model="article.new_stock"></b-form-input>
		</b-form-group>

		<!-- Proveedor -->
		<b-form-group
		v-if="!isProvider(user)"
		label="Proveedor"
		label-for="article-provider">
			<b-form-select
			id="article-provider"
			:options="providers_options"
			v-model="article.provider_id"></b-form-select>
		</b-form-group>
		<b-form-group>
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
			type="text"
			v-model="article.name"></b-form-input>
		</b-form-group>
		<b-form-checkbox
		id="article-act-fecha"
		v-model="article.act_fecha"
		:value="1"
		:unchecked-value="0">
			Actualizar fecha
		</b-form-checkbox>
	</b-container>
	<template v-slot:modal-footer>
		<b-button
		variant="primary"
		@click="updateArticle">
			<i class="icon-check" v-show="!actualizando"></i>
			<span v-show="actualizando" class="spinner-border spinner-border-sm"></span>
			Actualizar
		</b-button>
	</template>
</b-modal>
</template>
<script>
export default {
	props: ['article', 'user', 'providers', 'categories', 'actualizando'],
	data() {
		return {
			show_providers: false,
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
		categories_options() {
			let options = []
			options.push({text: 'Seleccione una categoria', value: 0})
			this.categories.forEach(category => {
				options.push({text: category.name, value: category.id})
			})
			return options
		},
		providers_options() {
			let options = []
			// if (this.article.provider_id) {
				options.push({text: 'Seleccione un proveedor', value: 0})
				this.providers.forEach(provider => {
					options.push({text: provider.name, value: provider.id})
				})
			// }
			return options
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
			this.article.providers.forEach(provider => {
				let item = {}
				item.fecha = this.date(provider.pivot.created_at)
				item.nombre = provider.name
				item.costo = provider.pivot.cost
				item.precio = provider.pivot.price
				item.cantidad = provider.pivot.amount ? provider.pivot.amount : 'Sin uso'
				items.push(item)
			})
			return items
		}
	},
	methods: {
		showProviders() {
			if (this.show_providers) {
				this.show_providers = false
			} else {
				this.show_providers = true
			}
		},
		clearArticle() {
			this.$emit('clearArticle')
		},
		updateArticle() {
			if (this.verificarCampos()) {
				this.$emit('updateArticle')
			}
		},
		verificarCampos() {
			var ok = true
			if (this.article.price == '') {
				ok = false
				// toastr.error('No puede dejar el precio vacio')
				document.getElementById("price_actializar").focus()
			}
			if (this.article.cost == '') {
				ok = false
				// toastr.error('No puede dejar el costo vacio')
				document.getElementById("cost_actializar").focus()
			}
			if (this.article.name == '') {
				ok = false
				// toastr.error('No puede dejar el nombre vacio')
				document.getElementById("name_actializar").focus()
			}
			return ok
		},
		createBarCode() {
			window.open('codigos-de-barra')
		},
	}
}
</script>
<style scoped>
.container-fluid {
	margin: 0;
}
.form-group {
	margin-bottom: 1rem;
}
</style>