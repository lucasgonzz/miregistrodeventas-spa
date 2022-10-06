export default {
	computed: {
		city() {
			return this.$store.state.address.city	
		},
		is_city_selected() {
			return this.city != ''	
		},
		address() {
			return this.$store.state.address.address
		},
	},
	methods: {
		login(form) {
			console.log('login')
			return this.$axios.post('/login', form)
			.then(res => {
				console.log('retmino login')
				console.log(res.data)
				if (res.data.login) {
					this.$store.commit('auth/setAuthenticated', true)
					this.$store.commit('auth/setUser', res.data.user)
					this.$router.replace({ name: 'Vender', params: {view: 'remito'} })
				} 
			})
			.catch(err => {
				this.$toast.error('Error al ingresar, intentelo mas tarde')
				console.log(err)
			})
		}, 
		loginSuper(form) {
			console.log('probando con super')
			return this.$axios.post('/login-super', form)
			.then(res => {
				if (res.data.login) {
					this.$store.commit('auth/setAuthenticated', true)
					this.$store.commit('auth/setUser', res.data.user)
					this.$router.replace({ name: 'Super' })
				} else {
					this.$store.commit('auth/setAuthenticated', false)
					this.$store.commit('auth/setUser', null)
					this.$toast.error('Sus datos no corresponden a un usuario registrado, intentelo denuevo')
				}
			})
			.catch(err => {
				this.$toast.error('Error al ingresar, intentelo mas tarde')
				console.log(err)
			})
		}, 
	}
}