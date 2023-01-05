<template>
	<div>
		
		<slot name="modals"></slot>

    	<model
    	v-if="show_modal"
    	@modelSaved="modelSaved"
    	:show_btn_pdf="show_btn_pdf"
    	:show_btn_delete="show_btn_delete"
    	:size="modal_size"
    	:model_name="model_name">
    		<template v-slot:default="slotProps">
    			<slot name="modal_buttons" :model="slotProps.model"></slot>
    		</template>
    		<template v-slot:belongs="slotProps">
    			<slot name="belongs" :model="slotProps.model"></slot>
    		</template>
    	</model>

		<b-row>
			<b-col
			cols="12"
			:xl="col_xl">
				<horizontal-nav
				:show_filter_modal="show_filter_modal"
				:show_btn_create="_show_btn_create"
				:show_plus_dropdown="show_plus_dropdown"
				:show_display="show_display"
				:model_name="model_name">
					<template v-slot:btn_create>
						<slot name="horizontal_nav_btn_create"></slot>
					</template>
					<template v-slot:buttons>
						<slot name="horizontal_nav_buttons"></slot>
					</template>
				</horizontal-nav>
				<slot name="header"></slot>
				<list
				:models_to_show="models_to_show"
				:show_models_if_empty="show_models_if_empty"
				:show_previus_days="show_previus_days"
				:show_search_nav="show_search_nav"
				:model_name="model_name">
					<template v-slot:default="slotProps">
						<slot :model="slotProps.model"></slot>
					</template>
				</list>
			</b-col>
		</b-row>
	</div>
</template>
<script>
import Model from '@/components/common/model/Index'
import List from '@/components/common/view/List'
import HorizontalNav from '@/components/common/horizontal-nav/Index'

import display from '@/mixins/display'
export default {
	mixins: [display],
	components: {
		Model,

		List,
		HorizontalNav,
	},
	props: {
		model_name: {
			type: String,
		},
		modal_size: {
			type: String,
			default: 'lg'
		},
		show_btn_create: {
			type: Boolean,
			default: true,
		},
		show_plus_dropdown: {
			type: Boolean,
			default: false,
		},
		check_can_create: {
			type: Boolean,
			default: false
		},
		show_previus_days: {
			type: Boolean,
			default: true,
		},
		show_search_nav: {
			type: Boolean,
			default: false,
		},
		show_filter_modal: {
			type: Boolean,
			default: false,
		},
		show_btn_pdf: {
			type: Boolean,
			default: false,
		},
		show_btn_delete: {
			type: Boolean,
			default: true,
		},
		show_modal: {
			type: Boolean,
			default: true,
		},
		show_display: {
			type: Boolean,
			default: true,
		},
		col_xl: {
			type: String,
			default: '12'
		},
		models_to_show: {
			type: Array,
			default: () => {
				return []
			},
		},
		show_models_if_empty: Boolean,
	},
	computed: {
		model_name_spanish() {
			return require('@/models/'+this.model_name).default.plural_model_name_spanish
		},
		create_model_name_spanish() {
			return require('@/models/'+this.model_name).default.create_model_name_spanish
		},
		model() {
			return this.$store.state[this.model_name].model
		},
		delete() {
			return this.$store.state[this.model_name].delete
		},
		display() {
			return this.$store.state[this.model_name].display
		},
		properties() {
			return require(`@/models/${this.model_name}`).default.properties 
		},
		_show_btn_create() {
			if (this.check_can_create) {
				return this.can(this.model_name+'.store')
			}
			return this.show_btn_create
		}
	},
	methods: {
		modelSaved(model) {
			this.$emit('modelSaved', model)
		}
	}
}
</script>