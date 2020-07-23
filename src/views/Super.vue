<template>
<div id="super">
	<commerces-in-use
	:admin="admin"></commerces-in-use>
	<commerces-trial
	:admin="admin"></commerces-trial>
	<b-container fluid>
		<b-row>
			<b-col>
				<b-card header="Super">
					<b-container fluid>
						<admins-table
						@showCommercesInUse="showCommercesInUse"
						@showCommercesTrial="showCommercesTrial"></admins-table>
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
export default {
	components: {
		AdminsTable,
		CommercesInUse,
		CommercesTrial,
	},
	data() {
		return {
			admin: {}
		}
	},
	methods: {
		showCommercesInUse(admin) {
			this.admin = admin
			this.$bvModal.show('commerces-in-use')
		},
		showCommercesTrial(admin) {
			this.admin = admin
			this.$bvModal.show('commerces-trial')
		}
	}
}
</script>