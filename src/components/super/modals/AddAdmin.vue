<template>
<b-modal id="add-admin" title="Nuevo administrador">
	<b-container fluid>
		<b-row>
			<b-col>
				<b-form-group>
					<b-form-input
					id="admin-name"
					v-model="admin.name"
					@keydown.enter="saveAdmin"
					placeholder="Nombre del administrador"></b-form-input>
				</b-form-group>
				<b-form-group>
					<b-form-input
					id="admin-password"
					v-model="admin.password"
					@keydown.enter="saveAdmin"
					placeholder="Contraseña para el administrador"></b-form-input>
				</b-form-group>
			</b-col>
		</b-row>
	</b-container>
	<template v-slot:modal-footer>
		<b-button
		variant="primary"
		@click="saveAdmin">
			<btn-loader :loading="loading"></btn-loader>
			Guardar
		</b-button>
	</template>
</b-modal>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader'
export default {
	props: ['admins'],
	components: {
		BtnLoader
	},
	data() {
		return {
			admin: {
				name: '',
				password: '',
			},
			loading: false
		}
	},
	methods: {
		saveAdmin() {
			this.loading = true
			this.$api.post('super/admin', this.admin)
			.then(() => {
				this.loading = false
				this.$toast.success('Administrador guardado correctamente')
				this.$emit('getAdmins')
				this.admin.name = ''
			})
			.catch(err => {
				this.loading = false
				console.log(err)
			})
		}
	}
}
</script>