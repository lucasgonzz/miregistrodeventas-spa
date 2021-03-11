<template>
<b-modal id="providers" title="Proveedores" hide-footer>
	<b-container>
		<b-row class="m-b-15">
			<b-col>
				<b-card header="Agregar proveedor" no-body>
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
					<b-form-group>
						<b-button 
						variant="primary"
						block
						@click="saveProvider">
							<i class="icon-check" v-show="!saving_provider"></i>
							<span class="spinner-border spinner-border-sm" v-show="saving_provider"></span>
							Guardar Proveedor
						</b-button>
					</b-form-group>
				</b-card>
			</b-col>
		</b-row>
		<b-row>
			<b-col>
				<b-card header="Lista de proveedores" no-body>
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
									Eliminar
								</b-button>	
							</span>
						</b-list-group-item>
					</b-list-group>
				</b-card>
			</b-col>
		</b-row>
	</b-container>
</b-modal>
</template>
<script>
export default {
	data() {
		return {
			provider: {
				name: ''
			},
			saving_provider: false,
			deleting_provider: 0,
		}
	},
	computed: {
		providers() {
			return this.$store.state.providers.providers
		}
	},
	methods: {
		deleteProvider(provider) {
			this.$store.commit('providers/setDelete', provider)
			this.$bvModal.show('delete-provider')
		},
		saveProvider() {
			if (this.check()) {
				this.saving_provider = true
				this.$api.post('providers', this.provider)
				.then(res => {
					let provider = res.data.provider
					this.saving_provider = false
					this.$store.commit('providers/addProvider', provider)
					setTimeout(() => {
						this.$emit('setArticleProvider', provider)
					}, 1000)
					this.$bvModal.hide('providers')
					this.$toast.success('Proveedor guardo')
					this.clear()
				})
				.catch( err => {
					console.log(err)
				})
			}
		},
		clear() {
			this.provider = {
				name: ''
			}
		},
		check() {
			let ok = true
			if (this.provider.name == '') {
				ok = false
				this.$toast.error('Ingrese un nombre para el proveedor')
			} 
			return ok
		}
	}
}
</script>