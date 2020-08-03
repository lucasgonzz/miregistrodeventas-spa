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
