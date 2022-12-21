<template>
	<div
	class="m-l-15">

		<model-component
		:has_many_parent_model="parent_model"
		:has_many_prop_name="prop.key"
		:model_name="prop.has_many.model_name"></model-component>	

	    <confirm
	    :model_name="prop.has_many.model_name"
	    :actions="[parent_model_name+'/deletePropModel']"
	    :id="'delete-'+prop.key"></confirm>
	    
	    <table-component
	    :has_many_parent_model="parent_model"
	    :models="parent_model[prop.key]"
	    :model_name="prop.has_many.model_name"></table-component>
	    
		<b-button
		class="m-t-15" 
		@click="create(prop.has_many.model_name, parent_model)"
		size="sm"
		variant="outline-primary">
			Agregar {{ prop.has_many.text }}
		</b-button>
	</div>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader2'
import TableComponent from '@/components/common/display/TableComponent'

import Confirm from '@/components/common/Confirm'

import display from '@/mixins/display'
export default {
	mixins: [display],
	name: 'HasMany',
	props: {
		prop: Object,
		parent_model_name: String,
		parent_model: Object,
	},
	components: {
		ModelFormComponent: () => import('@/components/common/model/ModelForm'),
		BtnLoader,
		TableComponent,

		ModelComponent: () => import('@/components/common/model/Index'),
		Confirm,
	},
	data() {
		return {
			deleting: 0,
		}
	},
	computed: {
		prop_model_to_delete() {
			return this.$store.state[this.parent_model_name].prop_model_to_delete
		},
		// text_delete_() {
		// 	if (this.prop_model_to_delete) {
		// 		return this.prop_model_to_delete.text 
		// 	}
		// 	return ''
		// },
	},
	methods: {
		addHasMany() {
			let model_to_add = {...this.prop.has_many.model}
			this.$set(this.parent_model, this.prop.key, this.parent_model[this.prop.key].concat([model_to_add]))
		},
		deleteModel(model) {
			let model_to_send = {
				...this.prop,
				id: model.id,
			}
			console.log(model_to_send)
			this.$store.commit(this.parent_model_name+'/setPropModelToDelete', model_to_send)
			this.$bvModal.show('delete-'+this.prop.key)
		}
	}
}
</script>