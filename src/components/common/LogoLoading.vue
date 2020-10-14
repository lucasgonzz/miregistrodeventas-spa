<template>
	<div
	class="container-logo">
        <div
        class="img-container">
        	<img src="@/assets/logo.png" alt="">
        </div>
        <b-progress :value="100" animated></b-progress>
	</div>
</template>
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
	.progress 
		width: 300px
	.img-container
		margin-bottom: 1em
		width: 100px
		img 
			width: 100%
</style>