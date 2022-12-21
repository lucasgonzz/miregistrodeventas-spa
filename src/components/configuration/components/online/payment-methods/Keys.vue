<template>
	<div
	class="m-b-15">
		<b-form-group
		label="Clave Publica">
			<b-form-input
			placeholder="Ingrese Clave Publica"
			v-model="payment_method.public_key"></b-form-input>
		</b-form-group>
		<b-form-group
		class="m-t-15"
		label="Clave Privada">
			<b-form-input
			placeholder="Ingrese Clave Privada"
			v-model="payment_method.access_token"></b-form-input>
		</b-form-group>
		<hr>
	</div>
</template>
<script>
export default {
	props: ['payment_method']
}
</script>