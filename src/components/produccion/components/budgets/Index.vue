<template>
	<div
	v-if="view == 'presupuestos'">
	    <confirm
	    :text="text_delete"
	    :actions="['produccion/budgets/delete']"
	    id="delete-budget"
	    toast="Presupuesto eliminado"></confirm>
	    <create-client></create-client>
		<budget-details></budget-details>
		<create></create>
		<print></print>
		<b-row>
			<b-col
			v-if="can('budgets.store')"
			cols="12"
			md="10"
			lg="8"
			class="j-start m-t-15">
				<b-button
				variant="primary"
				@click="create">
					<i class="icon-plus"></i>
					Nuevo presupuesto
				</b-button>
			</b-col>
			<b-col
			cols="12"
			md="10"
			lg="8">
				<list></list>
			</b-col>
		</b-row>
	</div>
</template>
<script>
import Confirm from '@/components/common/Confirm'
import CreateClient from '@/components/vender/modals/clients/Create.vue'
import BudgetDetails from '@/components/produccion/modals/budgets/Details'
import Create from '@/components/produccion/modals/budgets/Create'
import Print from '@/components/produccion/modals/budgets/Print'

import List from '@/components/produccion/components/budgets/List'
export default {
	components: {
		Confirm,
		CreateClient,
		BudgetDetails,
		Create,
		Print,
		
		List,
	},
	computed: {
		text_delete() {
			return '¿Seguro que quiere eliminar este presupuesto?'
		}
	},
	methods: {
		create() {
			this.$store.commit('produccion/budgets/setEdit', null)
			this.$store.commit('produccion/budgets/setCreate')
			this.$router.push({name: this.route_name, params: {sub_view: 'productos'}})
			setTimeout(() => {
				this.$bvModal.show('create-budget')
			}, 100)
		}
	}
}
</script>