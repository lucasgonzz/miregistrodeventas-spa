<template>
<div>
	<horizontal-nav
	:model_name="model_name"
	:display="display"></horizontal-nav>

	<display
	:display="display"
	:loading="loading"
	:model_name="model_name"
	:properties="properties"
	:model_name_spanish="model_name_spanish">
		<template v-slot:buttons="props">
			<buttons :model="props.model"></buttons>
		</template>
	</display>
</div>
</template>
<script>
import HorizontalNav from '@/components/common/horizontal-nav/Index'
import Display from '@/components/common/display/Index'
import Buttons from '@/components/listado/components/list/Buttons'

import edit_articles from '@/mixins/edit_articles'
export default {
	mixins: [edit_articles],
	computed: {
		model_name() {
			return 'article'
		},
		model_name_spanish() {
			return 'articulo'
		},
		display() {
			return this.$store.state[this.model_name].display
		},
		loading() {
			return this.$store.state[this.model_name].loading
		},
		to_show() {
			return this.$store.state[this.model_name].to_show
		},
		models() {
			return this.$store.state[this.model_name].models
		},
		model() {
			return this.$store.state[this.model_name].model
		},
		delete() {
			return this.$store.state[this.model_name].delete
		},
		text_delete() {
			if (this.delete) {
				return 'el '+this.delete.name
			}
			return ''
		},
		properties() {
			return require(`@/models/${this.model_name}`).default.properties 
		}
	},
	methods: {
		setDisplay(display) {
			this.$store.commit(this.model_name+'/setDisplay', display)
		},
	},
	components: {
		HorizontalNav,
		Display,
		Buttons,
	}
}
</script>