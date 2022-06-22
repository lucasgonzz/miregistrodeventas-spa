<template>
	<div
	v-if="sub_view == 'fechas'"
	class="m-b-15">
		<p class="title">
			Modo de entrega
		</p>
		<div
		v-if="can_edit">
		    <b-form-radio
		    :value="0"
		    v-model="delivery_and_placement">
		        Solo entrega
		    </b-form-radio>
		    <b-form-radio
		    :value="1"
		    v-model="delivery_and_placement">
		        Entrega y colocación
		    </b-form-radio>
		</div>
		<div
		v-else>
			<p
			v-if="delivery_and_placement">
				<i class="icon-right"></i>
				<strong>Entrega y colocación</strong>
			</p>
			<p
			v-else>
				<i class="icon-right"></i>
				<strong>Solo entrega</strong>
			</p>
		</div>
	</div>
</template>
<script>
import budgets from '@/mixins/budgets'
export default {
	mixins: [budgets],
}
</script>