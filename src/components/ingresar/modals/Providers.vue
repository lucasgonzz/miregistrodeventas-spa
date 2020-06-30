<template>
<b-modal id="providers" title="Proveedores" scrollable hide-footer>
	<b-container>
		<b-row class="m-b-15">
			<b-col>
				<b-card header="Agregar proveedor" no-body>
					<b-card-body>
						<b-form-row class="m-0">
							<b-col>
								<b-form-group
								label="Nombre del proveedor"
								label-for="provider-name">
									<b-form-input
									type="text"
									id="provider-name"
									v-model="provider.name"
									@keyup.enter="saveProvider"
									autocomplete="off"
									placeholder="Ingrese el nombre del proveedor"></b-form-input>
								</b-form-group>
							</b-col>
						</b-form-row>
					</b-card-body>
					<template v-slot:footer>
						<b-button 
						variant="primary"
						@click="saveProvider">
							<i class="icon-check" v-show="!saving_provider"></i>
							<span class="spinner-border spinner-border-sm" v-show="saving_provider"></span>
							Guardar Proveedor
						</b-button>
					</template>
				</b-card>
			</b-col>
		</b-row>
		<b-row>
			<b-col>
				<b-card header="Lista de proveedores" no-body>
					<b-card-body>
						<b-list-group>
							<b-list-group-item
							v-for="provider in providers"
							:key="provider.id">
								{{ provider.name }}
								<span class="float-right">
									<b-button
									variant="danger"
									size="sm"
									@click="deleteProvider(provider)">
										<i class="icon-trash-3" v-show="!deleting_provider"></i>
										<span class="spinner-border spinner-border-sm" v-show="deleting_provider == provider.id"></span>
										Eliminar
									</b-button>	
								</span>
							</b-list-group-item>
						</b-list-group>
					</b-card-body>
				</b-card>
			</b-col>
		</b-row>
	</b-container>
</b-modal>
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
				this.$toastr.error('Ingrese un nombre para el proveedor')
			}
		}
	}
}
</script>