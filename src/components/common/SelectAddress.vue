<template>
<b-modal
id="select-address"
v-if="show"
hide-header
hide-footer>
	<p class="title">
		Seleccione desde que direccion esta operando
	</p>
	
</b-modal>
</template>
<script>
export default {
	computed: {
		show() {
			return this.authenticated && this.user.addresses.length >= 2
		}
	}
}
</script>