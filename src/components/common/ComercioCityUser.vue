<template>
	<div>
		<div
		v-if="!model.comercio_city_user">
			<label 
			class="form-label">
				<i class="icon-right"></i>
				Asignar a un usuario de ComercioCity
			</label>
			<b-form-input
			class="m-b-15"
			@keyup.enter="searchUser"
			:placeholder="placeholder"
			v-model="company_name"></b-form-input>
			<btn-loader
			@clicked="searchUser"
			:loader="loading"
			text="Buscar"></btn-loader>
		</div>
		<div
		v-else>
			<label 
			class="form-label">
				<i class="icon-right"></i>
				Usuario de ComercioCity
			</label>
			<p>
				<i class="icon-user"></i>
				{{ model.comercio_city_user.company_name }}
			</p>
		</div>
		<hr> 
	</div>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader2'
export default {
	props: {
		model: Object,
		model_name: String,
	},
	components: {
		BtnLoader,
	},
	data() {
		return {
			company_name: '',
			loading: false
		}
	},
	computed: {
		placeholder() {
			return `Nombre del negocio de ${this.model.name} en ComercioCity`
		},
	},
	methods: {
		searchUser() {
			this.loading = true 
			this.$api.post(this.model_name+'/set-comercio-city-user', {
				model_id: this.model.id,
				company_name: this.company_name
			})
			.then(res => {
				this.loading = false 
				if (res.data.user_finded) {
					this.$store.commit(this.model_name+'/add', res.data.model)
					this.$toast.success('Actualizado')
					this.$bvModal.hide(this.model_name)
				} else {
					this.$toast.error('No se encontro ningun negocio con ese nombre')
				}
			})
			.catch(err => {
				this.loading = false 
				this.$toast.error('Error al buscar usuario')
				console.log(err)
			})
		}
	}
}
</script>