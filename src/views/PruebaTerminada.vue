<template>
<b-container fluid>
	<b-row class="j-center">
		<b-col cols="12" md="6">
			<b-card header="Prueba terminada">
				<b-card-text>
					Hola {{ user.name }}, tu prueba de miregistrodeventas.com ha caducado, si te resulto de utilidad cliquea en contratar para seguir utilizando el servicio.
				</b-card-text>
				<template v-slot:footer>
					<b-button
					variant="success"
					size="lg"
					@click="contratar">
						<btn-loader :loading="loading"></btn-loader>
						Contratar
					</b-button>
				</template>
			</b-card>
		</b-col>
	</b-row>
</b-container>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	components: {
		BtnLoader
	},
	data() {
		return {
			loading: false
		}
	},
	computed: {
		user() {
			return this.$store.getters['auth/user']
		}
	},
	methods: {
		contratar() {
			this.loading = true
			this.$api.get('user/trial/contratar-servicio')
			.then(() => {
				this.$store.dispatch('auth/me')
				.then(() => {
					this.loading = false
					this.$router.replace('/')
				})
			})
			.catch(err => {
				this.loading = false
				console.log(err)
			})
		}
	}
}
</script>