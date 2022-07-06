<template>
<b-modal
id="schedules"
:title="title"
hide-footer>
	<b-button
	block
	class="m-b-15"
	v-b-modal="'create-schedule'"
	variant="primary">
		<i class="icon-plus"></i>
		Nuevo horario
	</b-button>
	<b-table
	responsive
	v-if="schedules.length"
	:fields="fields"
	:items="items">
		<template #cell(options)="data">
			<div class="j-between">
				<b-button
				v-if="isInWorkday(schedules[data.index])"
				@click="removeSchedule(schedules[data.index])"
				size="sm"
				class="m-r-10"
				variant="danger">
					<btn-loader
					text="Quitar"
					:loader="loading"
					:index="schedules[data.index].id"></btn-loader>
				</b-button>
				<b-button
				v-else
				@click="addSchedule(schedules[data.index])"
				size="sm"
				class="m-r-10"
				variant="primary">
					<btn-loader
					text="Agregar"
					:loader="loading"
					:index="schedules[data.index].id"></btn-loader>
				</b-button>
				<b-button
				@click="updateSchedule(schedules[data.index])"
				size="sm"
				class="m-r-10"
				variant="primary">
					Editar
				</b-button>
				<b-button
				@click="deleteModel(schedules[data.index])"
				size="sm"
				variant="danger">
					<i class="icon-trash"></i>
				</b-button>
			</div>
		</template>
	</b-table>
	<p 
	v-else
	class="text-with-icon">
		<i class="icon-cancel"></i>
		Sin horarios
	</p>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	components: {
		BtnLoader,
	},
	data() {
		return {
			loading: 0,
		}
	},
	computed: {
		selected_workday() {
			return this.$store.state.workdays.selected
		},
		title() {
			return 'Horarios '+this.selected_workday.name
		},
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
			this.schedules.forEach(schedule => {
				items.push({
					name: schedule.name,
					from: this.hour_from_time(schedule.from)+'hs',
					to: this.hour_from_time(schedule.to)+'hs',
				})
			})
			return items
		},
		schedules() {
			return this.$store.state.schedules.schedules
		},
	},
	methods: {
		updateSchedule(schedule) {
			this.$store.commit('schedules/setEdit', schedule)
			this.$bvModal.show('edit-schedule')
		},
		deleteModel(schedule) {
			this.$store.commit('schedules/setDelete', schedule)
			this.$bvModal.show('delete-schedule')
		},
		isInWorkday(schedule) {
			let index = this.selected_workday.schedules.findIndex(sche => {
				return sche.id == schedule.id
			})
			return index != -1
		},
		removeSchedule(schedule) {
			this.loading = schedule.id
			this.$api.put('workdays/remove-schedule', {
				workday: this.selected_workday,
				schedule: schedule,
			})
			.then(res => {
				this.loading = 0
				this.$store.commit('workdays/update', res.data.workday)
				this.$bvModal.hide('schedules')
				this.$toast.success('Actualizado')
			})
			.catch(err => {
				this.loading = 0
				console.log(err)
				this.$toast.error('Error al agregar horario')
			})
		},
		addSchedule(schedule) {
			this.loading = schedule.id
			this.$api.put('workdays/add-schedule', {
				workday: this.selected_workday,
				schedule: schedule,
			})
			.then(res => {
				this.loading = 0
				this.$store.commit('workdays/update', res.data.workday)
				this.$bvModal.hide('schedules')
				this.$toast.success('Actualizado')
			})
			.catch(err => {
				this.loading = 0
				this.$store.commit('workdays/update', res.data.workday)
				console.log(err)
				this.$toast.error('Error al agregar horario')
			})
		},
	}
}
</script>