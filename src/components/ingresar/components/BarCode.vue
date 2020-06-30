<template>
	<b-form-row>
		<b-col cols="12">
			<b-form-group
			label="Codigo de barras"
			label-for="article-bar-code">
				<b-form-input
				type="text"
				id="article-bar-code"
				autocomplete="off"
				v-model="article.bar_code"
				placeholder="Ingresa el codigo de barras del producto"></b-form-input>
			</b-form-group>
		</b-col>
		<b-col cols="12" class="j-start">
			<b-button @click="showBarCodes"
				variant="secondary"
				size="sm">
				<i class="icon-barcode"></i>
				Crear codigo
			</b-button>
		</b-col>
	</b-form-row>
</template>
<script>
export default {
	props: ['article'],
	methods: {
		isRegister() {
			this.$emit('isRegister')
		},
		showBarCodes() {
			this.$jQuery('#bar-codes').modal('show')
		},
		onFileChange(e) {
			this.$emit('setFile', e.target.files[0])
		},
	},
}
</script>
<style scoped>
</style>
