<template>
<b-modal id="update-user" title="Actualizar datos">
	<b-container>
		<b-row>
			<b-col>
				<b-form-group
				label="Nombre"
				label-for="name">
					<b-form-input
					id="name"
					v-model="form.name"
					@keyup.enter="updateUser"></b-form-input>
				</b-form-group>
				<b-form-group
				label="Nombre del comercio"
				label-for="company-name">
					<b-form-input
					id="company-name"
					v-model="form.company_name"
					@keyup.enter="updateUser"></b-form-input>
				</b-form-group>
			</b-col>
		</b-row>
	</b-container>
	<template v-slot:modal-footer>
		<b-button
		variant="primary"
		@click="updateUser">
			<!-- <btn-loader :loading="updating_company_name"></btn-loader> -->
			Actualizar
		</b-button>
	</template>
</b-modal>
</template>
<script>
// import BtnLoader from '@/components/common/BtnLoader'
export default {
	props: ['user'],
	components: {
		// BtnLoader
	},
	data() {
		return {
			form: {
				name: '',
				company_name: ''
			},
			updating_company_name: false
		}
	},
	created() {
		this.form.name = this.user.name
		this.form.company_name = this.user.company_name
	},
	methods: {
		updateUser() {
			this.updating_company_name = true
			this.$api.put('/user', this.form)
			.then(res => {
				if (res.data.repeated) {
					this.$toast.error('Ya hay un comercio registrado con ese nombre')
					this.form.company_name = ''
				} else {
					this.$toast.success('Datos actualizados con exito')
					this.$bvModal.hide('update-user')
				}
				this.updating_company_name = false
			})
			.catch(err => {
				console.log(err)
				this.updating_company_name = false
			})
		}
	}
}
</script>