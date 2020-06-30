<template>
	<div class="row m-0">
		<div class="col-4 p-0" data-step="12" data-intro="Imprima los tickets de los artículos que valla registrando y/o actualizando.">
			<button @click.prevent="showPrintTickets" 
					class="btn btn-block btn-left btn-link m-0">
				<i class="icon-tag"></i>
				Tickets ({{ articles_id_to_print.length }})
			</button>
		</div>
		<div class="col p-0" data-step="10" data-intro="Una vez llenado los campos, precione y guarde su artículo.">
			<button @click.prevent="saveArticle"
					class="btn btn-block btn-right btn-success m-0">
				<i v-show="!guardando"
					class="icon-check"></i>
				<span v-show="guardando"
						class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
				Guardar
			</button>
		</div>
	</div>
</template>
<script>
export default {
	props: ['articles_id_to_print', 'guardando'],
	methods: {
		previus() {
			this.$emit('previus')
		},
		saveArticle() {
			this.$emit('saveArticle')
		},
		showPrintTickets() {
			this.$jQuery('#print-tickets').modal('show')
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
