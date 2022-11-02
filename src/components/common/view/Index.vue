<template>
	<div>
		
		<slot name="modals"></slot>

    	<model
    	v-if="show_modal"
    	:show_btn_pdf="show_btn_pdf"
    	:size="modal_size"
    	:modal_title="create_model_name_spanish"
    	:model="model"
    	:model_name="model_name"
    	:text_delete="text_delete"
    	:properties="properties">
    		<template v-slot:default="slotProps">
    			<slot name="modal_buttons" :model="slotProps.model"></slot>
    		</template>
    	</model>

		<b-row>
			<b-col
			cols="12"
			:xl="col_xl">
				<horizontal-nav
				:show_filter_modal="show_filter_modal"
				:show_btn_create="_show_btn_create"
				:create_model_name_spanish="create_model_name_spanish"
				:model_name="model_name"
				:display="display">
					<template v-slot:btn_create>
						<slot name="horizontal_nav_btn_create"></slot>
					</template>
					<template v-slot:buttons>
						<slot name="horizontal_nav_buttons"></slot>
					</template>
				</horizontal-nav>
				<list
				:models_to_show="models_to_show"
				:show_previus_days="show_previus_days"
				:show_search_nav="show_search_nav"
				:model_name="model_name"
				:model_name_spanish="model_name_spanish">
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
		model_name_spanish: {
			type: String,
		},
		create_model_name_spanish: {
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
		show_modal: {
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
	},
	computed: {
		model() {
			return this.$store.state[this.model_name].model
		},
		delete() {
			return this.$store.state[this.model_name].delete
		},
		text_delete() {
			return 'la '+this.model_name_spanish
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
}
</script>