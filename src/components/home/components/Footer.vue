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
		<a
		target="_blank"
		href="/preguntas-frecuentes">
			Preguntas frecuentes
		</a>
	</b-col>
	<b-col
	cols="6"
	lg="3">
		<p class="title-footer">
			Compañia
		</p>
		<a
		target="_blank"
		href="/preguntas-frecuentes">
			¿Quienes somos?
		</a>
		<a
		target="_blank"
		href="/preguntas-frecuentes">
			Contactanos
		</a>
		<a
		target="_blank"
		href="/preguntas-frecuentes">
			Seguridad
		</a>
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
	// margin-top: -30px
	margin-bottom: 0 !important
	padding: 3em 0 1em
	height: auto !important
	border-radius: 1em 1em 0 0
	[class^='col-']
		@media screen and (max-width: 576px)
			margin-bottom: 1em
	img 
		width: 100px
		@media screen and (max-width: 768px)
			margin-bottom: 1.5em
	a
		color: rgba(255,255,255,.7)
		cursor: pointer
		background: none
		border: none
		display: block
		text-align: left
		margin-bottom: 1em
		&:hover 
			color: #FFF
			
	.title-footer 
		color: rgba(255,255,255,.9)
		font-weight: bold	
		font-size: 1.2em 
	.social-links
		display: flex
		justify-content: flex-start
		i 
			color: rgba(255,255,255,.9)
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
		@media screen and (min-width: 576px)
			margin-top: 50px 
		font-size: .8em
		display: block !important
		color: rgba(255,255,255,.9)
</style>