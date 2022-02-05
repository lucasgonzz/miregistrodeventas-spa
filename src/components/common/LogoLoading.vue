<template>
	<div
	class="container-logo">
        <img class="logo" src="@/assets/logo.png" alt="">
        <b-spinner variant="primary"></b-spinner>
        <!-- <img class="spinner" src="@/assets/spinner.gif" alt=""> -->

        <!-- <b-progress :value="100" animated></b-progress> -->
        <p
        class="text-loader text-primary">Cargando {{ loading_message }}...</p>
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