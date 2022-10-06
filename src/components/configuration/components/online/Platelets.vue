<template>
	<div>
	    
    	<model
    	modal_title="Nueva plaqueta"
    	:model="platelet"
    	model_name="platelet"
    	:text_delete="text_delete"
    	:props="props"></model>

		<b-card
		class="shadow b-r-1 m-b-25"
		title="Plaquetas">
			<b-table
			class="shadow-2 b-r-1 m-b-15"
			responsive
			head-variant="dark" 
			v-if="platelets.length"
			striped
			:fields="fields"
			:items="items">
				<template #cell(options)="data">
					<b-button
					class="m-r-10"
					@click="edit(platelets[data.index])"
					size="sm"
					variant="primary">
						<i class="icon-edit"></i>
					</b-button>
					<b-button
					@click="deletePM(platelets[data.index])"
					size="sm"
					variant="danger">
						<i class="icon-trash"></i>
					</b-button>
				</template>
			</b-table>
			<p
			class="text-with-icon"
			v-else>
				<i class="icon-eye-slash"></i>
				No hay plaquetas
			</p>
			<div 
			class="j-start m-t-20">
				<b-button
				variant="primary"
				block
				@click="create">
					<i class="icon-plus"></i>
					Nuevo Plaqueta
				</b-button>
			</div>
		</b-card>
	</div>
</template>
<script>
// Modals
import Model from '@/components/common/model/Index'

// Components
import Confirm from '@/components/common/Confirm'
import PaymentMethod from '@/components/configuration/modals/online/payment-methods/Model'

import model from '@/models/platelet'
export default {
	components: {
		Model,
		
		Confirm,
		PaymentMethod,
	},
	computed: {
		props() {
			return model.props
		},
		platelet() {
			return this.$store.state.platelets.model
		},
		delete() {
			return this.$store.state.platelets.delete
		},
		text_delete() {
			if (this.delete) {
				return 'la plaqueta '+this.delete.name
			}
		},
		platelets() {
			return this.$store.state.platelets.models
		},
		fields() {
			return [
				{ key: 'name', label: 'Nombre', class: 'text-center' },
				{ key: 'description', label: 'Descripcion', class: 'text-center' },
				{ key: 'options', label: '' },
			]
		},
		items() {
			let items = []
			this.platelets.forEach(item => {
				items.push({
					name: item.name,
					description: item.description,
				})
			})
			return items
		}
	},
	methods: {
		create() {
			this.$store.commit('platelets/setModel')
			this.$bvModal.show('platelet')
		},
		edit(item) {
			console.log(item)
			this.$store.commit('platelets/setModel', item)
			this.$bvModal.show('platelet')
		},
		deletePM(item) {
			this.$store.commit('platelets/setDelete', item)
			this.$bvModal.show('delete-platelet')
		}
	}
}
</script>