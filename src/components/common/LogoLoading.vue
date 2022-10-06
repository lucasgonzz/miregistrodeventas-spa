<template>
	<div
	class="container-logo">
        <img class="logo" src="@/assets/logo.png" alt="">
        <b-spinner 
        v-if="loading_message != ''"
        variant="primary"></b-spinner>
        <p
        v-if="loading_message != ''"
        class="text-loader text-primary">Descargando {{ loading_message }}...</p>
	</div>
</template>
<script>
export default {
	name: 'LogoLoading',
	props: ['loading', 'loading_message'],
}
</script>
<style scoped lang="sass">
.container-logo
	position: absolute
	width: 100vw
	height: 100vh
	// background: rgba(0,0,0,.3)
	background: #FFF
	display: flex
	flex-direction: column
	justify-content: center
	align-items: center
	.logo
		margin-bottom: 20px
		z-index: 100
		width: 130px
	.spinner
		width: 60px
	.text-loader
		font-weight: bold
		font-size: 1.1em
		margin-top: 10px
</style>