<template>
<b-modal id="create-schedule" title="Crear horario" hide-footer>
	<b-form-group
	label="Nombre"
	label-for="name">
		<b-form-input
		placeholder="Nombre del horario"
		id="name"
		v-model="form.name"></b-form-input>
	</b-form-group>
	<b-form-group
	label="Desde"
	label-for="from">
		<b-form-timepicker
		placeholder="Hora de inicio"
		id="from"
		locale="es"
		v-model="form.from"></b-form-timepicker>
	</b-form-group>
	<b-form-group
	label="Hasta"
	label-for="to">
		<b-form-timepicker
		placeholder="Hora de cierre"
		id="to"
		locale="es"
		v-model="form.to"></b-form-timepicker>
	</b-form-group>
	<b-form-group>
		<b-button
		block
		variant="primary"
		@click="save">
			<btn-loader
			text="Guardar"
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
			form: {
				name: '',
				from: '',
				to: '',
			},
			loading: false,
			locale: {
				labelHours: 'Stunden',
				labelMinutes: 'Minuten',
				labelSeconds: 'Sekunden',
				labelIncrement: 'Erhöhen',
				labelDecrement: 'Verringern',
				labelSelected: 'Ausgewählte Zeit',
				labelNoTimeSelected: 'Keine Zeit ausgewählt',
				labelCloseButton: 'Schließen'
			},
		}
	},
	methods: {
		save() {
			if (this.check()) {
				this.loading = true
				this.$api.post('schedules', this.form)
				.then(res => {
					console.log(res)
					this.loading = false
					this.$toast.success('Horario guardado')
					this.$bvModal.hide('create-schedule')
					this.$store.commit('schedules/add', res.data.schedule)
				})
				.catch(err => {
					this.loading = false
					this.$toast.error('Error al guardad horario')
					console.log(err)
				})
			}
		},
		check() {
			if (this.form.name == '') {
				this.$toast.error('Ingrese un nombre')
				return false
			}
			if (this.form.from == '') {
				this.$toast.error('Ingrese una hora de inicio')
				return false
			}
			if (this.form.to == '') {
				this.$toast.error('Ingrese una hora de cierre')
				return false
			}
			return true
		},
	}
}
</script>