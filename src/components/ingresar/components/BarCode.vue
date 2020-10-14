<template>
	<b-form-row>
		<b-col>
			<b-form-group
			v-intro-step="2"
			v-intro="'Ingresa el codigo de tu producto para agregarlo rapidamente a una nueva venta'"
			label="Codigo de barras"
			label-for="article-bar-code">
				<b-form-input
				type="text"
				id="article-bar-code"
				autocomplete="off"
				@keydown.enter="isRegister"
				v-model="article.bar_code"
				placeholder="Ingresa el codigo de barras del producto"></b-form-input>
			</b-form-group>
			<p
			class="m-b-0"
			v-show="loading_is_register">
				<span class="text-primary spinner-border spinner-border-sm"></span>
				Verificando codigo
			</p>
		</b-col>
	</b-form-row>
</template>
<script>
export default {
	props: ['article', 'loading_is_register'],
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
