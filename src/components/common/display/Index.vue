<template>
	<div>

		<table-component
		:loading="loading"
		:models="models"
		:model_name="model_name"
		:model_name_spanish="model_name_spanish"
		:properties="properties"
		:set_model_on_click="set_model_on_click"
		:on_click_set_property="on_click_set_property"
		@clicked="clicked"
		v-show="display == 'table'">
			<template v-slot:btn-edit="slotProps">
				<slot name="buttons" :model="slotProps.model"></slot>
			</template>  
			<!-- <template
			v-for="prop in properties"
			v-slot:[prop.key]>
				<slot :name="prop.key"></slot>
			</template> -->
		</table-component>

		<cards-component
		:loading="loading"
		:models="models"
		:model_name="model_name"
		:model_name_spanish="model_name_spanish"
		:properties="properties"
		:set_model_on_click="set_model_on_click"
		:on_click_set_property="on_click_set_property"
		@clicked="clicked"
		v-show="display == 'cards'">
			<!-- <slot v-slot:default="model">f</slot> -->
		</cards-component>

	</div>
</template>
<script>
import TableComponent from '@/components/common/display/TableComponent'
import CardsComponent from '@/components/common/display/cards/Index'
export default {
	props: {
		display: String,
		loading: Boolean,
		models: Array,
		model_name: String,
		model_name_spanish: {
			type: String,
			default: null,
		},
		properties: Array,
		set_model_on_click: {
			type: Boolean,
			default: true,
		},
		on_click_set_property: {
			type: String,
			default: null,
		},
	},
	methods: {
		clicked(model) {
			this.$emit('clicked', model)
		},
	},
	components: {
		TableComponent,
		CardsComponent,
	}
}
</script>