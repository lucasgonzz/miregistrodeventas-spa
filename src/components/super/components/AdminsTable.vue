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
<cargando :is_loading="loading" size="sm"></cargando>
</div>
</template>
<script>
import Cargando from '@/components/common/Cargando'
export default {
	components: {
		Cargando
	},
	data() {
		return {
			admins: [],
			loading: false
		}
	},
	methods: {
		getAdmins() {
			this.loading = true
			this.$api.get('super/admins')
			.then(res => {
				this.loading = false
				this.admins = res.data
				this.setAdminsCommerces()
			})
			.catch(err => {
				this.loading = false
				console.log(err)
			})
		},
		setAdminsCommerces() {
			this.admins.forEach(admin => {
				admin.commerces_in_use = []
				admin.commerces_trial = []
				admin.commerces_for_trial = []
				admin.commerces.forEach(commerce => {
					if (commerce.status == 'in_use') {
						admin.commerces_in_use.push(commerce)
					} else if (commerce.status == 'trial') {
						admin.commerces_trial.push(commerce)
					} else {
						admin.commerces_for_trial.push(commerce)
					}
				})
			})
		},
		showCommercesInUse(admin) {
			this.$emit('showCommercesInUse', admin)
		},
		showCommercesTrial(admin) {
			this.$emit('showCommercesTrial', admin)
		}
	},
	created() {
		this.getAdmins()
	}
}
</script>