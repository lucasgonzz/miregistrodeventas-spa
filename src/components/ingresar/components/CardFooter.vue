<template>
	<b-row class="m-t-10">
		<b-col
		cols="12"
		sm="4"
		v-intro-step="8"
		v-intro="'Por cada producto que guardes vas a tener disponible su ticket para imprimir'">
			<b-button 
			block
			variant="primary"
			v-b-modal="'print-tickets'">
				<i class="icon-tag"></i>
				Tickets ({{ articles.length }})
			</b-button>
		</b-col>
		<b-col 
		cols="12"
		sm="8"
		v-intro-step="7"
		v-intro="'Guarda tu producto'">
			<b-button 
			block
			variant="success"
			@click.prevent="saveArticle">
				<i v-show="!guardando"
					class="icon-check"></i>
				<span v-show="guardando"
						class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
				Guardar
			</b-button>
		</b-col>
	</b-row>
</template>
<script>
export default {
	props: ['articles', 'guardando'],
	methods: {
		previus() {
			this.$emit('previus')
		},
		saveArticle() {
			this.$emit('saveArticle')
		},
	},
}
</script>
<style scoped lang="sass">
.btn-left
	border-radius: 0 0 0 0.25rem
	padding: .7rem 0.75rem
	font-size: 1rem
	font-weight: bolder
	&:hover
		text-decoration: none

.btn-center
	border-radius: 0px
	padding: .7rem 0.75rem
	font-size: 1rem
	font-weight: bolder

.btn-right
	border-radius: 0 0 0.25rem 0
	padding: .7rem 0.75rem
	font-size: 1rem
	font-weight: bolder
</style>
