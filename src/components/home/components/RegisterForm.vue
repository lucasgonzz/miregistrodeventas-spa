<template>
<b-row
id="register"
class="row row-dark j-around">
	<b-col
	lg="5">
		<h1 class="title">
			Organiza tu emprendimiento facil y rapido
		</h1>
		<h4
		class="text-justify">
			ComercioCity es el sistema donde cargas tu inventario y llevas el control de tus ventas. Con la posibilidad de conectarlo al 100% con una Tienda Online, controlando todo desde un solo lugar.
		</h4>
	</b-col>
	<b-col
	lg="5">
		<b-form
		class="s border-radius">
			<p>
				Comenza tu prueba gratis
			</p>
			<b-form-input
			v-model="form.name"
			placeholder="Nombre"></b-form-input>
			<b-form-input
			v-model="form.phone"
			placeholder="Telefono"></b-form-input>
			<b-form-input
			v-model="form.email"
			placeholder="Correo"></b-form-input>
			<b-form-input
			v-model="form.company_name"
			placeholder="Nombre de la empresa"></b-form-input>
			<b-form-input
			type="password"
			v-model="form.password"
			placeholder="Contraseña"></b-form-input>
			<b-form-group
			label="Tipo de negocio">
				<b-form-radio
				value="provider"
				name="commerce-type"
				v-model="form.type">
					Negocio minorista
				</b-form-radio>
				<b-form-radio
				value="commerce"
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
	}
}
</script>
<style lang="sass">
#register
	form 
		@media screen and (max-width: 576px)
			padding: 1em
			margin: 1em 0
		@media screen and (min-width: 576px)
			padding: 2em 3em
			margin: 2em 1em
		background: #FFF
		p 
			text-align: center
			font-weight: bold
			font-size: 1.2em
		input 
			margin-bottom: 1em
</style>