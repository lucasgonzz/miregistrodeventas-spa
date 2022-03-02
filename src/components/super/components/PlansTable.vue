<template>
	<b-table
	v-if="view == 'plans'"
	responsive
	head-variant="dark" 
	striped
	:fields="fields"
	:items="items">
		<template #cell(permissions)="data">
			<b-button
			@click="seePermissions(plans[data.index])"
			size="sm"
			variant="primary">
				<i class="icon-eye"></i>
				{{ plans[data.index].permissions.length }}
			</b-button>
		</template>
	</b-table>
</template>
<script>
import mixin from '@/mixins/super'
export default {
	mixins: [mixin],
	data() {
		return {
			provider: {
				name: ''
			},
			saving_provider: false,
			deleting_provider: 0,
		}
	},
	computed: {
		plans() {
			return this.$store.state.super.plans
		},
		fields() {
			return [
				{ key: 'name', label: 'Nombre' },
				{ key: 'permissions', label: 'Permisos' },
				{ key: 'options', label: 'Opciones' },
			]
		},
		items() {
			let items = []
			this.plans.forEach(item => {
				items.push({
					name: item.name,
				})
			})
			return items
		}
	},
	methods: {
		seePermissions(plan) {
			plan.permissions_id = []
			plan.permissions.forEach(permission => {
				plan.permissions_id.push(permission.id)
			})
			this.$store.commit('super/setPlanPermissions', plan)
			this.$bvModal.show('plan-permissions')
		}
	}
}
</script>