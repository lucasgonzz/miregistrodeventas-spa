<template>
	<div class="row m-0">
		<div class="col-4 p-0" v-if="canUse('tickets', user)" data-step="12" data-intro="Imprima los tickets de los artículos que valla registrando y/o actualizando.">
			<button @click.prevent="showPrintTickets" 
					class="btn btn-block btn-left btn-link m-0">
				<i class="icon-tag"></i>
				Tickets ({{ articles_id_to_print.length }})
			</button>
		</div>
		<!-- <div class="col-4 p-0" data-step="11" data-intro="Retroceda a sus artículos previamente guardados.">
			<button @click="previus" 
					class="btn btn-block btn-center btn-primary m-0">
				<i class="icon-undo"
					v-show="!loading_previus"></i>
				<span v-show="loading_previus"
						class="spinner-border spinner-border-sm spinner-anterior" role="status" aria-hidden="true"></span>
				Anterior
			</button>
		</div> -->
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
	props: ['articles_id_to_print', 'user', 'loading_previus', 'guardando'],
	methods: {
		previus() {
			this.$emit('previus')
		},
		saveArticle() {
			this.$emit('saveArticle')
		},
		showPrintTickets() {
			$('#print-tickets').modal('show')
		},
	},
}
</script>
<style scoped>
	
</style>
