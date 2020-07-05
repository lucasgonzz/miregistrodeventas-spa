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
				@keyup.enter="isRegister"
				v-model="article.bar_code"
				placeholder="Ingresa el codigo de barras del producto"></b-form-input>
			</b-form-group>
		</b-col>
		<b-col cols="12" class="j-start">
			<b-button
			variant="secondary"
			size="sm"
			v-b-modal="'bar-codes'">
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
		onFileChange(e) {
			this.$emit('setFile', e.target.files[0])
		},
	},
}
</script>
<style scoped>
</style>
