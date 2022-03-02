<template>
<b-row
v-animate-onscroll="{down: 'animated fadeInUp'}"
class="footer">
	<b-col
	lg="3">
        <img src="@/assets/logo blanco.png" alt="">
	</b-col>
	<b-col
	cols="6"
	lg="3">
		<p class="title-footer">
			¿Necesitas ayuda?
		</p>
		<p>
			Centro de ayuda
		</p>
		<p>
			Preguntas frecuentes
		</p>
		<p>
			Guia de tramites
		</p>
	</b-col>
	<b-col
	cols="6"
	lg="3">
		<p class="title-footer">
			Compañia
		</p>
		<p>
			¿Quienes somos?
		</p>
		<p>
			Contactanos
		</p>
		<p>
			Seguridad
		</p>
	</b-col>
	<b-col
	lg="3">
		<p class="title-footer">
			Encontranos
		</p>
		<div class="social-links">
			<i class="icon-facebook"></i>
			<i class="icon-instagram"></i>
			<i class="icon-youtube"></i>
		</div>
		<div class="cont-img">
			<img src="@/assets/hostinger.jpg" alt="">
			<img src="@/assets/ssl.png" alt="">
		</div>
	</b-col>
	<b-col
	class="col-copyright"
	cols="12">
		<p
		class="text-center">
			© Copyright 2022 ComercioCity | Términos y Condiciones | Políticas de Privacidad | Políticas de Calidad
		</p>
	</b-col>
</b-row>
</template>
<script>
export default {
	data() {
		return {
		}
	}
}
</script>
<style lang="sass">
@import '@/sass/_custom.scss'
.footer 
	background: $blue 
	margin-top: -30px
	margin-bottom: 0 !important
	padding: 3em 0 1em
	border-radius: 1em 1em 0 0
	[class^='col-']
		@media screen and (max-width: 576px)
			margin-bottom: 3em
	img 
		width: 100px
	p, i
		color: rgba(255,255,255,.7)
		cursor: pointer
	.title-footer 
		color: rgba(255,255,255,.9)
		font-weight: bold	
		font-size: 1.2em 
	.social-links
		display: flex
		justify-content: flex-start
		i 
			font-size: 1.4em
			padding-right: .7em
	.cont-img 
		display: flex
		justify-content: flex-start
		align-items: center
		img 
			width: 60px
			margin-right: 1em
	.col-copyright 
		margin-top: 50px 
		font-size: .8em
		color: rgba(255,255,255,.9)
</style>