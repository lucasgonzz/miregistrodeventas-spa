<template>
	<b-row>
		<b-col>
			<b-card header="Comercios en uso">
				<div class="table-responsive" v-show="!loading_users">
					<table class="table table-striped text-center">
						<thead class="thead-dark">
							<tr>
								<th>Comercio</th>
								<th>Dueño</th>
								<th>Vence</th>
								<th>Cobrar</th>
							</tr>
						</thead>
						<tbody>
							<tr
							v-for="user in users_in_use"
							:key="user.id">
								<td>{{ user.company_name }}</td>
								<td>{{ user.name }}</td>
								<td>
									{{ date(user.expire) }}
								</td>
								<td>
									<b-button
									variant="success"
									@click="cobrar(user)"
									size="sm">
										Cobrar
									</b-button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<cargando :is_loading="loading_users" size="sm"></cargando>
			</b-card>
		</b-col>
	</b-row>
</template>
<script>
import Cargando from '@/components/common/Cargando'
export default {
	components: {
		Cargando
	},
	data() {
		return {
			users_in_use: [],
			user: null,
			loading_users: false
		}
	},
	methods: {
		getUsersInUse() {
			this.loading_users = true
			this.$api.get('admin/users/in-use')
			.then(res => {
				this.loading_users = false
				this.users_in_use = res.data
			})
			.catch(err => {
				this.loading_users = false
				console.log(err)
			})
		},
		cobrar(user) {
			this.$emit('cobrar', user)
		}
	},
	created() {
		this.getUsersInUse()
	}
}
</script>