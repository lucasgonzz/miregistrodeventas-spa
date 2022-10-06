<template>
	<div
	class="m-t-15">
		<div
		v-if="!loading">
			<div
			v-if="models.length"
			:class="_class"
			class="cont-cards">
				<card-component
				v-for="model in models"
				:key="model.id"
				:properties="properties"
				:model="model"
				:model_name="model_name"
				:set_model_on_click="set_model_on_click"
				:on_click_set_property="on_click_set_property"
				:pivot="pivot"
				:pivot_model="pivot_model"
				@clicked="clicked">
					<template v-slot:default="model"></template>
				</card-component>
			</div>
			<p 
			v-else-if="!models.length && model_name_spanish"
			class="text-with-icon">
				<i class="icon-eye-slash"></i>
				No hay {{ model_name_spanish }}
			</p>
		</div>
		<div 
		v-else
		class="cont-cards">
			<card-skeleton 
			v-for="i in 6"
			:key="i"
			:properties="properties"></card-skeleton>			
		</div>
	</div>
</template>
<script>
import CardComponent from '@/components/common/display/cards/CardComponent'
import CardSkeleton from '@/components/common/display/cards/CardSkeleton'
export default {
	props: {
		loading: Boolean,
		models: Array,
		model_name: String,
		properties: Array,
		pivot: {
			type: Object,
			default: null,
		},
		pivot_model: {
			type: Object,
			default: null,
		},
		set_model_on_click: Boolean,
		on_click_set_property: String,
		full_card: {
			type: Boolean,
			default: false,
		},
		model_name_spanish: String,
	},
	components: {
		CardComponent,
		CardSkeleton,
	},
	computed: { 
		_class() {
			if (this.full_card) {
				return 'full-card'
			}
			return ''
		},
	},
	methods: {
		clicked(model) {
			this.$emit('clicked', model)
		}
	}
}
</script>
<style lang="sass">
.cont-cards
	display: flex
	flex-direction: row
	flex-wrap: wrap
	@media screen and (min-width: 992px)
		justify-content: center
.full-card 
	.card-component
		width: 100% 
</style>