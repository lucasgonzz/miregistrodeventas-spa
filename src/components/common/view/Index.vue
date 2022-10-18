<template>
	<div>
    	<model
    	:size="modal_size"
    	:modal_title="create_model_name_spanish"
    	:model="model"
    	:model_name="model_name"
    	:text_delete="text_delete"
    	:properties="properties">
    		<template v-slot:default>
    			<slot name="modal_buttons"></slot>
    		</template>
    	</model>

		<b-row>
			<b-col
			cols="12"
			xl="10">
				<horizontal-nav
				:show_btn_create="show_btn_create"
				:create_model_name_spanish="create_model_name_spanish"
				:model_name="model_name"
				:display="display">
					<template v-slot:buttons>
						<slot name="horizontal_nav_buttons"></slot>
					</template>
				</horizontal-nav>
				<list
				:show_previus_days="show_previus_days"
				:model_name="model_name"
				:model_name_spanish="model_name_spanish"></list>
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
		check_can_create: {
			type: Boolean,
			default: false
		},
		show_previus_days: {
			type: Boolean,
			default: true,
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
		show_btn_create() {
			if (this.check_can_create) {
				return this.can(this.model_name+'.store')
			}
			return true
		}
	},
}
</script>