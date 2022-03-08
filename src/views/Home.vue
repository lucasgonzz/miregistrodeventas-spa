<template>
<div id="home">
	<first></first>	
	<precentation></precentation>	
	<features></features>
	<tienda-online></tienda-online>	
	<pedidos></pedidos>	
	<payment-plans></payment-plans>	
	<register-form></register-form>	
	<footer-component></footer-component>	
</div>
</template>
<script>
import First from '@/components/home/components/First'
import Precentation from '@/components/home/components/Precentation'
import Features from '@/components/home/components/Features'
import TiendaOnline from '@/components/home/components/TiendaOnline'
import Pedidos from '@/components/home/components/Pedidos'
import PaymentPlans from '@/components/home/components/PaymentPlans'
import RegisterForm from '@/components/home/components/RegisterForm'
import FooterComponent from '@/components/home/components/Footer'
export default {
	components: {
		Precentation,
		First,
		Features,
		TiendaOnline,
		Pedidos,
		PaymentPlans,
		RegisterForm,
		FooterComponent,
	},
}
</script>
<style lang="sass">
#home
	[class^='col-']
		flex-direction: column
		justify-content: flex-start
		@media screen and (min-width: 768px)
			justify-content: center
			padding: 2em
	video 
		width: 100%
		// @media screen and (max-width: 576px)
		// 	width: 100%
		// @media screen and (min-width: 768px)
		// 	width: 70%
		// @media screen and (min-width: 992px)
		// 	width: 50%
	.row-dark  
		background: #F5F5F5
	.row 
		// padding-bottom: 3em 
		position: relative
		height: 100vh
		margin-bottom: 0
	.row-long
		height: auto !important
	.title 
		font-weight: bold	
		@media screen and (max-width: 992px)
			margin: 1em 0 
			font-size: 1.5em 
		@media screen and (min-width: 992px)
			font-size: 2em 
			margin: 1.5em 0 
	h5 
		margin-bottom: 1em
	.sub-title
		font-size: 1.3em 
		font-weight: bold	
		margin: 2em 0 
</style>