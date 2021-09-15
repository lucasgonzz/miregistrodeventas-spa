<template>
	<b-table
	:fields="fields"
	:items="items">
		<template #cell(options)="data">
			<b-button
			@click="updateSchedule(user.schedules[data.index])"
			size="sm"
			class="m-r-10"
			variant="primary">
				Editar
			</b-button>
			<b-button
			size="sm"
			variant="danger">
				<i class="icon-trash-3"></i>
			</b-button>
		</template>
	</b-table>
</template>
<script>
export default {
	computed: {
		fields() {
			return [
				{key: 'name', label: 'Nombre'},
				{key: 'from', label: 'Desde'},
				{key: 'to', label: 'Hasta'},
				{key: 'options', label: 'Opciones'},
			]
		},
		items() {
			let items = []
			this.user.schedules.forEach(schedule => {
				items.push({
					name: schedule.name,
					from: this.hour_from_time(schedule.from)+'hs',
					to: this.hour_from_time(schedule.to)+'hs',
				})
			})
			return items
		}
	},
	methods: {
		updateSchedule(schedule) {
			this.$store.commit('auth/setScheduleEdit', schedule)
			this.$bvModal.show('update-schedule')
		}
	}
}
</script>