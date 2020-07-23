<template>
<div>
<b-row v-show="!loading">
	<b-col>
		<div class="table-responsive">
			<table class="table table-striped">
				<thead class="thead-dark">
					<tr>
						<th>Admin</th>
						<th>En uso</th>
						<th>Probandoce</th>
						<th>Para probar</th>
					</tr>
				</thead>
				<tbody>
					<tr
					v-for="admin in admins"
					:key="admin.id">
						<td>
							{{ admin.name }}
						</td>
						<td>
							<b-button
							variant="primary"
							@click="showCommercesInUse(admin)"
							size="sm">
								<i class="icon-eye"></i>
								{{ admin.commerces_in_use.length }} Comercios 
							</b-button>
						</td>
						<td>
							<b-button
							variant="primary"
							@click="showCommercesTrial(admin)"
							size="sm">
								<i class="icon-eye"></i>
								{{ admin.commerces_trial.length }} Comercios 
							</b-button>
						</td>
						<td>
							{{ admin.commerces_for_trial.length }} Comercios 
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</b-col>
</b-row>
</div>
</template>
<script>
export default {
	props: ['admins', 'loading'],
	methods: {
		showCommercesInUse(admin) {
			this.$emit('showCommercesInUse', admin)
		},
		showCommercesTrial(admin) {
			this.$emit('showCommercesTrial', admin)
		}
	},
}
</script>