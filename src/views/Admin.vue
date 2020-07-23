<template>
<div id="admin">
	<collect
	:commerce="commerce"
	@getUsersInUse="getUsersInUse"></collect>
	<b-container fluid>
		<b-row>
			<b-col>
				<b-card header="Administrador">
					<b-container fluid>
						<users-in-use ref="usersInUse"
						@cobrar="cobrar"></users-in-use>
						<b-row>
							<b-col
							cols="12"
							lg="6">
								<users-trial ref="usersTrial"></users-trial>
							</b-col>
							<b-col
							cols="12"
							lg="6">
								<users-for-trial
								@getUsersTrial="getUsersTrial"></users-for-trial>
							</b-col>
						</b-row>
					</b-container>
				</b-card>
			</b-col>
		</b-row>
	</b-container>
</div>
</template>
<script>
import UsersInUse from '@/components/admin/components/UsersInUse'
import UsersTrial from '@/components/admin/components/UsersTrial'
import UsersForTrial from '@/components/admin/components/UsersForTrial'
import Collect from '@/components/admin/modals/Collect'
export default {
	components: {
		UsersInUse,
		UsersTrial,
		UsersForTrial,
		Collect
	},
	data() {
		return {
			commerce: {}
		}
	},
	methods: {
		getUsersTrial() {
			this.$refs.usersTrial.getUsersTrial()
		},
		getUsersInUse() {
			this.$refs.usersInUse.getUsersInUse()
		},
		cobrar(commerce) {
			this.commerce = commerce
			this.$bvModal.show('collect')
		}
	}
}
</script>