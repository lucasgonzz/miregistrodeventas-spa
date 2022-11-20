<template>
<b-modal
size="md"
:title="title"
:id="id"
hide-footer>
	<h5>
		Opcion 1. Descargar el archivo Modelo en formato Excel
	</h5>
	<p
	class="m-b-0">
		Comience por descargar el archivo modelo con los títulos de las columnas que ComercioCity necesita para importar los datos de sus artículos
	</p>
	<b-button
	href="/files/articulos-base.xlsx" download
	variant="link">
		Descargar el archivo modelo
	</b-button>
	<hr>
	<h5>
		Opcion 2. Tambien puede tomar un archivo Excel ya existente, e indicar que columna de su archivo corresponde a que propiedad. 
	</h5>
	<div>
		<b-button
		class="m-b-15"
		block
		variant="primary"
		@click="clear">
			Limpiar
		</b-button>
		<div
		v-for="column in columns">
			<div 
			class="cont-inputs">
				<span>
					{{ column.text }}
				</span>
				<b-form-input
				type="number"
				v-model="column.column"></b-form-input>
			</div>
			<p
			class="m-t-10"
			v-if="column.description">
				<strong>
					{{ column.description }}
				</strong>
			</p>
			<hr>
		</div>
	</div>
	<b-form-group
	class="m-t-15"
	label="Archivo Excel para importar">
		<b-form-file
		class="m-b-15"
		browse-text="Buscar"
		v-model="file"
		variant="primary"
		:state="Boolean(file)"
		placeholder="Seleccione el archivo o arrastralo hasta aquí"
		drop-placeholder="Solta el archivo aqui..."
		></b-form-file>
	</b-form-group>
	<!-- <b-form-group
	label="Porcentaje para calcular los precios a partir de los costos">
		<b-form-input
		placeholder="Ingrese el porcentaje"
		v-model="percentage"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Proveedor de estos articulos">
		<b-form-select
		v-model="provider_id"
		:options="getOptions('provider_id', 'Proveedor')"></b-form-select>
	</b-form-group> -->
	<b-button
	:disabled="!file"
	block
	@click="upload"
	variant="primary">
		<btn-loader
		text="Importar"
		:loader="loading"></btn-loader>
	</b-button>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	components: {
		BtnLoader,
	},
	props: {
		model_name: String,
		model_name_spanish: String,
		columns: Array,
		actions: {
			type: Array,
			default() {
				return []
			}
		},
		props_to_send: {
			type: Array,
			default() {
				return []
			}
		},
	},
	computed: {
		title() {
			return 'Importar '+this.model_name_spanish
		},
		id() {
			return 'import-'+this.model_name
		},
	},
	data() {
		return {
			loading: false,
			file: null,
			percentage: '',
			provider_id: 0,
		}
	},
	methods: {
		clear() {
			this.$emit('clear')
		},	
		upload() {
			this.loading = true
			let config = {headers: { 'content-type': 'multipart/form-data' }}
			let form_data = new FormData();
			form_data.append('models', this.file)
			this.columns.forEach(column => {
				form_data.append('prop_'+column.text, column.column)
			})
			this.props_to_send.forEach(prop => {
				form_data.append(prop.key, prop.value)
			})
			this.$api.post(this.routeString(this.model_name)+'/excel/import', form_data, config)
			.then(res => {
				this.loading = false
				this.file = null
				this.$bvModal.hide(this.id)
				this.$store.dispatch(this.model_name+'/getModels')
				this.actions.forEach(action => {
					this.$store.dispatch(action)
				})
				console.log(res)
			})
			.catch(err => {
				this.loading = false
				console.log(err)
			})
		}
	}
}
</script>
<style lang="sass">
.cont-inputs
	display: flex
	flex-direction: row
	justify-content: space-between
	align-items: center
	// padding: .5em 0
	input 
		width: 100px
</style>