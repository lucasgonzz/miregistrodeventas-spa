<template>
<b-modal id="register" title="Registro">
	<b-container>
		<b-row>
			<b-col>
				<b-form-group
				label="Nombre"
				label-for="name">
					<b-form-input
					v-model="user.name"
					placeholder="Ingrese su nombre"></b-form-input>
				</b-form-group>
				<b-form-group
				label="Nombre del comercio"
				label-for="company-name">
					<b-form-input
					v-model="user.company_name"
					placeholder="Ingrese el nombre del comercio"></b-form-input>
				</b-form-group>
				<b-form-group
				label="Contraseña"
				label-for="password">
					<b-form-input
					type="password"
					v-model="user.password"
					@keydown.enter="register"
					placeholder="Ingrese la contraseña"></b-form-input>
				</b-form-group>
			</b-col>
		</b-row>
	</b-container>
	<template v-slot:modal-footer>
		<b-button
		@click="register"
		block
		variant="primary">
			<span v-if="loading" class="spinner-border spinner-border-sm"></span>
			<span v-else>
				Registrarme
			</span>
		</b-button>
	</template>
</b-modal>
</template>
<script>
export default {
	data() {
		return {
			user: {
				name: '',
				company_name: '',
				password: '',
			},
			loading: false
		}
	},
	methods: {
		register() {
			this.loading = true
			this.$axios.post('register', this.user)
			.then(res => {
				console.log(res)
				this.loading = false
				if (!res.data.repeated) {
					this.$toast.success('Registrado correctamente')
					this.$bvModal.hide('register')
				} else {
					this.$toast.error('Ya hay un comercio con ese nombre')
				}
			})
			.catch(err => {
				this.loading = false
				this.$toast.error(`${err}`)
			})
		}
	}
}
</script>