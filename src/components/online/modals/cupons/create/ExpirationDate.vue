<template>
	<b-form-group
	label="Fecha de vencimiento">
		<b-form-datepicker
		v-model="new_cupon.expiration_date"
		placeholder="Fecha de vencimiento"></b-form-datepicker>
	</b-form-group>
</template>
<script>
import cupons from '@/mixins/cupons'
export default {
	mixins: [cupons],
}
</script>