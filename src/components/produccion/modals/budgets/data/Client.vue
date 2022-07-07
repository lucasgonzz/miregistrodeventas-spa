<template>
	<div
	class="m-b-15">
		<b-row
		v-if="can_edit"
		class="m-b-15 align-end">
			<b-col
			md="9">
				<p 
				v-if="client"
				class="sub-title">
					Seleccionar otro cliente
				</p>
				<p 
				v-else
				class="sub-title">
					Seleccionar un cliente
				</p>
				<select-client
				@setClient="setClient"></select-client>
			</b-col>
			<b-col
			md="3">
				<b-button
				block
				variant="primary"
				@click="createClient">
					<i class="icon-plus"></i>
					Nuevo Cliente
				</b-button>
			</b-col>
		</b-row>
		<client-info
		v-if="client"
		:client="client"></client-info>
	</div>
</template>
<script>
import SelectClient from '@/components/common/SelectClient'
import ClientInfo from '@/components/common/ClientInfo'

import budgets from '@/mixins/budgets'
import clients from '@/mixins/clients'
export default {
	mixins: [budgets, clients],
	components: {  
		SelectClient,
		ClientInfo,
	},
	methods: {
		setClient(client) {
			this.$store.commit('produccion/budgets/create/setClient', client)
			// this.budget.client = client
		}
	}
}
</script>