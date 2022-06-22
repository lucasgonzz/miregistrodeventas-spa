<template>
	<div
	v-if="sub_view == 'fechas'"
	class="m-b-15">
		<p class="sub-title">
			Fechas de entrega
		</p>
		<b-form-row
		v-if="can_edit">
			<b-col
			md="6">
				<b-form-datepicker
			    class="m-t-10"
			    placeholder="Fecha de inicio"
			    v-model="start_at">
			    </b-form-datepicker>
			</b-col>
			<b-col
			md="6">
				<b-form-datepicker
			    class="m-t-10"
			    placeholder="Fecha de fin"
			    v-model="finish_at">
			    </b-form-datepicker>
			</b-col>
		</b-form-row>
		<b-form-row
		v-else>
			<b-col
			md="6">
				<b-form-group
				label="Inicio">
					<b-form-input
					disabled
					:value="date(start_at)"></b-form-input>
				</b-form-group>
			</b-col>
			<b-col
			md="6">
				<b-form-group
				label="Fin">
					<b-form-input
					disabled
					:value="date(finish_at)"></b-form-input>
				</b-form-group>
			</b-col>
		</b-form-row>
		<!-- <b-form-group
		label="Inicio">
		    <b-form-datepicker
		    class="m-t-10"
		    placeholder="Fecha de inicio"
		    v-model="budget.start_at">
		    </b-form-datepicker>
		</b-form-group>
		<b-form-group
		label="Fin">
		    <b-form-datepicker
		    class="m-t-10"
		    placeholder="Fecha de fin"
		    v-model="budget.finish_at">
		    </b-form-datepicker>
		</b-form-group> -->
	</div>
</template>
<script>
import budgets from '@/mixins/budgets'
export default {
	mixins: [budgets],
}
</script>