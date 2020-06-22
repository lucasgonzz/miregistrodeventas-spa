<template>
	<div class="row m-b-10" data-step="3" data-intro="Ingresa el codigo del articulo con ayuda del lector de codigo de barras, si el articulo ya fue ingresado se mostraran sus datos para que puedas editarlo.">
		<div class="col-12">
			<label for="bar_code">Codigo de Barras</label>
			<input 
				type="text" id="bar_code" name="bar_code" 
				class="form-control focus-red" autofocus="true" 
				autocomplete="off" 
				@keyup.enter="isRegister" 
				v-model="article.bar_code"
				placeholder="Codigo de barras">
		</div>
		<!-- <div class="col-12 col-lg-6 align-end">
            <div class="custom-file c-p">
                <input type="file" id="article-image" 
                	class="custom-file-input" v-on:change="onFileChange" lang="es">
                <label class="custom-file-label c-p" data-browse="Buscar" for="inputFileUpload">Seleccionar imagen</label>
            </div>
		</div> -->
		<div class="col-12">
			<button data-step="4" data-intro="Crea e imprimi los codigos que necesites"
				@click="showBarCodes"
				class="btn btn-secondary btn-sm m-t-10">
				<i class="icon-barcode"></i>
				Crear codigo
			</button>
		</div>
	</div>
</template>
<script>
export default {
	props: ['article', 'user'],
	methods: {
		showCamera() {
			this.$emit('showCamera')
		},
		isRegister() {
			this.$emit('isRegister')
		},
		showBarCodes() {
			$('#bar-codes').modal('show')
		},
		onFileChange(e) {
			this.$emit('setFile', e.target.files[0])
		},
	},
}
</script>
<style scoped>
</style>
