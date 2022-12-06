<template>
	<div
	class="m-l-15">

	    <confirm
	    :text="text_delete"
	    :actions="[parent_model_name+'/deletePropModel']"
	    :id="'delete-'+prop.key"></confirm>
	    <div
	    v-if="parent_model[prop.key].length">
			<div
			v-for="model in parent_model[prop.key]">
				<model-form-component 
				:model="model"
				from_has_many
				:parent_model="parent_model"
				:properties="prop.has_many.properties">
					<btn-loader
					@clicked="deleteModel(model)"
					v-if="model.id"
					:block="false"
					size="sm"
					variant="outline-danger"
					:text="'Eliminar '+prop.has_many.text"
					:loader="deleting == model.id">
					</btn-loader>
				</model-form-component>
			</div>
	    </div>
	    <p
	    class="text-with-icon"
	    v-else>
	    	<i class="icon-eye-slash"></i>
	    	No hay {{ prop.has_many.text }}
	    </p>
		<div>
			<hr>
			<b-button 
			@click="addHasMany"
			size="sm"
			variant="outline-primary">
				Agregar {{ prop.has_many.text }}
			</b-button>
			<hr>
		</div>
	</div>
</template>
<script>
import BtnLoader from '@/components/common/BtnLoader2'

import Confirm from '@/components/common/Confirm'
export default {
	name: 'HasMany',
	props: {
		prop: Object,
		parent_model_name: String,
		parent_model: Object,
	},
	components: {
		ModelFormComponent: () => import('@/components/common/model/ModelForm'),
		BtnLoader,

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
		text_delete() {
			if (this.prop_model_to_delete) {
				return this.prop_model_to_delete.text 
			}
			return ''
		},
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