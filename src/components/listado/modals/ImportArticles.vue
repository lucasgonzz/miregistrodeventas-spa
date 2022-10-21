<template>
<b-modal
title="Importar articulos"
id="import-articles"
hide-footer>
	<h4>
		Paso 1, Descargar el archivo Modelo en formato Excel
	</h4>
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
	<h4>
		Paso 2. Copiar los datos de los artículos en la planilla
	</h4>
	<p>
		Exporte los datos de su viejo sistema o desde una planilla de Excel. Copie y pegue los datos de los artículos dentro del archivo descargado en el Paso 1. Asegúrese de que los datos que se copian coincidan con los títulos de las columnas previstas en el archivo modelo.
	</p>
	<p class="text-danger">
		IMPORTANTE: No cambie los títulos de las columnas en el archivo modelo. Estos tienen que permanecer sin cambios para que la importación funcione correctamente.
	</p>
	<hr>
	<h4>
		Paso 3. Importar el archivo generado
	</h4>
	<p>
		Seleccione el archivo modelo que descargo y relleno en los pasos anteriores y hacer click en el botón Importar
	</p>
	<b-form-file
	class="m-b-15"
	browse-text="Buscar"
	v-model="file"
	variant="primary"
	:state="Boolean(file)"
	placeholder="Seleccione el archivo o arrastralo hasta aquí"
	drop-placeholder="Solta el archivo aqui..."
	></b-form-file>
	<b-form-group
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
	</b-form-group>
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
	data() {
		return {
			loading: false,
			file: null,
			percentage: '',
			provider_id: 0,
		}
	},
	methods: {
		upload() {
			this.loading = true
			let config = {headers: { 'content-type': 'multipart/form-data' }}
			let form_data = new FormData();
			form_data.append('articles', this.file);
			form_data.append('percentage', this.percentage);
			form_data.append('provider_id', this.provider_id);
			this.$api.post('article/excel/import', form_data, config)
			.then(res => {
				this.loading = false
				this.file = null
				this.$bvModal.hide('import-articles')
				this.$store.dispatch('article/getModels')
				this.$store.dispatch('provider/getModels')
				this.$store.dispatch('categories/getCategories')
				this.$store.dispatch('sub_categories/getSubCategories')
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