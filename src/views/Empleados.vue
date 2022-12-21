<template>
	<div>
		<has-many
		model_name="user_payment"></has-many>
		<view-component
		:model_name="model_name"
		:show_previus_days="false"
		show_filter_modal>
			<template v-slot:modal_buttons="props">
				<permissions-list
				:employee="props.model"></permissions-list>
			</template>
			<template v-slot:default="props">
				<b-button
				@click="setUserPayment(props.model)"
				class="m-l-15"
				variant="success">
					Pagos
				</b-button>
			</template>
		</view-component>
	</div>
</template>
<script>
import HasMany from '@/components/common/has-many/Index'
import ViewComponent from '@/components/common/view/Index'
import PermissionsList from '@/components/empleados/components/PermissionsList.vue'
export default {
	computed: {
		model_name() {
			return 'employee'
		},
	},
	methods: {
		setUserPayment(model) {
			this.$store.commit('user_payment/setSelectedModel', model)
			this.$store.dispatch('user_payment/getModels')
			this.$bvModal.show('Pagos')
		}
	},
	components: {
		HasMany,
		ViewComponent,
		PermissionsList,
	}
}
</script>