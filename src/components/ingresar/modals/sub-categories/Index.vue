<template>
	<modal-model
	:models_to_show="models_to_show"
	show_models_if_empty
	model_name="sub_category">
		<template #header>
			<horizontal-nav
			set_view
			@setSelected="setSelected"
			:items="items"></horizontal-nav>
		</template>
	</modal-model>
</template>
<script>
import ModalModel from '@/components/common/ModalModel'
import HorizontalNav from '@/components/common/horizontal-nav/Index'
export default {
	components: {
		ModalModel,
		HorizontalNav,
	},
	computed: {
		categories() {
			return this.$store.state.category.models 
		},
		sub_categories() {
			return this.$store.state.sub_category.models 
		},
		items() {
			let items = []
			this.categories.forEach(model => {
				items.push({name: model.name, id: model.id})
			})
			return items 
		},
	},
	data() {
		return {
			models_to_show: [],
		}
	},
	created() {
		this.setSelected(this.categories[0])
		this.$router.push({params: {view: this.routeString(this.categories[0].name)}})
	},
	methods: {
		setSelected(category) {
			this.models_to_show = this.sub_categories.filter(model => {
				return model.category_id == category.id
			})
		}
	}
}
</script>