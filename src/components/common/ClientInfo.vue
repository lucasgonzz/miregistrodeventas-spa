<template>
	<div class="client-info shadow-2 b-r-1">
		<div class="icon">
			<img 
			v-if="client.image_url"
			:src="image(client)" alt="">
			<i 
			v-else
			class="icon-user"></i>
		</div>
		<div class="info">
			<p
			class="name">
				<strong>{{ client.name }} {{ client.surname }}</strong>
			</p> 
			<p
			v-if="client.email">
				Correo: {{ client.email }}
			</p>
			<p
			v-if="client.cuit">
				CUIT: {{ client.cuit }}
			</p>
			<p
			v-if="client.razon_social">
				{{ client.razon_social }}
			</p>
			<p
			v-if="client.address">
				{{ client.address }}
			</p>
			<p
			v-if="client.iva_condition_id">
				{{ client.iva_condition.name }}
			</p>
		</div>
	</div>
</template>
<script>
export default {
	props: ['client'],
}
</script>
<style lang="sass">
@import '@/sass/_custom.scss'
.client-info
	width: 100%
	display: flex
	margin-bottom: 2em
	border-left: 4px solid lighten($blue, 10)
	.icon 
		width: 150px
		display: flex
		justify-content: center
		align-items: center
		i 
			font-size: 3em
	.info 
		.name 
			margin: 1em 0
			font-size: 1.2em
</style>