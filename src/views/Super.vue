<template>
<div id="super">
	<commerces-in-use
	:admin="admin"></commerces-in-use>
	<commerces-trial
	:admin="admin"></commerces-trial>
	<add-commerce
	:admins="admins"
	@getAdmins="getAdmins"></add-commerce>
	<add-admin
	@getAdmins="getAdmins"></add-admin>
	<b-container fluid>
		<b-row>
			<b-col>
				<b-card>
					<template v-slot:header>
						Super
						<div>
							<b-button
							variant="primary"
							class="float-right m-l-5"
							v-b-modal="'add-admin'"
							size="sm">
								<i class="icon-plus"></i>
								Administrador
							</b-button>
							<b-button
							variant="primary"
							v-b-modal="'add-commerce'"
							class="float-right"
							size="sm">
								<i class="icon-plus"></i>
								Comercio
							</b-button>
						</div>
					</template>
					<b-container fluid>
						<admins-table
						:loading="loading"
						:admins="admins"
						@showCommercesInUse="showCommercesInUse"
						@showCommercesTrial="showCommercesTrial"></admins-table>
						<cargando :is_loading="loading" size="sm"></cargando>
					</b-container>
				</b-card>
			</b-col>
		</b-row>
	</b-container>
</div>
</template>
<script>
import AdminsTable from '@/components/super/components/AdminsTable'
import CommercesInUse from '@/components/super/modals/CommercesInUse'
import CommercesTrial from '@/components/super/modals/CommercesTrial'
import AddCommerce from '@/components/super/modals/AddCommerce'
import AddAdmin from '@/components/super/modals/AddAdmin'
import Cargando from '@/components/common/Cargando'
export default {
	components: {
		AdminsTable,
		CommercesInUse,
		CommercesTrial,
		AddCommerce,
		AddAdmin,
		Cargando
	},
	data() {
		return {
			admins: [],
			loading: false,
			admin: {}
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
			this.admin = admin
			this.$bvModal.show('commerces-in-use')
		},
		showCommercesTrial(admin) {
			this.admin = admin
			this.$bvModal.show('commerces-trial')
		}
	},
	created() {
		this.getAdmins()
	}
}
</script>
<style scoped lang="sass">
.card-headers
	background: #000
</style>