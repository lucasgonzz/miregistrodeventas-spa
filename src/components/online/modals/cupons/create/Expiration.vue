<template>
	<div
	class="m-b-15">
		<b-form-group
		v-if="new_cupon.for_new_buyers"
		label="Dias disponibles para usar el cupon una vez registrado el usuario">
			<b-form-input
			type="number"
			min="1"
			v-model="new_cupon.expiration_days"
			placeholder="Dias disponibles"></b-form-input>
		</b-form-group>
		<b-form-group
		v-else
		label="Fecha de vencimiento">
			<b-form-datepicker
			v-model="new_cupon.expiration_date"
			placeholder="Fecha de vencimiento"></b-form-datepicker>
		</b-form-group>
	</div>
</template>
<script>
import cupons from '@/mixins/cupons'
export default {
	mixins: [cupons],
}
</script>