<template>
	<div
	class="m-b-15">
		<b-row
		class="m-b-15 align-end"
		v-if="edit">
			<b-col
			md="9">
				<p 
				v-if="budget.client"
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
				variant="primary"
				v-b-modal="'create-client'">
					<i class="icon-plus"></i>
					Nuevo Cliente
				</b-button>
			</b-col>
		</b-row>
		<client-info
		v-if="budget.client"
		:client="budget.client"></client-info>
	</div>
</template>
<script>
import SelectClient from '@/components/common/SelectClient'
import ClientInfo from '@/components/common/ClientInfo'
export default {
	props: ['budget', 'edit'],
	components: {  
		SelectClient,
		ClientInfo,
	},
	methods: {
		setClient(client) {
			this.budget.client = client
		}
	}
}
</script>