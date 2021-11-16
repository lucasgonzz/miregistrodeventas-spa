<template>
<b-modal id="edit-schedule" title="Actualziar horario" hide-footer>
	<b-form-group
	label="Nombre"
	label-for="name">
		<b-form-input
		placeholder="Nombre del horario"
		id="name"
		v-model="schedule.name"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Desde"
	label-for="from">
		<b-form-timepicker
		placeholder="Hora de inicio"
		id="from"
		locale="es"
		v-model="schedule.from"></b-form-timepicker>
	</b-form-group>
	<b-form-group
	label="Hasta"
	label-for="to">
		<b-form-timepicker
		placeholder="Hora de cierre"
		id="to"
		locale="es"
		v-model="schedule.to"></b-form-timepicker>
	</b-form-group>
	<b-form-group>
		<b-button
		block
		variant="primary"
		@click="save">
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
	computed: {
		schedule() {
			return this.$store.state.schedules.edit
		},
	},
	data() {
		return {
			loading: false,
		}
	},
	methods: {
		save() {
			if (this.check()) {
				this.loading = true
				this.$api.post('schedules', this.schedule)
				.then(res => {
					console.log(res)
					this.loading = false
					this.$toast.success('Horario actualizado')
					this.$bvModal.hide('edit-schedule')
					this.$store.commit('schedules/update', res.data.schedule)
				})
				.catch(err => {
					this.loading = false
					this.$toast.error('Error al actualizar horario')
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