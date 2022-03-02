<template>
<div id="home">
	<RegisterForm></RegisterForm>	
	<precentation></precentation>	
	<features></features>	
	<online-store></online-store>	
	<payment-plans></payment-plans>	
	<footer-component></footer-component>	
</div>
</template>
<script>
import RegisterForm from '@/components/home/components/RegisterForm'
import Precentation from '@/components/home/components/Precentation'
import Features from '@/components/home/components/Features'
import OnlineStore from '@/components/home/components/OnlineStore'
import PaymentPlans from '@/components/home/components/PaymentPlans'
import FooterComponent from '@/components/home/components/Footer'
export default {
	components: {
		RegisterForm,
		Precentation,
		Features,
		OnlineStore,
		PaymentPlans,
		FooterComponent,
	},
}
</script>
<style lang="sass">
#home
	.row-dark 
		background: #F5F5F5
	.row 
		padding-bottom: 3em 
	.title 
		font-size: 2em 
		font-weight: bold	
		margin: 3em 0 2em
	.sub-title
		font-size: 1.3em 
		font-weight: bold	
		margin: 2em 0 
</style>