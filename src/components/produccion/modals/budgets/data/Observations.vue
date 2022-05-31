<template>
	<div
	v-if="sub_view == 'observaciones'"
	class="m-b-15">
		<p class="sub-title">
			Observaciones
		</p>
		<div
		v-if="edit">
			<b-form-textarea
			class="m-b-15"
			v-for="(observation, i) in budget.observations"
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
			<p
			v-for="(observation, i) in budget.observations"
			:key="i">
				<i class="icon-right"></i>
				{{ observation.text }}
			</p>
		</div>
	</div>
</template>
<script>
export default {
	props: ['budget', 'edit'],
	computed: {
		show() {
			return this.budget.observations[this.budget.observations.length-1].text != ''
		}
	},
	methods: {
		add() {
			this.budget.observations.push({
				text: ''
			})
		}
	}
}
</script>