<template>
	<b-card header="Comercios probandoce">
		<div class="table-responsive">
			<table class="table table-striped text-center">
				<thead class="thead-dark">
					<tr>
						<th>Comercio</th>
						<th>Dueño</th>
						<th>Vence</th>
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
	</b-card>
</template>
<script>
export default {
	data() {
		return {
			users_trial: []
		}
	},
	methods: {
		getUsersTrial() {
			this.$api.get('admin/users/trial')
			.then(res => {
				this.users_trial = res.data
			})
			.catch(err => {
				console.log(err)
			})
		}
	},
	created() {
		this.getUsersTrial()
	}
}
</script>