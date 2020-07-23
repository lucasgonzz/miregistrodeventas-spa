<template>
<b-modal id="add-commerce" title="Nuevo comercio">
	<b-container fluid>
		<b-row>
			<b-col>
				<b-form-group>
					<b-form-input
					id="commerce-name"
					v-model="commerce.company_name"
					@keydown.enter="saveCommerce"
					placeholder="Nombre del comercio"></b-form-input>
				</b-form-group>
				<b-form-group>
					<b-form-input
					id="commerce-password"
					v-model="commerce.password"
					@keydown.enter="saveCommerce"
					placeholder="Contraseña para el comercio"></b-form-input>
				</b-form-group>
				<b-form-select
				v-model="commerce.admin_id"
				:options="adminOptions"></b-form-select>
			</b-col>
		</b-row>
	</b-container>
	<template v-slot:modal-footer>
		<b-button
		variant="primary"
		@click="saveCommerce">
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
			commerce: {
				name: '',
				password: '',
				admin_id: 0
			},
			loading: false
		}
	},
	computed: {
		adminOptions() {
			let options = []
			options.push({text: 'Seleccionar admnistrador', value: 0})
			this.admins.forEach(admin => {
				options.push({text: admin.name, value: admin.id})
			})
			return options
		}
	},
	methods: {
		saveCommerce() {
			this.loading = true
			this.$api.post('super/commerce', this.commerce)
			.then(() => {
				this.loading = false
				this.$toast.success('Comercio guardado correctamente')
				this.$emit('getAdmins')
				this.commerce.company_name = ''
			})
			.catch(err => {
				this.loading = false
				console.log(err)
			})
		}
	}
}
</script>