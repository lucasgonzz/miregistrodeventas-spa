<template>
	<div>
	    <confirm
	    :text="text_delete"
	    :actions="[modelPlural(model_name)+'/delete']"
	    :id="'delete-'+model_name"></confirm>

	    <confirm
	    v-if="delete_img"
	    text="la imagen"
	    :actions="[modelPlural(model_name)+'/deleteImage']"
	    :id="'delete-'+model_name+'-image'"
	    toast="Imagen eliminada"></confirm>

		<b-modal
		:size="size"
		hide-footer
		:title="title"
		:id="model_name">

			<images
			:model="model"
			:model_name="model_name"></images>	

			<model-form
			:model="model"
			:model_name="model_name"
			:props="props">
				<slot></slot>
			</model-form>

		</b-modal>
	</div>
</template>
<script>
import Confirm from '@/components/common/Confirm'
import BtnLoader from '@/components/common/BtnLoader'
import BtnDelete from '@/components/common/BtnDelete'

import Images from '@/components/common/Images'
import ModelForm from '@/components/common/model/ModelForm'
export default {
	props: {
		model: {
			type: Object,
		},
		props: {
			type: Array,
		},
		model_name: {
			type: String,
		},
		text_delete: {
			type: String,
		},
		delete_img: {
			type: Boolean,
			default: false,
		},
		modal_title: String,
		size: {
			type: String,
			default: 'md',
		},
	},
	components: {
		Confirm,

		Images,
		ModelForm,
	},
	computed: {
		title() {
			if (this.model.id) {
				return 'Actualizar '+this.model.name
			}
			return this.modal_title
		},
	},
}
</script>