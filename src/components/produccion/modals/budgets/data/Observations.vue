<template>
	<div
	v-if="sub_view == 'observaciones'"
	class="m-b-15">
		<p class="sub-title">
			Observaciones
		</p>
		<div
		v-if="can_edit">
			<b-form-textarea
			class="m-b-15"
			v-for="(observation, i) in observations"
			:key="i"
			placeholder="Ingrese descripcion"
			v-model="observation.text"></b-form-textarea>
			<b-button
			v-if="show"
			variant="primary"
			@click="add">
				<i class="icon-plus"></i>
				Agregar descripcion
			</b-button>
		</div>
		<div
		v-else>
			<div
			v-if="observations.length">
				<p
				v-for="(observation, i) in observations"
				:key="i">
					<i class="icon-right"></i>
					{{ observation.text }}
				</p>
			</div>
			<p 
			v-else
			class="text-with-icon">
				<i class="icon-eye-slash"></i>
				No hay observaciones
			</p>
		</div>
	</div>
</template>
<script>
import budgets from '@/mixins/budgets'
export default {
	mixins: [budgets],
	computed: {
		show() {
			return this.observations[this.observations.length-1].text != ''
		}
	},
	methods: {
		add() {
			this.observations.push({
				text: ''
			})
		}
	}
}
</script>