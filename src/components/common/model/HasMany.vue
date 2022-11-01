<template>
	<div
	class="m-l-15">
		<div
		v-for="model in parent_model[prop.key]">
			<model-form-component 
			:model="model"
			from_has_many
			:parent_model="parent_model"
			:properties="prop.has_many.properties"></model-form-component>
		</div>
		<div>
			<b-button 
			@click="addHasMany"
			size="sm"
			variant="outline-primary">
				Agregar {{ prop.has_many.text }}
			</b-button>
			<hr>
		</div>
	</div>
</template>
<script>
export default {
	name: 'HasMany',
	props: {
		prop: Object,
		parent_model: Object,
	},
	components: {
		ModelFormComponent: () => import('@/components/common/model/ModelForm')
	},
	methods: {
		addHasMany() {
			let model_to_add = {...this.prop.has_many.model}
			this.$set(this.parent_model, this.prop.key, this.parent_model[this.prop.key].concat([model_to_add]))
		},
	}
}
</script>