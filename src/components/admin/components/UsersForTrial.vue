<template>
	<b-card header="Comercios probandoce">
		<div class="table-responsive" v-show="!loading_users">
			<table class="table table-striped text-center">
				<thead class="thead-dark">
					<tr>
						<th>Comercio</th>
						<th>Opciones</th>
					</tr>
				</thead>
				<tbody>
					<tr
					v-for="user in users_for_trial"
					:key="user.id">
						<td>{{ user.company_name }}</td>
						<td>
							<b-button
							variant="primary"
							size="sm"
							@click="startTrial(user)">
								<i class="icon-check" v-show="loading != user.id"></i>
								<span class="spinner-border spinner-border-sm" v-show="loading == user.id"></span>
								Comenzar prueba
							</b-button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<cargando :is_loading="loading_users" size="sm"></cargando>
	</b-card>
</template>
<script>
import Cargando from '@/components/common/Cargando'
export default {
	components: {
		Cargando
	},
	data() {
		return {
			users_for_trial: [],
			loading: 0,
			loading_users: false
		}
	},
	methods: {
		getUsersForTrial() {
			this.loading_users = true
			this.$api.get('admin/users/for-trial')
			.then(res => {
				this.loading_users = false
				this.users_for_trial = res.data
			})
			.catch(err => {
				this.loading_users = false
				console.log(err)
			})
		},
		startTrial(user) {
			this.loading = user.id
			this.$api.get(`admin/users/start-trial/${user.id}`)
			.then(() => {
				this.loading = 0
				this.getUsersForTrial()
				this.$emit('getUsersTrial')
			})
			.catch(err => {
				this.loading = 0
				console.log(err)
			})
		}
	},
	created() {
		this.getUsersForTrial()
	}
}
</script>