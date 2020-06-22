<template>
	<div>
		<router-link :to="{name: 'Ingresar'}">Volver</router-link>
		<pre>
			{{ user }}
		</pre>
		<form @submit.prevent="login">
			<input type="email" v-model="form.email">
			<input type="password" v-model="form.password">
			<button>Enviar</button>
		</form>
	</div>
</template>
<script>
import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000'
export default {
	name: 'Login',
	data() {
		return {
			form: {
				email: 'marcos@gmail.com',
				password: '1234',
			},
		}
	},
	computed: {
		user() {
			return this.$store.state.user
		}
	},
	methods: {
		login() {
			axios.get('/sanctum/csrf-cookie')
			.then(() => {
				axios.post('/login', this.form)
				.then(res => {
					this.$store.commit('auth/setAuthenticated', true)
					this.$store.commit('auth/setUser', res.data)
				})
			});
		},
	}
}
</script>