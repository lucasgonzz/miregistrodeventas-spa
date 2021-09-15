<template>
<b-modal id="update-schedule" title="Actualizar horario" hide-footer>
	<b-form-group
	label="Nombre"
	label-for="name">
		<b-form-input
		id="name"
		v-model="schedule.name"
		@keyup.enter="updateSchedule"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Desde"
	label-for="from">
		<b-form-input
		id="from"
		v-model="schedule.from"
		@keyup.enter="updateSchedule"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Hasta"
	label-for="to">
		<b-form-input
		id="to"
		v-model="schedule.to"
		@keyup.enter="updateSchedule"></b-form-input>
	</b-form-group>
	<b-form-group>
		<b-button
		block
		variant="primary"
		@click="updateSchedule">
			<btn-loader
			text="Actualizar"
			:loader="loading"></btn-loader>
		</b-button>
	</b-form-group>
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
			loading: false,
		}
	},
	computed: {
		schedule() {
			return this.$store.state.auth.schedule_edit
		},
	},
	methods: {
		updateSchedule() {
			if (this.check()) {
				this.loading = true
				this.$api.put('user/schedules', this.schedule)
				.then(res => {
					this.loading = false
					this.$toast.success('Horarios actualizados')
					this.$bvModal.hide('update-schedule')
				})
				.catch(err => {
					this.loading = false
					console.log(err)
				})
			}
		},
		check() {
			if (this.schedule.name == '') {
				this.$toast.error('Ingrese un nombre')
				return false
			}
			if (this.schedule.from == '') {
				this.$toast.error('Ingrese una hora de inicio')
				return false
			}
			if (this.schedule.to == '') {
				this.$toast.error('Ingrese una hora de cierre')
				return false
			}
			return true
		},
	}
}
</script>