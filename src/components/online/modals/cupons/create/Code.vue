<template>
	<div
	class="m-b-20">
		<b-form-group
		label="Codigo del cupon">
			<b-form-input
			v-model="new_cupon.code"
			placeholder="Ingresar cantidad"></b-form-input>
		</b-form-group>
		<hr>
	</div>
</template>
<script>
import cupons from '@/mixins/cupons'
export default {
	mixins: [cupons],
}
</script>