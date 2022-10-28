<template>
	<div
	class="w-100">
		<previus-days
		v-if="show_previus_days"
		:model_name="model_name"
		:model_name_spanish="model_name_spanish"></previus-days>

		<search-nav
		v-if="show_search_nav"
		:models="models"
		:model_name="model_name"></search-nav>

		<display
		:models="to_show"
		:model_name="model_name"
		:properties="properties"
		:model_name_spanish="model_name_spanish">
			<template v-slot:default="slotProps">
				<slot :model="slotProps.model"></slot>
			</template>
		</display>
	</div>
</template>
<script>
import PreviusDays from '@/components/common/previus-days/Index'
import SearchNav from '@/components/common/search-nav/Index'
import Display from '@/components/common/display/Index'
export default {
	props: {
		model_name: String,
		model_name_spanish: String,
		show_previus_days: Boolean,
		show_search_nav: Boolean,
		models_to_show: {
			type: Array,
			default: () => {
				return []
			},
		},
	},
	computed: {
		to_show() {
			if (this.models_to_show.length) {
				return this.models_to_show
			}
			return this.$store.state[this.model_name].to_show
		},
		models() {
			return this.$store.state[this.model_name].models
		},
		properties() {
			return require(`@/models/${this.model_name}`).default.properties 
		}
	},
	components: {
		PreviusDays,
		SearchNav,
		Display,
	}
}
</script>