<template>
<b-modal
id="afip-details"
title="Detalles de la boleta"
hide-footer>
	<p
	v-if="loading">
		Cargando...
	</p>
	<b-list-group>
		<b-list-group-item>
			Importe gravado 
			<span 
			class="float-right">
				{{ price(importes.gravado) }}
			</span>
		</b-list-group-item>
		<b-list-group-item>
			Importe iva
			<span 
			class="float-right">
				{{ price(importes.iva) }}
			</span>
		</b-list-group-item>
		<b-list-group-item>
			Importe sub total
			<span 
			class="float-right">
				{{ price(importes.subtotal) }}
			</span>
		</b-list-group-item>
		<b-list-group-item>
			Importe total
			<span 
			class="float-right">
				{{ price(importes.total) }}
			</span>
		</b-list-group-item>
	</b-list-group>
</b-modal>
</template>
<script>
export default {
	computed: {
		importes() {
			return this.$store.state.sales.afip.importes
		},
		loading() {
			return this.$store.state.sales.afip.loading
		},
	}
}
</script>