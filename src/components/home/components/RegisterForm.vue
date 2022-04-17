<template>
<div>
	<b-row
	id="register-form"
	class="row row-dark j-around">
		<b-col
		lg="6">
			<h1>
				No cobramos licencia inicial, actualizaciones ni mantenimiento extra.
			</h1>
			<b-form
			class="s border-radius">
				<p>
					¡Comenza tu prueba gratis por una semana!
				</p>
				<b-form-input
				v-model="form.name"
				placeholder="Nombre"></b-form-input>
				<b-form-input
				v-model="form.company_name"
				placeholder="Nombre de la empresa"></b-form-input>
				<b-form-input
				v-model="form.phone"
				placeholder="Telefono"></b-form-input>
				<b-form-input
				v-model="form.email"
				placeholder="Correo"></b-form-input>
				<b-form-input
				type="password"
				v-model="form.password"
				placeholder="Contraseña"></b-form-input>
				<b-form-group
				label="Tipo de negocio">
					<b-form-radio
					value="commerce"
					name="commerce-type"
					v-model="form.type">
						Negocio minorista
					</b-form-radio>
					<b-form-radio
					value="provider"
					name="commerce-type"
					v-model="form.type">
						Negocio mayorista
					</b-form-radio>
				</b-form-group>
				<b-button
				@click="register"
				block
				variant="primary"> 
					<btn-loader
					:loader="loading"
					text="Comenzar prueba gratis"></btn-loader>
				</b-button>
			</b-form>
		</b-col>
	</b-row>
</div>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
import auth from '@/mixins/auth'
export default {
	mixins: [auth],
	components: {
		BtnLoader,
	},
	data() {
		return {
			form: {
				name: '',
				phone: '',
				email: '',
				company_name: '',
				type: '',
				password: '',
			},
			loading: false,
		}
	},
	methods: {
		register() {
			if (this.check()) {
				this.loading = true 
				this.$axios.post('/users', this.form)
				.then(res => {
					this.login(this.form)
					.then(() => {
						this.loading = false
					})
				})
				.catch(() => {
					this.loading = false
				})
			}
		},
		check() {
			if (this.form.name == '') {
				this.$toast.error('El nombre no puede quedar vacio')
				return false
			}
			if (this.form.company_name == '') {
				this.$toast.error('El nombre de la empresa no puede quedar vacio')
				return false
			}
			if (this.form.phone == '') {
				this.$toast.error('El telefono no puede quedar vacio')
				return false
			}
			if (this.form.email == '') {
				this.$toast.error('El correo no puede quedar vacio')
				return false
			}
			if (this.form.password == '') {
				this.$toast.error('La contraseña no puede quedar vacia')
				return false
			}
			if (this.form.type == '') {
				this.$toast.error('Seleccione un tipo de negocio')
				return false
			}
			return true
		}
	}
}
</script>
<style lang="sass">
#register-form
	background: url('~@/assets/fondo burbujas azules.png') no-repeat center center 
	background-size: cover
	height: auto !important
	h1 
		font-size: 1.2em
	form 
		background: #FFF
		@media screen and (max-width: 576px)
			padding: 1em
			margin: 1em 0
		@media screen and (min-width: 576px)
			padding: 2em
			margin: 2em 1em
		p 
			text-align: center
			font-weight: bold
			font-size: 1.2em
		input 
			margin-bottom: 1em
</style>