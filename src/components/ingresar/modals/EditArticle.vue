<template>
<div class="modal fade" id="edit-article" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-dialog-scrollable" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="m-0">
					<strong v-show="previusNext == 0">
						Ya hay un <strong>{{ article.name }}</strong> ingresado
					</strong>
					<strong v-show="previusNext != 0">
						<strong>{{ article.name }}</strong>
					</strong>
				</h5>
				<button @click="clearArticle" type="button" class="close" data-dismiss="modal" aria-label="Close">
					<i class="icon-cancel"></i>
				</button>
			</div>
			<div class="modal-body">
				<div class="form-group m-b-10">
					<button v-show="previusNext > 0"
							@click="previus"
							class="btn btn-primary m-r-5">
						<i v-show="!loading_previus"
							class="icon-undo"></i>
						<span v-show="loading_previus"
								class="spinner-border spinner-border-sm spinner-anterior" role="status" aria-hidden="true"></span>
						Anterior
					</button>
					<button v-show="previusNext > 1"
							@click="next"
							class="btn btn-primary m-r-5">
						<i v-show="!loading_next"
							class="icon-redo"></i>
						<span v-show="loading_next"
								class="spinner-border spinner-border-sm spinner-anterior" role="status" aria-hidden="true"></span>
						Siguiente
					</button>
				</div>
				<div class="form-group">
					<div class="input-group mb-2 mr-sm-2">
						<div class="input-group-prepend">
						  	<div class="input-group-text"><i class="icon-barcode"></i></div>
						</div>
						<input v-if="article.bar_code"
								type="text" 
								name="bar-code" 
								v-model="article.bar_code" 
								class="form-control">
						<input v-else
								type="text" 
								v-model="article.new_bar_code" 
								name="bar-code" 
								:placeholder="'Ingrese un codigo de barras para '+article.name" 
								class="form-control">
					</div>
					<a v-show="!article.bar_code"
						href="#" 
						@click.prevent="createBarCode"
						class="btn btn-secondary btn-sm">
						¿No tiene codigo de barras? Crea uno aca
					</a>
				</div>
				<div class="form-group">
					<label for="cost">Agregado</label>
					<input type="text" name="cost" v-model="article.creado" class="form-control" disabled>
				</div>
				<div class="form-group">
					<label for="cost">Actualizado</label>
					<input type="text" name="cost" v-model="article.actualizado" class="form-control" disabled>
				</div>
				<div class="form-group">
					<label for="cost">Costo</label>
					<input type="number" name="cost" v-model="article.cost" id="cost_actualizar" class="form-control focus-red" autocomplete="off">
					<small class="form-text text-muted">
						Para agregar decimales (centavos) coloque un punto para separar las unidades	
					</small>
				</div>

				<div class="form-group">
					<label for="price">Precio</label>
					<input type="number" name="price" v-model="article.price" id="price_actualizar" class="form-control focus-red" autocomplete="off">
					<small class="form-text text-muted">
						Para agregar decimales (centavos) coloque un punto para separar las unidades	
					</small>
				</div>

				<div class="form-group" v-show="article.offer_price">
					<label for="price">Precio de oferta</label>
					<input type="number" name="price" v-model="article.offer_price" class="form-control focus-red" autocomplete="off">
					<small class="form-text text-muted">
						Para agregar decimales (centavos) coloque una coma para separar las unidades	
					</small>
				</div>

				<div class="form-group" v-show="article.stock">
					<div class="custom-control custom-checkbox my-1 mr-sm-2 m-b-10">
						<input v-model="article.stock_null" 
								type="checkbox" 
								class="custom-control-input" 
								id="stock-null">
						<label class="custom-control-label c-p" 
								for="stock-null">
							No controlar mas el stock para este artículo
						</label>
					</div>
					<label for="stock" v-show="!article.stock_null">
						Cantidad para agregar
						<span v-show="article.uncontable == 1"> 
							en {{ article.measurement }}(s)
						</span>
					</label>
					<input type="number" 
							min="0"
							v-model="article.new_stock"  
							v-show="!article.stock_null"
							autocomplete="off"
							class="form-control focus-red">
					<small v-show="!article.stock_null">
						Actualmente hay {{ article.stock }}
						<span v-show="article.uncontable == 1"> 
							{{ article.measurement }}(s)
						</span>
					</small>
				</div>

				<div class="form-group" v-show="!is_provider(user)">
					<label for="provider">
						Proveedor
					</label>
					<select v-model="article.provider" id="provider" class="form-control m-b-10">
						<option v-for="provider in providers" :value="provider.id">
							{{ provider.name }}
						</option>
					</select>
					<button class="btn btn-secondary btn-sm"
							@click="showProviders">
						<i class="icon-eye" v-show="!show_providers"></i>
						<i class="icon-eye-slash" v-show="show_providers"></i>
						Proveedores anteriores
					</button>
					<table v-show="show_providers" class="table table-striped text-center m-t-10">
						<thead>
							<tr>
								<th>Fecha</th>
								<th>Nombre</th>
								<th>Costo</th>
								<th>Precio</th>
								<th>Cantidad</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="provider in article.providers">
								<td>{{ date(provider.pivot.created_at) }}</td>
								<td>{{ provider.name }}</td>
								<td>{{ price(provider.pivot.cost) }}</td>
								<td>{{ price(provider.pivot.price) }}</td>
								<td v-if="provider.pivot.amount">
									{{ provider.pivot.amount }}
								</td>
								<td v-else>Sin uso</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="form-group">
					<label for="name">Nombre</label>
					<input type="text" name="name" v-model="article.name" id="name_actualizar" class="form-control focus-red" autocomplete="off">
				</div>
				<div class="form-group">
					<div class="custom-control custom-checkbox my-1 mr-sm-2 m-b-10">
						<input v-model="article.act_fecha" 
								type="checkbox" 
								class="custom-control-input" 
								id="act_fecha">
						<label class="custom-control-label c-p" 
								for="act_fecha">
							Actualizar fecha
						</label>
						<small id="nameHelp" 
								class="form-text text-muted">
							Si desmarca esta casilla no se guardara la fecha de actualización	
						</small>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button @click="clearArticle" type="button" class="btn btn-secondary focus-red" data-dismiss="modal">Cancelar</button>
				<button type="button" 
						class="btn btn-primary focus-red" 
						@click="updateArticle">
					<i class="icon-check" v-show="!actualizando"></i>
					<span v-show="actualizando"
							class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
					Actualizar
				</button>
			</div>
		</div>
	</div>
</div>

</template>
<script>
export default {
	props: ['article', 'user', 'providers', 'previusNext', 'actualizando', 'loading_previus', 'loading_next'],
	data() {
		return {
			show_providers: false,
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
		previus() {
			this.$emit('previus')
		},
		next() {
			this.$emit('next')
		},
		updateArticle() {
			if (this.verificarCampos()) {
				this.$emit('updateArticle')
			}
		},
		isChecked(provider_id) {
			this.article.providers.forEach( p => {
				if (provider_id == p.id) {
					console.log(`${p.name} si`)
					return true
				} else {
					console.log('no')
					return false
				}
			})
		},
		verificarCampos() {
			var ok = true
			if (this.article.price == '') {
				ok = false
				// toastr.error('No puede dejar el precio vacio')
				$('#price_actializar').focus()
			}
			if (this.article.cost == '') {
				ok = false
				// toastr.error('No puede dejar el costo vacio')
				$('#cost_actializar').focus()
			}
			if (this.article.name == '') {
				ok = false
				// toastr.error('No puede dejar el nombre vacio')
				$('#name_actializar').focus()
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
.spinner-border-sm {
	margin-bottom: 2px;
}
</style>