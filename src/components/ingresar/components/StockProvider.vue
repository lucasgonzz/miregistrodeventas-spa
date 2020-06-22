<template>
	<div class="row">
		<div class="col-12 col-md-4" data-step="7" data-intro="La cantidad de unidades que quiere ingresar de este articulo para llevar un seguimiento a medida que se vaya vendiendo, cuando actualice el articulo las unidades que quiera ingresar se sumaran a las que ya tenga. Si no necesita cambiar el proveedor precione ENTER para terminar y guardar el artículo.">
			<label for="stock">Cantidad</label>
			<br>
			<input type="number" 
					class="form-control focus-red" 
					:class="article.uncontable ? 'input-uncontable-stock' : ''"
					id="stock"
					autocomplete="off" 
					@keyup.enter="saveArticle"
					placeholder="Ingrese la cantidad"
					v-model="article.stock">
			<span v-show="article.uncontable">{{ article.measurement }}(s)
			</span>
			<small class="form-text text-muted">
				Si deja este campo vacio no se tendra en cuenta el stock al 
				momento de hacer una venta
			</small>
		</div>
		<div v-show="!isProvider(user)" class="col-12 col-md-4" data-step="8" data-intro="Seleccione al proveedor correspondiente entre la lista de sus proveedores.">
			<div class="form-group m-0">
				<label class="label-block" for="providers">Proveedor</label>
				<select v-model="article.provider" 
						name="providers" 
						required 
						id="providers" 
						class="form-control">
					<option v-for="provider in providers" 
							:value="provider.id">
						{{ provider.name }}
					</option>
				</select>
			</div>
			<a href="#" 
				data-step="9" data-intro="Ingrese nuevos proveedores a su lista." class="btn btn-secondary btn-sm m-t-10"
				@click.prevent="showProviders">
				<i class="icon-user"></i>
				Proveedores
			</a>
		</div>
		<div class="col-12 col-md-4" data-step="8" data-intro="Seleccione al proveedor correspondiente entre la lista de sus proveedores.">
			<div class="form-group m-0">
				<label class="label-block" for="category">Categoria</label>
				<select v-model="article.category_id" 
						name="category" 
						required 
						id="category" 
						class="form-control">
					<option :value="0">Seleccione categoria</option>
					<option v-for="category in categories" 
							:value="category.id">
						{{ category.name }}
					</option>
				</select>
			</div>
			<button data-step="9" data-intro="Ingrese nuevos proveedores a su lista." 
				class="btn btn-secondary btn-sm m-t-10"
				@click.prevent="showCategories">
				Categorias
			</button>
		</div>
	</div>
</template>
<script>
export default {
	props: ['article', 'user', 'providers', 'categories'],
	methods: {
		showProviders() {
			$('#providers').modal('show')
		},
		showCategories() {
			$('#categories').modal('show')
		},
		saveArticle() {
			this.$emit('saveArticle')
		}
	},
}
</script>
<style scoped>
.input-uncontable-stock {
	width: 60%;
	display: inline-block;
}
	
</style>
