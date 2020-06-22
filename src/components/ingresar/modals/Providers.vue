<template>
<div class="modal fade" id="providers" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-dialog-scrollable" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">
					<strong>
						Proveedores
					</strong>
				</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<i class="icon-cancel"></i>
				</button>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col">
						<div class="card">
							<div class="card-header">
								<strong>
									Agregar un nuevo proveedor
								</strong>
							</div>
							<div class="card-body">
								<div class="form-group">
									<label for="cost">Nombre del nuevo proveedor</label>
									<input class="form-control"
											type="text" name="cost" 
											@keyup.enter="saveProvider"
											placeholder="Nombre del nuevo proveedor" 
											v-model="provider.name">
								</div>
							</div>
							<div class="card-footer">
								<button type="button" 
										class="btn btn-primary focus-red" 
										@click="saveProvider">
									<i class="icon-check" v-show="!saving_provider"></i>
									<span v-show="saving_provider"
											class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
									Guardar proveedor
								</button>
							</div>
						</div>
					</div>
				</div>
				<div class="row m-t-10">
					<div class="col">
						<div class="card">
							<div class="card-header">
								<strong>
									Mis proveedores
								</strong>
							</div>
							<div class="card-body">
								<ul class="list-group">
									<li v-for="provider in providers" class="list-group-item">
										{{ provider.name }}
										<button @click="deleteProvider(provider)"
												class="btn btn-danger btn-sm float-right">
											<i class="icon-trash-3" v-show="deleting_provider != provider.id"></i>
											<span v-show="deleting_provider == provider.id"
													class="spinner-border spinner-border-sm m-r-5" role="status" aria-hidden="true"></span>
											Eliminar
										</button>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- <div class="modal-footer">
				<button type="button" class="btn btn-secondary focus-red" data-dismiss="modal">Cerrar</button>
			</div> -->
		</div>
	</div>
</div>

</template>
<script>
export default {
	props: ['providers', 'saving_provider', 'deleting_provider'],
	data() {
		return {
			provider: {name: ''},
		}
	},
	methods: {
		deleteProvider(provider) {
			this.$emit('deleteProvider', provider)
		},
		saveProvider() {
			if (this.provider.name != '') {
				this.$emit('saveProvider', this.provider)
			} else {
				toastr.error('Ingrese un nombre para el proveedor')
			}
		}
	}
}
</script>