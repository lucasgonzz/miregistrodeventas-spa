<template>
	<b-card header="Comercios probandoce">
		<div class="table-responsive" v-show="!loading_users">
			<table class="table table-striped text-center">
				<thead class="thead-dark">
					<tr>
						<th>Comercio</th>
						<th>Dueño</th>
						<th>Termina</th>
					</tr>
				</thead>
				<tbody>
					<tr
					v-for="user in users_trial"
					:key="user.id">
						<td>{{ user.company_name }}</td>
						<td>{{ user.name }}</td>
						<td>
							{{ date(user.expire) }}
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
			users_trial: [],
			loading_users: false
		}
	},
	methods: {
		getUsersTrial() {
			this.loading_users = true
			this.$api.get('admin/users/trial')
			.then(res => {
				this.loading_users = false
				this.users_trial = res.data
			})
			.catch(err => {
				this.loading_users = false
				console.log(err)
			})
		}
	},
	created() {
		this.getUsersTrial()
	}
}
</script>