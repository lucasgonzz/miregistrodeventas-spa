<template>
	<div>
	    <confirm
	    :model_name="model_name"
	    :actions="[model_name+'/delete']"
	    :id="'delete-'+model_name"></confirm>

		<b-modal
		:size="size"
		hide-footer
		:title="title"
		:id="model_name">

			<model-form
			@modelSaved="modelSaved"
			:has_many_parent_model="has_many_parent_model"
			:has_many_prop_name="has_many_prop_name"
			:model="model"
			:model_name="model_name"
			:properties="properties"
			:actions_after_save="actions_after_save"
			:show_btn_delete="show_btn_delete"
			:check_can_delete="check_can_delete">
				<template v-slot:belongs="slotProps">
					<slot name="belongs" :model="slotProps.model"></slot>
				</template> 
				<template v-slot:default="slotProps">
					<slot :model="slotProps.model"></slot>

	    			<btn-pdf
	    			v-if="show_btn_pdf"
	    			:model_name="model_name"
	    			:model="slotProps.model"></btn-pdf>

				</template>

			</model-form>

		</b-modal>
	</div>
</template>
<script>
export default {
	name: 'ModelIndex',
	props: {
		model_name: {
			type: String,
		},
		has_many_parent_model: {
			type: Object,
			default: null,
		},
		has_many_prop_name: String,
		show_btn_pdf: {
			type: Boolean,
			default: false,
		},
		size: {
			type: String,
			default: 'lg',
		},
		actions_after_save: {
			type: Array,
			default: () => {
				return []
			}
		},
		show_btn_delete: {
			type: Boolean,
			default: true,
		},
		check_can_delete: Boolean,
	},
	components: {
		Confirm: () => import('@/components/common/Confirm'),
		BtnPdf: () => import('@/components/common/BtnPdf'),

		ModelForm: () => import('@/components/common/model/ModelForm'),
	},
	computed: {
		model() {
			return this.modelStoreFromName(this.model_name)
		},
		properties() {
			return this.modelPropertiesFromName(this.model_name)
		},
		title() {
			if (this.model.id) {
				return 'Actualizar'
			}
			return this.create_spanish(this.model_name)
		},
	},
	methods: {
		modelSaved(model) {
			this.$emit('modelSaved', model)
		},
	},
}
</script>